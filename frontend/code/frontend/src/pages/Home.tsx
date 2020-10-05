import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonModal,
  IonButton,
  IonTitle,
  IonText,
} from "@ionic/react";
const utilities = new Utils();

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false); /*useState(true)*/
  return (
    <IonSlide>
      <IonContent className="page-container home">
        <IonModal isOpen={showModal} cssClass="important-notice-modal">
          <IonTitle className="title">Important Notice!</IonTitle>
          <IonText className="text">
            This is a prototype of an experimental web-application under
            development for pure research purposes. Data presented in following
            pages are fictitious.{" "}
          </IonText>
          <IonButton onClick={() => setShowModal(false)} className="button">
            I GOT IT
          </IonButton>
        </IonModal>

        <p>This is the home page</p>
      </IonContent>
    </IonSlide>
  );
};

export default Home;
