import React from "react";
import {
  IonHeader,
  IonCol,
  IonToolbar,
  IonGrid,
  IonRow,
  IonRouterLink,
} from "@ionic/react";

const Header: React.FC = () => {
  return (
    <IonHeader className="header">
      <IonToolbar className="header-toolbar">
        <IonGrid className="header-container">
          <IonRow className="header-row">
            <IonCol className="header-col" size="12">
              <IonRouterLink href="/">
                <img alt="logo" src="/assets/logo.png" className="logo" />
              </IonRouterLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
