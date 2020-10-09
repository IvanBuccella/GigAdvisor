import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonIcon,
  IonButtons,
  IonRouterLink,
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
                <IonRouterLink href="/" className="footer-button">
                  <IonIcon
                    icon={homeOutline}
                    className={"" + isMenuItemActive("/")}
                  />
                  <span className={"" + isMenuItemActive("/")}>Home</span>
                </IonRouterLink>

                <IonRouterLink href="/modules" className="footer-button">
                  <IonIcon
                    icon={walletOutline}
                    className={"" + isMenuItemActive("/modules")}
                  />
                  <span className={"" + isMenuItemActive("/modules")}>
                    Modules
                  </span>
                </IonRouterLink>
                <IonRouterLink href="/team" className="footer-button">
                  <IonIcon
                    icon={peopleOutline}
                    className={"" + isMenuItemActive("/team")}
                  />
                  <span className={"" + isMenuItemActive("/team")}>Team</span>
                </IonRouterLink>
                <IonRouterLink href="/pubblications" className="footer-button">
                  <IonIcon
                    icon={newspaperOutline}
                    className={"" + isMenuItemActive("/pubblications")}
                  />
                  <span className={"" + isMenuItemActive("/pubblications")}>
                    Pubblications
                  </span>
                </IonRouterLink>
              </IonButtons>
            </IonToolbar>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
