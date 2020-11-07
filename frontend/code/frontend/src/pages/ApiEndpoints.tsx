import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCol,
  IonRow,
  IonCardSubtitle,
} from "@ionic/react";

const utilities = new Utils();
const ApiEndpoints: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container api-endpoints">
        <h1 className="mt1 mb1">API Endpoints</h1>
        <IonRow>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/categories"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Categories</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>none</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/fields"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Fields</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>none</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/fields-rating"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Fields Rating</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>none</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/platforms"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Platforms</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>- "slug" [string] (optional): the Platform slug</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/platforms-rating"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Platforms Rating</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>none</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/platform-trend"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Platform Trend</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>- "slug" [string]: the Platform slug</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol sizeXl="6" sizeLg="6" sizeMd="6" sizeSm="6" sizeXs="12">
            <IonCard
              href={utilities.getApiEndpoint(true) + "/reviews"}
              target="blank"
            >
              <IonCardHeader>
                <IonCardTitle>
                  <h3 className="mt1">Reviews</h3>
                </IonCardTitle>
                <IonCardSubtitle>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent accumsan neque quam, nec auctor leo mattis id. Nam
                  molestie ipsum metus, sit amet rhoncus diam pellentesque et.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent className="text-left">
                <span className="bold">Parameters:</span>
                <br />
                <span>- "slug" [string]: the Platform slug</span>
                <br />
                <span>
                  - "withAvg" [int 0:1]: get the platform reviews average too
                </span>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default ApiEndpoints;
