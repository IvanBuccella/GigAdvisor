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
import { logOutOutline, personCircleOutline } from "ionicons/icons";

const Header: React.FC = () => {
  const utilities = new Utils();

  function UserIcon() {
    if (utilities.isAuthenticatedUser()) {
      return (
        <IonRouterLink href="/logout">
          <IonIcon
            icon={logOutOutline}
            className={"icon " + utilities.isActiveMenuItem("logout")}
            size="large"
          />
        </IonRouterLink>
      );
    } else {
      return (
        <IonRouterLink href="/profile">
          <IonIcon
            icon={personCircleOutline}
            className={"icon " + utilities.isActiveMenuItem("user")}
            size="large"
          />
        </IonRouterLink>
      );
    }
  }

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
              <UserIcon />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
