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
import { Utils } from "../../core/Utils";
import { homeOutline, cogOutline } from "ionicons/icons";

const Footer: React.FC = () => {
  const utilities = new Utils();

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
                    className={"" + utilities.isActiveMenuItem("home")}
                    size="large"
                  />
                  <span className={"" + utilities.isActiveMenuItem("home")}>
                    Home
                  </span>
                </IonRouterLink>

                <IonRouterLink href="/modules" className="footer-button">
                  <IonIcon
                    icon={cogOutline}
                    className={"" + utilities.isActiveMenuItem("modules")}
                    size="large"
                  />
                  <span className={"" + utilities.isActiveMenuItem("modules")}>
                    Modules
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
