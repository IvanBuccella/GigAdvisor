import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonText,
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
const Team: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container team">
        <h1>Team</h1>
        <IonText>
          The project stems from an ongoing interdisciplinary collaboration
          involving researchers with a background in legal informatics, computer
          science, labor law, economic sociology.
        </IonText>
        <IonRow>
          <IonCol>
            <IonCard
              href="mailto:lettieri.nicola@gmail.com"
              className="team-member"
            >
              <IonCardHeader>
                <IonCardSubtitle>
                  <img
                    src="/assets/pages/team/lettieri.jpg"
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Nicola Lettieri</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Researcher at INAPP, Rome. Adjunct professor of Legal
                informatics at the University of Sannio
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="mailto:dmalandrino@unisa.it" className="team-member">
              <IonCardHeader>
                <IonCardSubtitle>
                  <img
                    src="/assets/pages/team/malandrino.jpg"
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Delfina Malandrino</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Associate professor at the Department of Computer Science of the
                University of Salerno, member of ISISLab Research Lab
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="mailto:rzaccagnino@unisa.it" className="team-member">
              <IonCardHeader>
                <IonCardSubtitle>
                  <img
                    src="/assets/pages/team/zaccagnino.png"
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Rocco Zaccagnino</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Research fellow and adjunct professor at Department of Computer
                Science of the University of Salerno
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard href="mailto:alguarino@unisa.it" className="team-member">
              <IonCardHeader>
                <IonCardSubtitle>
                  <img src="/assets/pages/team/guarino.jpg" className="image" />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Alfonso Guarino</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Research fellow at the Department of Computer Science of the
                University of Salerno and member of ISISLab Research Lab
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="mailto:fabiog97@gmail.com" className="team-member">
              <IonCardHeader>
                <IonCardSubtitle>
                  <img src="/assets/pages/team/grauso.png" className="image" />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Fabio Grauso</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Bachelor's Degree in Computer Science at the University of
                Salerno
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonCard
              href="mailto:carminetramontano0@gmail.com"
              className="team-member"
            >
              <IonCardHeader>
                <IonCardSubtitle>
                  <img
                    src="/assets/pages/team/tramontano.jpg"
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Carmine Tramontano</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Bachelor's Degree in Computer Science at the University of
                Salerno
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard href="mailto:ivan@buccella.me" className="team-member">
              <IonCardHeader>
                <IonCardSubtitle>
                  <img
                    src="/assets/pages/team/buccella.jpg"
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle className="blue">Ivan Buccella</IonCardTitle>
              </IonCardHeader>
              <IonCardContent className="description">
                Bachelor's Degree in Computer Science at the University of
                Salerno
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Team;
