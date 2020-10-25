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
  IonToast,
  IonSlide,
  IonContent,
  IonTextarea,
  IonSelectOption,
  IonSelect,
} from "@ionic/react";

const utilities = new Utils();

const TopicCreate: React.FC = () => {
  const [topicCreateInsertAlert, setTopicCreateInsertAlert] = useState(false);
  const [topicCreateInsertSuccess, setTopicCreateInsertSuccess] = useState(
    false
  );

  const [showLoader, setShowLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    utilities.pageProtected("topic-create");
    utilities.postCall("categories", "").then((res) => {
      if (res.status) {
        setCategories(res.data);
      }
    });
  }, []);

  const submitTopicCreate = () => {
    setShowLoader(true);
    let data = JSON.stringify({
      title: title,
      text: text,
      category: selectedCategory,
    });

    utilities.patchCall("topic-create", data).then((res) => {
      if (res.status) {
        setTopicCreateInsertSuccess(true);

        setTimeout(function () {
          utilities.pageRedirect("connect-with-others");
        }, 2000);
      } else {
        setTopicCreateInsertAlert(true);
      }
      setShowLoader(false);
    });
  };

  const retCategories = [];
  let category = null;
  for (let i = 0; i < categories.length; i++) {
    category = categories[i];
    retCategories.push(
      <IonSelectOption value={category["id"]}>
        {category["name"]}
      </IonSelectOption>
    );
  }

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={topicCreateInsertAlert}
        onDidDismiss={() => setTopicCreateInsertAlert(false)}
        message="Operation could not be done. Try again later"
        duration={5000}
        color="danger"
      />
      <IonToast
        isOpen={topicCreateInsertSuccess}
        onDidDismiss={() => setTopicCreateInsertSuccess(false)}
        message="Operation Completed Successfully."
        duration={5000}
        color="success"
      />

      <IonSlide>
        <IonContent className="page-container topic-create">
          <h1 className="form-title mt1 mb1">Create a new Topic</h1>

          <IonGrid>
            <form
              className="topic-create-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitTopicCreate();
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
                      value={title}
                      onIonChange={(e) => setTitle(e.detail.value!)}
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
                  <IonItem lines="none" className="form-item title">
                    <IonSelect
                      className="input-field select"
                      value={selectedCategory}
                      placeholder="Category"
                      onIonChange={(e) => setSelectedCategory(e.detail.value)}
                      multiple={false}
                    >
                      {retCategories}
                    </IonSelect>
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

              <IonRow>
                <IonCol>
                  <IonItem lines="none" className="form-item mt1">
                    <IonButton type="submit" className="create-button">
                      Create
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

export default TopicCreate;
