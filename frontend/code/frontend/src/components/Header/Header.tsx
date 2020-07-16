import React from "react";
import {
  IonHeader,
  IonCol,
  IonToolbar,
  IonGrid,
  IonRow,
  IonMenuButton,
} from "@ionic/react";

const Header: React.FC = () => {
  return (
    <IonHeader className="header">
      <IonToolbar className="header-toolbar">
        <IonGrid className="header-container">
          <IonRow className="header-row">
            <IonCol className="header-col col-toggle" size="1">
              <IonMenuButton
                autoHide={false}
                menu="header-menu"
                className="header-button"
              ></IonMenuButton>
            </IonCol>
            <IonCol className="header-col">
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
