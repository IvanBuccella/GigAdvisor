import React from "react";
import {
  IonHeader,
  IonCol,
  IonToolbar,
  IonGrid,
  IonRow,
  IonRouterLink,
  IonIcon,
} from "@ionic/react";
import { Utils } from "../../core/Utils";
import { personCircleOutline } from "ionicons/icons";

const Header: React.FC = () => {
  const utilities = new Utils();

  return (
    <IonHeader className="header">
      <IonToolbar className="header-toolbar">
        <IonGrid className="header-container">
          <IonRow className="header-row">
            <IonCol className="header-col" size="12">
              <IonRouterLink href="/">
                <img
                  alt="logo"
                  src="/assets/logo-header.png"
                  className="logo"
                />
              </IonRouterLink>
            </IonCol>
            <IonCol className="header-col login" size="2">
              <IonRouterLink href="/profile">
                <IonIcon
                  icon={personCircleOutline}
                  className={"icon " + utilities.isActiveMenuItem("user")}
                  size="large"
                />
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
