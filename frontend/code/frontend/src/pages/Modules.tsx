import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import {
  barChartOutline,
  starOutline,
  peopleOutline,
  pinOutline,
} from "ionicons/icons";

const utilities = new Utils();
const Modules: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container modules">
        <IonRow>
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
                  <h6 className="black">
                    This module shows real-time analysis and visualization of
                    data resulting from the assessments made by crowd workers.
                  </h6>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/platforms" className="card module">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={starOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Reviews</h3>
                  <h6 className="black">
                    This module allowes crowd workers to evaluate digital labour
                    platforms they work for, according to a series of predefined
                    criteria
                  </h6>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/platforms-map" className="card module">
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonIcon
                    icon={pinOutline}
                    size="large"
                    className="icon blue"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3>Reviews' Maps</h3>
                  <h6 className="black">
                    This module allowes crowd workers to see reviews maps.
                  </h6>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="/connect-with-others" className="card module">
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
                  <h6 className="black">
                    This module allowes crowd workers to discuss issues and
                    share ideas about their working experience
                  </h6>
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
