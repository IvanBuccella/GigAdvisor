import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonText,
  IonImg,
  IonRouterLink,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import {
  barChartOutline,
  starOutline,
  peopleOutline,
  receiptOutline,
} from "ionicons/icons";

const utilities = new Utils();
const Modules: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container modules">
        <IonRow>
          <IonCol>
            <IonCard href="/rate-a-gig">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon icon={starOutline} size="large" className="icon" />
                </IonCardSubtitle>
                <IonCardTitle>Rate your gig</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/blog">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon icon={peopleOutline} size="large" className="icon" />
                </IonCardSubtitle>
                <IonCardTitle>Connect with Others</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/ratings">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={barChartOutline}
                    size="large"
                    className="icon"
                  />
                </IonCardSubtitle>
                <IonCardTitle>Platform's Rating</IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Modules;
