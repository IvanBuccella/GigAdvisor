import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import {
  homeOutline,
  walletOutline,
  peopleOutline,
  newspaperOutline,
} from "ionicons/icons";

const Footer: React.FC = () => {
  const isMenuItemActive = (pageName: string) => {
    if (pageName == window.location.pathname) {
      return "blue";
    }
    return "";
  };

  return (
    <IonFooter className="footer">
      <IonToolbar className="footer-toolbar">
        <IonGrid className="footer-container">
          <IonRow className="footer-row">
            <IonToolbar className="footer-menu-container">
              <IonButtons slot="secondary" className="footer-buttons">
                <IonButton
                  fill="clear"
                  color="light"
                  href="/"
                  className="footer-button"
                >
                  <IonIcon
                    slot="start"
                    icon={homeOutline}
                    className={"myclass " + isMenuItemActive("/")}
                  />
                </IonButton>
                <IonButton
                  fill="clear"
                  color="light"
                  href="/modules"
                  className="footer-button"
                >
                  <IonIcon
                    slot="start"
                    icon={walletOutline}
                    className={"" + isMenuItemActive("/modules")}
                  />
                </IonButton>
                <IonButton
                  fill="clear"
                  color="light"
                  href="/team"
                  className="footer-button"
                >
                  <IonIcon
                    slot="start"
                    icon={peopleOutline}
                    className={"" + isMenuItemActive("/team")}
                  />
                </IonButton>
                <IonButton
                  fill="clear"
                  color="light"
                  href="/pubblications"
                  className="footer-button"
                >
                  <IonIcon
                    slot="start"
                    icon={newspaperOutline}
                    className={"" + isMenuItemActive("/pubblications")}
                  />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
