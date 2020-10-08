import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent, IonRow, IonText } from "@ionic/react";

const utilities = new Utils();
const KnowYourRights: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container know-your-rights">
        <IonText>
          <h1>Know Your Rights</h1>
          <p className="text-left">
            One of the goals of GigAdvisor is to inform crowd-workers. An
            accurate information is a sine qua to enable an effective protection
            of workers’ rights. Here below, for{" "}
            <b className="blue">mere example purposes</b>
            , a brief overview relating to the Italian legal system.
            <br />
            We focus on the <b className="orange">right n. 128/2019</b>, a norm
            aimed at providing{" "}
            <b className="blue">economic, as well as regulatory protection</b>
            to particular categories of vulnerable workers, such as{" "}
            <b className="orange">riders</b> - autonomous workers equipped with
            bikes or mopeds, employed in delivering goods on behalf of third
            parties - workers with disabilities, socially useful employees and
            employees of public utility, precarious workers.
            <br /> According to the <b className="orange">right n. 128/2019</b>,
            riders have the following rights:
          </p>
        </IonText>

        <IonRow className="right">
          <div className="right-header">
            <img
              src="/assets/pages/know-your-rights/01.jpg"
              className="image"
            />

            <h5 className="title purple ml1">
              THE RIGHT TO A WRITTEN CONTRACT
            </h5>
          </div>

          <IonText className="right-description">
            <p className="text-left">
              right 128/2019 provides that individual employment contracts must
              be proven <b className="purple">in writing</b>. Should the
              employer fail to prove the contract, the rider is entitled to an
              indemnity up to the compensation received in the last 12 months.
            </p>
          </IonText>
        </IonRow>
        <IonRow className="right">
          <div className="right-header">
            <img
              src="/assets/pages/know-your-rights/02.png"
              className="image"
            />
            <h5 className="title ml1">THE RIGHT TO BE INFORMED</h5>
          </div>

          <IonText className="right-description">
            <p className="text-left">
              Workers must receive{" "}
              <b className="blue">all information useful</b> for the protection
              of their interests, their rights and their safety.
            </p>
          </IonText>
        </IonRow>
        <IonRow className="right">
          <div className="right-header">
            <img
              src="/assets/pages/know-your-rights/03.jpg"
              className="image"
            />
            <h5 className="title green ml1">THE RIGHT TO A MINIMUM WAGE</h5>
          </div>

          <IonText className="right-description">
            <p className="text-left">
              Riders shall have the right to a{" "}
              <b className="green">minimum wage</b> established by the National
              Collective Bargaining Agreements entered into by the most
              representative Trade Unions and employers' organizations.
            </p>
          </IonText>
        </IonRow>
        <IonRow className="right">
          <div className="right-header">
            <img
              src="/assets/pages/know-your-rights/04.png"
              className="image"
            />
            <h5 className="title red ml1">
              THE RIGHT TO ADDITIONAL INDEMNITIES
            </h5>
          </div>

          <IonText className="right-description">
            <p className="text-left">
              Riders must be guaranteed with an{" "}
              <b className="red">additional indemnity</b> of no less than 10%
              for the servicers rendered: - at night; - during public holidays;
              - under unfavourable weather conditions.
            </p>
          </IonText>
        </IonRow>
        <IonRow className="right">
          <div className="right-header">
            <img
              src="/assets/pages/know-your-rights/05.png"
              className="image"
            />
            <h5 className="title orange ml1">
              THE RIGHT TO A PUBLIC INSURANCE
            </h5>
          </div>

          <IonText className="right-description">
            <p className="text-left">
              Labour platforms emloying riders must guarantee them a{" "}
              <b className="orange">mandatory public insurance</b> against
              accidents at work and occupational diseases.
            </p>
          </IonText>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default KnowYourRights;
