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
  IonLabel,
  IonRadio,
  IonRadioGroup,
} from "@ionic/react";
import {
  helpOutline,
  languageOutline,
  receiptOutline,
  logInOutline,
  personCircleOutline,
  logOutOutline,
} from "ionicons/icons";

const utilities = new Utils();

function ReservedAreaCards() {
  if (utilities.isAuthenticatedUser()) {
    return (
      <IonRow>
        <IonCol>
          <IonCard href="/profile">
            <IonCardHeader>
              <IonCardSubtitle>
                <IonIcon
                  icon={personCircleOutline}
                  size="large"
                  className="icon blue"
                />
              </IonCardSubtitle>
              <IonCardTitle>
                <h3>Profile</h3>
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard href="/logout">
            <IonCardHeader>
              <IonCardSubtitle>
                <IonIcon
                  icon={logOutOutline}
                  size="large"
                  className="icon blue"
                />
              </IonCardSubtitle>
              <IonCardTitle>
                <h3>Logout</h3>
              </IonCardTitle>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    );
  }
  return (
    <IonRow>
      <IonCol>
        <IonCard href="/login">
          <IonCardHeader>
            <IonCardSubtitle>
              <IonIcon icon={logInOutline} size="large" className="icon blue" />
            </IonCardSubtitle>
            <IonCardTitle>
              <h3>Login</h3>
            </IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonCol>
    </IonRow>
  );
}

const Home: React.FC = () => {
  const [showNotice, setShowNotice] = useState(
    false
  ); /*useState(true) Remember to set it as true!!!*/
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSelected, setLanguageSelected] = useState<string>("english");

  return (
    <IonSlide>
      <IonContent className="page-container home">
        <IonModal isOpen={showNotice} cssClass="modal important-notice-modal">
          <h3 className="title">Important Notice!</h3>
          <IonText className="text">
            This is a prototype of an experimental web-application under
            development for pure research purposes. Data presented in following
            pages are fictitious.
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

        <ReservedAreaCards />
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
