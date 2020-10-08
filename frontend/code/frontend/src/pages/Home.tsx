import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonModal,
  IonButton,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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
import { withRouter } from "react-router-dom";
const utilities = new Utils();

const Home: React.FC = () => {
  const [showNotice, setShowNotice] = useState(
    false
  ); /*useState(true) Remember to set it as true!!!*/
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  return (
    <IonSlide>
      <IonContent className="page-container home">
        <IonModal isOpen={showNotice} cssClass="modal important-notice-modal">
          <h3 className="title">Important Notice!</h3>
          <IonText className="text">
            This is a prototype of an experimental web-application under
            development for pure research purposes. Data presented in following
            pages are fictitious.{" "}
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
          <IonText className="text">Languages Business Logic Here</IonText>
          <IonButton
            onClick={() => setShowLanguageModal(false)}
            className="button background-blue"
          >
            Save
          </IonButton>
        </IonModal>
        <IonRow>
          <IonCol>
            <IonCard href="/login">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={logInOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Log In</h3>
                </IonCardTitle>
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
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Know your rights</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard
              href="javascript: void;"
              onClick={(e) => setShowLanguageModal(true)}
            >
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={languageOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Language</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/about">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={helpOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>About</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Home;
