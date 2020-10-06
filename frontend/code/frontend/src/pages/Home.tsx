import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonModal,
  IonButton,
  IonTitle,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  helpOutline,
  languageOutline,
  receiptOutline,
  logInOutline,
} from "ionicons/icons";
const utilities = new Utils();

const Home: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false); /*useState(true)*/
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  return (
    <IonSlide>
      <IonContent className="page-container home">
        <IonModal isOpen={showNotice} cssClass="modal important-notice-modal">
          <IonTitle className="title">Important Notice!</IonTitle>
          <IonText className="text">
            This is a prototype of an experimental web-application under
            development for pure research purposes. Data presented in following
            pages are fictitious.{" "}
          </IonText>
          <IonButton onClick={() => setShowNotice(false)} className="button">
            I GOT IT
          </IonButton>
        </IonModal>

        <IonModal isOpen={showLanguageModal} cssClass="modal language-modal">
          <IonTitle className="title">Choose your language</IonTitle>
          <IonText className="text">
            This is a prototype of an experimental web-application under
            development for pure research purposes. Data presented in following
            pages are fictitious.{" "}
          </IonText>
          <IonButton
            onClick={() => setShowLanguageModal(false)}
            className="button"
          >
            I GOT IT
          </IonButton>
        </IonModal>
        <IonRow>
          <IonCol>
            <IonCard href="/login">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon icon={logInOutline} size="large" className="icon" />
                </IonCardSubtitle>
                <IonCardTitle>Log In</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard href="/know-your-rights">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={receiptOutline}
                    size="large"
                    className="icon"
                  />
                </IonCardSubtitle>
                <IonCardTitle>Know your rights</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/language">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={languageOutline}
                    size="large"
                    className="icon"
                  />
                </IonCardSubtitle>
                <IonCardTitle>Language</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/about">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon icon={helpOutline} size="large" className="icon" />
                </IonCardSubtitle>
                <IonCardTitle>About</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Home;
