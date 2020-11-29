import React, { useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonIcon,
  IonSlides,
  IonButton,
} from "@ionic/react";
import { enterOutline } from "ionicons/icons";

const utilities = new Utils();
const Modules: React.FC = () => {
  const slideOpts = {
    initialSlide: 1,
  };
  return (
    <IonSlide>
      <IonContent className="page-container modules">
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide className="know-your-rights">
            <div className="text-center">
              <img src="/assets/pages/modules/know-your-rights.png" />
              <h1 className="text-center bold">Know Your Rights</h1>
              <h5 className="text-center lighter black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h5>
              <IonButton
                type="submit"
                className="button"
                href="/know-your-rights"
              >
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide className="rate-your-gig">
            <div className="text-center">
              <img src="/assets/pages/modules/rate-your-gig.png" />
              <h1 className="text-center bold">Rate Your Gig</h1>
              <h5 className="text-center lighter black">
                This module allowes crowd workers to evaluate digital labour
                platforms they work for, according to a series of predefined
                criteria
              </h5>
              <IonButton type="submit" className="button" href="/platforms">
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide className="connect-with-others">
            <div className="text-center">
              <img src="/assets/pages/modules/connect-with-others.png" />
              <h1 className="text-center bold">Connect With Others</h1>
              <h5 className="text-center lighter black">
                This module allowes crowd workers to discuss issues and share
                ideas about their working experience
              </h5>
              <IonButton
                type="submit"
                className="button"
                href="/connect-with-others"
              >
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide className="platforms-ratings">
            <div className="text-center">
              <img src="/assets/pages/modules/platforms-ratings.png" />
              <h1 className="text-center bold">Platforms Ratings</h1>
              <h5 className="text-center lighter black">
                This module shows real-time analysis and visualization of data
                resulting from the assessments made by crowd workers.
              </h5>
              <IonButton type="submit" className="button" href="/ratings">
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide className="platforms-map">
            <div className="text-center">
              <img src="/assets/pages/modules/platforms-map.png" />
              <h1 className="text-center bold">Reviews' Maps</h1>
              <h5 className="text-center lighter black">
                This module allowes crowd workers to see reviews maps.
              </h5>
              <IonButton type="submit" className="button" href="/platforms-map">
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
          <IonSlide className="api-endpoints">
            <div className="text-center">
              <img src="/assets/pages/modules/api-endpoints.png" />
              <h1 className="text-center bold">API Endpoints</h1>
              <h5 className="text-center lighter black">
                This module allowes everyone to get GigAdvisor's Data
              </h5>
              <IonButton type="submit" className="button" href="/api-endpoints">
                <IonIcon icon={enterOutline} size="medium" className="white" />
              </IonButton>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonSlide>
  );
};

export default Modules;
