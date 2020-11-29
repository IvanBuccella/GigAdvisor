import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonModal,
  IonButton,
  IonText,
  IonIcon,
  IonRow,
  IonCol,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRouterLink,
} from "@ionic/react";
import { logInOutline, helpCircleOutline } from "ionicons/icons";

const utilities = new Utils();

function LoginCta() {
  if (!utilities.isAuthenticatedUser()) {
    return (
      <IonCol>
        <IonRouterLink href="/login">
          <IonRow>
            <IonCol>
              <IonIcon icon={logInOutline} className="blue" size="large" />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="blue">Login</IonCol>
          </IonRow>
        </IonRouterLink>
      </IonCol>
    );
  }
  return <></>;
}

const Home: React.FC = () => {
  const [showNotice, setShowNotice] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSelected, setLanguageSelected] = useState<string>("english");

  return (
    <IonSlide>
      <IonContent className="page-container home">
        <IonModal isOpen={showNotice} cssClass="modal important-notice-modal">
          <h3 className="title">Important Notice!</h3>
          <IonText className="text">
            This is a prototype of an experimental cross-platform application
            under development for pure research purposes. Data presented in
            following pages are fictitious.
          </IonText>
          <IonButton
            onClick={() => setShowNotice(false)}
            className="button background-blue"
          >
            I GOT IT
          </IonButton>
        </IonModal>
        <IonModal isOpen={showLanguageModal} cssClass="modal language-modal">
          <h3 className="title">Choose your language</h3>
          <IonText className="text">
            <IonRadioGroup
              value={languageSelected}
              onIonChange={(e) => setLanguageSelected(e.detail.value)}
            >
              <IonLabel>English</IonLabel>
              <IonRadio slot="start" value="english" />
            </IonRadioGroup>
          </IonText>
          <IonButton
            onClick={() => setShowLanguageModal(false)}
            className="button background-blue"
          >
            Save
          </IonButton>
        </IonModal>

        <div className="content">
          <IonRow className="logo">
            <IonCol className="mobile">
              <img src="/assets/pages/home/logo-square.png" />
            </IonCol>
            <IonCol className="desktop">
              <img src="/assets/pages/home/logo-rect.png" />
            </IonCol>
          </IonRow>
          <IonRow className="ctas">
            <IonCol>
              <IonRouterLink href="/about">
                <IonRow>
                  <IonCol>
                    <IonIcon
                      icon={helpCircleOutline}
                      className="blue"
                      size="large"
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="blue">About</IonCol>
                </IonRow>
              </IonRouterLink>
            </IonCol>
            <LoginCta />
          </IonRow>
        </div>
      </IonContent>
    </IonSlide>
  );
};

export default Home;
