import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent, IonText, IonSlides } from "@ionic/react";

const utilities = new Utils();
const About: React.FC = () => {
  const slideOpts = {
    initialSlide: 0,
  };

  return (
    <IonSlide>
      <IonContent className="page-container about">
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold">
              GigAdvisor in a nutshell...
            </h1>
            <h5 className="text-left pl0 orange">
              An interdisciplinary research
            </h5>

            <p className="text-left mt0 mb0">
              GigAdvisor is an experimental platform designed to work within the
              scenario of gig economy, a phenomenon marked by a variety of
              issues - low levels of social protection for gig-workers;
              pervasive algorithmic control; atomization of work processes, etc.
              - that increase the need for more insightful empirical
              investigations and effective regulatory solutions.
              <br />
              <br />
              The platform allows crowdworkers to express, share and discuss
              different kinds of assessments (by means of predefined scales and
              free text) on the quality of the experiences with the platforms
              they work for. 
              <br />
              <br />
              The tool stems from a research project that put
              <span className="bold red"> critical data studies </span>and
              data-driven
              <span className="bold blue"> computational social science </span>
              to explore new approaches to the analysis and regulation of
              digital economy.  
            </p>
          </IonSlide>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold">A tool for...</h1>
            <div className="image-container text-center">
              <img src="/assets/pages/about/a-tool-for.png" />
            </div>
          </IonSlide>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold">A tool for...</h1>
            <h5 className="text-left text-center-mobile pl0 bold blue">
              gigworkers
            </h5>
            <p className="text-left text-center-mobile mt0 mb0">
              GigAdvisor allows crowd workers to connect and discuss their
              evaluation of the experiences they had with the labour platforms.
            </p>
            <br />
            <h5 className="text-left text-center-mobile pl0 bold green">
              citizens & public authorities
            </h5>
            <p className="text-left text-center-mobile mt0 mb0">
              GigAdvisor allows citizens and public authorities can be better
              kept informed about the behavior of digital labor platforms.
            </p>
            <br />
            <h5 className="text-left text-center-mobile pl0 bold red">
              activists
            </h5>
            <p className="text-left text-center-mobile mt0 mb0">
              GigAdvisor is a tool for activist and NGOs engaged in the fight
              for workers’ rights protection can exploit the power of data and
              computational social science to carry out their critical role in a
              better-informed way.
            </p>
            <br />
            <h5 className="text-left text-center-mobile pl0 bold red">
              researchers
            </h5>

            <p className="text-left text-center-mobile mt0 mb0">
              GigAdvisor allows scholars from law and critical data studies can
              root in data-driven analysis in computational social science
            </p>
          </IonSlide>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold">How it works:</h1>
            <div className="image-container text-center">
              <img src="/assets/pages/about/how-it-works.png" />
            </div>
          </IonSlide>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold orange">
              The goals
            </h1>
            <p className="text-left text-center-mobile mt0 mb0">
              The project aims to sketch a methodological framework, a research
              perspective embrace to achieve a more organic view of the dynamics
              that, at various levels, affect the world of work. In more
              concrete terms,
            </p>
            <br />
            <br />
            <h5 className="text-left text-center-mobile pl0 bold purple">
              Data harvesting for data-driven critical analysis of gig economy
            </h5>
            <br />
            <p className="text-left mt0 mb0">
              The first goal is to gather data to be used in CSS research on gig
              economy. Data collected through users’ interaction with the tool -
              enriched with geographical and temporal metatags - will not only
              be made available to the workers thanks to real-time
              visualizations, but also exploited for research purposes. Social
              network analysis, sentiment analysis and other CSS methods can be
              precious to answer questions of both normative and empirical
              nature:
              <ul>
                <li>assess the impact of legislative policies</li>
                <li>
                  support ​(temporally and spatially) ​fine-grained
                  investigation about working conditions
                </li>
                <li>
                  identify patterns in the behavior of market operators (e.g.
                  unfair practices)
                </li>
              </ul>
            </p>
          </IonSlide>
          <IonSlide>
            <h1 className="text-left text-center-mobile bold orange">
              The goals
            </h1>
            <h5 className="text-left text-center-mobile pl0 bold purple">
              Regulatory design
            </h5>
            <p className="text-left text-center-mobile mt0 mb0">
              <br />
              Drawing from the “techno-regulation” paradigm - the idea of
              influencing individuals by building norms or nudge strategies into
              technological devices{" "}
              <span title="Van den Berg, B., & Leenes, R. E. (2013). Abort, retry, fail: scoping techno-regulation and other techno-effects. In Human law and computer law: Comparative perspectives (pp. 67-87). Springer, Dordrecht.">
                (Leenes 2013)
              </span>{" "}
              - a second goal is to start fiddling with the design of solutions
              allowing to exploit the regulatory effects that can be induced by
              tools allowing to build up a reputational image of labor
              platforms. Special attention will be paid, in this vein, to figure
              out new ways to leverage the power of analytics and visualization
              to increase the conditioning power of a “data-enhanced”
              reputation.
            </p>
            <h5 className="text-left text-center-mobile pl0 bold purple">
              Next steps
            </h5>
            <p className="text-left text-center-mobile mt0 mb0">
              We are planning to use GigAdvisor within experimental settings
              involving real workers and designed in collaboration with unions
              and gig-workers associations. If you are interested, feel free to
              contact us.
            </p>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonSlide>
  );
};

export default About;
