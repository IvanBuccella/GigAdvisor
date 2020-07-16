import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer">
      <IonToolbar className="footer-toolbar">
        <IonGrid className="footer-container">
          <IonRow className="footer-row">
            <IonCol className="footer-col" size="12">
              <IonLabel className="footer-text">
                &copy; GigAdvisor {new Date().getFullYear()} - All Rights
                Reserved.
              </IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
