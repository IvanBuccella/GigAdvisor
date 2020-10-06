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
  IonTitle,
} from "@ionic/react";
import {
  barChartOutline,
  starOutline,
  peopleOutline,
  receiptOutline,
} from "ionicons/icons";

const utilities = new Utils();
const Pubblications: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container pubblications">
        <IonTitle>
          <h1 className="blue">Publications and Presentations</h1>
        </IonTitle>
        <IonCard
          href="https://www.mdpi.com/1999-5903/11/7/163/htm"
          target="blank"
        >
          <IonCardHeader>
            <IonCardTitle className="text-left">
              Lettieri, Nicola, et al. Platform Economy and
              Techno-Regulation—Experimenting with Reputation and Nudge. Future
              Internet, 2019, 11.7: 163.
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="description blue">
            See more...
          </IonCardContent>
        </IonCard>
        <IonCard
          href="https://oa.inapp.org/xmlui/handle/123456789/371"
          target="blank"
        >
          <IonCardHeader>
            <IonCardTitle className="text-left">
              De Minicis, M., Donà, S., Lettieri, N., & Marocco, M. (2019).
              Disciplina e tutela del lavoro nelle digital labour platform. Un
              modello di tecno-regolazione.
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="description blue">
            See more...
          </IonCardContent>
        </IonCard>
        <IonCard
          href="https://prezi.com/htu90mezgz09/digital-labour-platforms-algorithmic-governance-and-techno-regulation-towards-the-computational-evolution-of-law-and-labor-studies/?utm_campaign=share&utm_medium=copy"
          target="blank"
        >
          <IonCardHeader>
            <IonCardTitle className="text-left">
              Lettieri N., Digital Labour platforms, algorithmic governance and
              techno-regulation: towards the computational evolution of law and
              labor studies. Talk presented at the "Reshaping Work 2019"
              International Conference - Amsterdam - 24 October 2019
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent className="description blue">
            See more...
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonSlide>
  );
};

export default Pubblications;
