import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent, IonText } from "@ionic/react";
import {
  barChartOutline,
  starOutline,
  peopleOutline,
  receiptOutline,
} from "ionicons/icons";

const utilities = new Utils();
const About: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container about">
        <h1>GigAdvisor in a nutshell...</h1>
        <h5 className="text-left pl0">An interdisciplinary research</h5>
        <IonText>
          <p className="text-left mt0 mb0">
            GigAdvisor is an experimental platform designed to work within the
            scenario of digital labor platforms. The phenomenon is marked by a
            variety of issues - low levels of social protection for gig-workers;
            pervasive algorithmic control; atomization of work processes, etc. -
            that increase the need for more insightful empirical investigations
            and effective regulatory solutions. The platform allows crowdworkers
            to express, share and discuss different kinds of assessments (by
            means of predefined scales and free text) on the quality of their
            experiences with the platforms they work for. Resulting from a
            research project that brings together labor studies and data-driven
            computational social science (CSS), the initiative is an attempt to
            explore new approaches to the analysis and regulation of digital
            economy.
          </p>
        </IonText>
        <h5 className="orange text-left pl0">The goals</h5>
        <IonText>
          <p className="text-left mt0 mb0">
            he project aims to sketch a methodological framework, a research
            perspective labor studies should embrace to achieve a more organic
            view of the dynamics that, at various levels, affect the world of
            work. In more concrete terms, the initiative has two main goals.
            <br />
            <br />
            <i> Data harvesting for data-driven labour studies </i>
            <br />
            The first goal is to gather data to be used in CSS research on gig
            economy. Data collected through users’ interaction with the tool -
            enriched with geographical and temporal metatags - will not only be
            made available to the workers thanks to real-time visualizations,
            but also exploited for research purposes. Social network analysis,
            sentiment analysis and other CSS methods can be precious to answer
            questions of both normative and empirical nature:
            <ul>
              <li>assess the impact of legislative policies</li>
              <li>
                support ​(temporally and spatially) ​fine-grained investigation
                about working conditions
              </li>
              <li>
                identify patterns in the behavior of market operators (e.g.
                unfair practices)
              </li>
            </ul>
            <br />
            <i> Regulatory design </i>
            <br />
            Drawing from the “techno-regulation” paradigm - the idea of
            influencing individuals by building norms or nudge strategies into
            technological devices{" "}
            <span title="Van den Berg, B., & Leenes, R. E. (2013). Abort, retry, fail: scoping techno-regulation and other techno-effects. In Human law and computer law: Comparative perspectives (pp. 67-87). Springer, Dordrecht.">
              (Leenes 2013)
            </span>{" "}
            - a second goal is to start fiddling with the design of solutions
            allowing to exploit the regulatory effects that can be induced by
            tools allowing to build up a reputational image of labor platforms.
            Special attention will be paid, in this vein, to figure out new ways
            to leverage the power of analytics and visualization to increase the
            conditioning power of a “data-enhanced” reputation.
          </p>
        </IonText>

        <h5 className="purple text-left pl0">Next steps</h5>
        <IonText>
          <p className="text-left mt0 mb0">
            We are planning to use GigAdvisor within experimental settings
            involving real workers and designed in collaboration with unions and
            gig-workers associations. If you are interested, feel free to
            contact us.
          </p>
        </IonText>
      </IonContent>
    </IonSlide>
  );
};

export default About;
