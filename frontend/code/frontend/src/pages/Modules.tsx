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
            <IonCard href="/rate-a-gig" className="card module">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={starOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Rate your gig</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/blog" className="card module">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={peopleOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Connect with Others</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/ratings" className="card module">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={barChartOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Platform's Rating</h3>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Modules;
