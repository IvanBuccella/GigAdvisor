import React from "react";
import {
  IonHeader,
  IonCol,
  IonToolbar,
  IonGrid,
  IonRow,
  IonMenuButton,
  IonLabel,
} from "@ionic/react";

const Header: React.FC = () => {
  return (
    <IonHeader className="header">
      <IonToolbar className="header-toolbar">
        <IonGrid className="header-container">
          <IonRow className="header-row">
            <IonCol className="header-col" size="12">
              <a href="/">
                <img alt="logo" src="/assets/logo.png" className="logo" />
              </a>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
