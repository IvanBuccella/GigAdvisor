import React from "react";
import {
  IonHeader,
  IonCol,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonGrid,
  IonRow,
} from "@ionic/react";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonTitle>
                <IonRouterLink href="/home">Home</IonRouterLink>
              </IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle>
                <IonRouterLink href="/login">Login</IonRouterLink>
              </IonTitle>
            </IonCol>
            <IonCol>
              <IonTitle>
                <IonRouterLink href="/logout">Logout</IonRouterLink>
              </IonTitle>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
