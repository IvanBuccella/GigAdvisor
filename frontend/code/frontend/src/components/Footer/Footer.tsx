import React from "react";
import { IonFooter, IonTitle, IonToolbar } from "@ionic/react";
import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonTitle>Footer</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
