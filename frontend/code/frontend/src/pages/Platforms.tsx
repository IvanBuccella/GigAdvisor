import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import Loader from "../components/Loader";

const utilities = new Utils();

const Platforms: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [platforms, setPlatforms] = useState([]);

  function PlatformCards() {
    let ret = <></>;
    let platform = null;

    for (let i = 0; i < platforms.length; i++) {
      platform = platforms[i];
      ret = (
        <>
          {ret}
          <IonCol
            className="platform"
            sizeXl="3"
            sizeLg="4"
            sizeMd="6"
            sizeSm="6"
            sizeXs="12"
          >
            <IonCard href={"/platform/" + platform["slug"]}>
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonImg
                    src={utilities.getApiEndpoint() + platform["logo"]}
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3 className="title blue text-left">{platform["name"]}</h3>
                  <h5 className="subtitle black text-left">
                    {platform["category"]["name"]}
                  </h5>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </>
      );
    }
    return ret;
  }

  useEffect(() => {
    utilities.postCall("platforms", "").then((res) => {
      if (res.status) {
        setPlatforms(res.data);
      }
      setShowLoader(false);
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container platforms">
          <h1 className="form-title mt1 mb1">Choose a Platform</h1>
          <IonRow className="platforms-list">
            <PlatformCards />
          </IonRow>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default Platforms;
