import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import Loader from "../components/Loader";
import {
  IonItem,
  IonInput,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonToast,
  IonSlide,
  IonContent,
  IonIcon,
  IonTextarea,
} from "@ionic/react";

import { Geolocation } from "@ionic-native/geolocation";
import { CameraResultType, CameraSource } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";
import { pinOutline } from "ionicons/icons";

const utilities = new Utils();

const Review: React.FC = () => {
  const [reviewInsertAlert, setReviewInsertAlert] = useState(false);
  const [reviewInsertSuccess, setReviewInsertSuccess] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const fieldIds = ["1"];
  const fieldValues = ["0"];
  const [platform, setPlatform] = useState({
    id: 0,
    name: "",
    slug: "",
  });
  const [fields, setFields] = useState([]);

  function setFieldValues(element: any, fieldValue: any) {
    let fieldId = element.attributes.name.value.replace("field-", "");
    let index = fieldIds.indexOf(fieldId);
    if (index !== -1) {
      fieldIds.splice(index, 1);
      fieldValues.splice(index, 1);
    }
    fieldIds.push(fieldId);
    fieldValues.push(fieldValue.value);
  }

  useEffect(() => {
    utilities.pageProtected();

    let data = {
      slug: utilities.getLastItem(window.location.pathname),
      id: 0,
    };
    utilities.postCall("platforms", JSON.stringify(data)).then((res) => {
      if (res.status) {
        let elem = res.data;

        setPlatform({
          id: elem.id,
          name: elem.name,
          slug: elem.slug,
        });

        utilities.postCall("fields", "").then((res) => {
          setFields(res.data);
        });
      }
    });
  }, []);

  const submitReview = () => {
    let data = JSON.stringify({
      platform: platform.id,
      name: name,
      text: text,
      latitude: latitude,
      longitude: longitude,
      fieldIds: fieldIds,
      fieldValues: fieldValues,
    });
    utilities.patchCall("review", data).then((res) => {
      if (res.status) {
        setReviewInsertSuccess(true);

        setTimeout(function () {
          utilities.pageRedirect("platform/" + platform.slug);
        }, 2000);
      } else {
        setReviewInsertAlert(true);
      }
    });
  };

  const getPosition = async () => {
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    } catch (e) {
      setReviewInsertAlert(true);
    }
  };

  const retFields = [];
  let field = null;
  for (let i = 0; i < fields.length; i++) {
    field = fields[i];
    retFields.push(
      <IonRow className="rating pt1 pb1 text-left">
        <IonCol
          sizeXs="12"
          sizeSm="12"
          sizeMd="12"
          sizeLg="12"
          sizeXl="12"
          className="column"
        >
          <IonItem lines="none" className="form-item title">
            <IonInput
              className="input-field"
              name={"field-" + field["id"]}
              value=""
              min="0"
              max="5"
              type="number"
              data-id={field["id"]}
              placeholder={field["name"]}
              onIonChange={(e) => setFieldValues(e.target, e.detail)}
            ></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
    );
  }

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={reviewInsertAlert}
        onDidDismiss={() => setReviewInsertAlert(false)}
        message="Operation could not be done. Try again later"
        duration={5000}
        color="danger"
      />
      <IonToast
        isOpen={reviewInsertSuccess}
        onDidDismiss={() => setReviewInsertSuccess(false)}
        message="Operation Completed Successfully."
        duration={5000}
        color="success"
      />

      <IonSlide>
        <IonContent className="page-container review">
          <h1 className="form-title mt1 mb1">
            Add a review for {platform.name}
          </h1>

          <IonGrid>
            <form
              className="review-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitReview();
              }}
            >
              <IonRow>
                <IonCol
                  sizeXs="12"
                  sizeSm="6"
                  sizeMd="6"
                  sizeLg="6"
                  sizeXl="6"
                  className="column"
                >
                  <IonItem lines="none" className="form-item title">
                    <IonInput
                      className="input-field"
                      name="title"
                      value={name}
                      onIonChange={(e) => setName(e.detail.value!)}
                      type="text"
                      placeholder="Title"
                      required
                    ></IonInput>
                  </IonItem>
                </IonCol>
                <IonCol
                  sizeXs="12"
                  sizeSm="6"
                  sizeMd="6"
                  sizeLg="6"
                  sizeXl="6"
                  className="column"
                >
                  <IonItem lines="none" className="form-item">
                    <IonInput
                      className="input-field"
                      name="latitude"
                      value={latitude}
                      onIonChange={(e) =>
                        setLatitude(parseFloat(e.detail.value!))
                      }
                      type="text"
                      placeholder="Latitude"
                      required
                    ></IonInput>
                    <IonInput
                      className="input-field"
                      name="longitude"
                      value={longitude}
                      onIonChange={(e) =>
                        setLongitude(parseFloat(e.detail.value!))
                      }
                      type="text"
                      placeholder="Longitude"
                      required
                    ></IonInput>
                    <IonButton
                      onClick={() => getPosition()}
                      className="position-button"
                    >
                      <IonIcon icon={pinOutline}></IonIcon>
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol
                  sizeXs="12"
                  sizeSm="12"
                  sizeMd="12"
                  sizeLg="12"
                  sizeXl="12"
                >
                  <IonItem lines="none" className="form-item mt1">
                    <IonTextarea
                      className="input-field textarea"
                      name="description"
                      value={text}
                      onIonChange={(e) => setText(e.detail.value!)}
                      placeholder="Description"
                      required
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              {retFields}
              <IonRow>
                <IonCol>
                  <IonItem lines="none" className="form-item mt1">
                    <IonButton type="submit" className="create-button">
                      Insert
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default Review;
