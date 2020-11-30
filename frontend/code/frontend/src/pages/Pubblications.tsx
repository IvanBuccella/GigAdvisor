import React, { useEffect, useState } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSlides,
  IonRouterLink,
} from "@ionic/react";
import xml2js from "xml2js";

const utilities = new Utils();
const Pubblications: React.FC = () => {
  const [feed, setFeed] = useState<any[]>([]);

  async function getRSS() {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/http://www.repubblica.it/rss/tecnologia/rss2.0.xml",
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "text/xml",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );
    return {
      status: response.status != 201 ? false : true,
      data: await response.text(),
    };
  }

  useEffect(() => {
    getRSS().then((res) => {
      let parser = new xml2js.Parser();
      parser.parseString(res.data, function (err: any, result: any) {
        setFeed(result.rss.channel[0].item);
      });
    });
  }, []);

  function GenerateFeed() {
    let ret = <></>;
    if (feed.length > 0) {
      for (let i = 0; i < feed.length && i < 10; i++) {
        ret = (
          <>
            {ret}
            <IonSlide className="news">
              <p className="text-left">{feed[i].title}</p>
              <IonRouterLink href={feed[i].link} target="blank">
                See more...
              </IonRouterLink>
            </IonSlide>
          </>
        );
      }
    }

    return ret;
  }

  const slideOpts = {
    initialSlide: 1,
  };
  return (
    <IonSlide>
      <IonContent className="page-container pubblications">
        <h1>Publications</h1>
        <IonSlides pager={true} options={slideOpts}>
          <IonSlide className="pubblication">
            <p className="text-left">
              Lettieri Nicola, et al. Platform Economy and
              Techno-Regulation—Experimenting with Reputation and Nudge. Future
              Internet, 2019, 11.7: 163.
            </p>
            <IonRouterLink
              href="https://www.mdpi.com/1999-5903/11/7/163/htm"
              target="blank"
            >
              See more...
            </IonRouterLink>
          </IonSlide>
          <IonSlide className="pubblication">
            <p className="text-left">
              De Minicis M., Donà S., Lettieri N., & Marocco M. (2019).
              Disciplina e tutela del lavoro nelle digital labour platform. Un
              modello di tecno-regolazione.
            </p>
            <IonRouterLink
              href="https://oa.inapp.org/xmlui/handle/123456789/371"
              target="blank"
            >
              See more...
            </IonRouterLink>
          </IonSlide>
          <IonSlide className="pubblication">
            <p className="text-left">
              Lettieri N., Digital Labour platforms, algorithmic governance and
              techno-regulation: towards the computational evolution of law and
              labor studies. Talk presented at the "Reshaping Work 2019"
              International Conference - Amsterdam - 24 October 2019
            </p>
            <IonRouterLink
              href="https://prezi.com/htu90mezgz09/digital-labour-platforms-algorithmic-governance-and-techno-regulation-towards-the-computational-evolution-of-law-and-labor-studies/?utm_campaign=share&utm_medium=copy"
              target="blank"
            >
              See more...
            </IonRouterLink>
          </IonSlide>
        </IonSlides>
        <br />
        <h1>Links</h1>
        <IonRow className="link">
          <IonCol size="2" className="left text-center">
            <img src="/assets/pages/pubblications-links/algoritmic-justice-league.png" />
          </IonCol>
          <IonCol size="10" className="right text-left">
            <h5 className="red">Algoritmic Justice League</h5>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </IonCol>
        </IonRow>
        <IonRow className="link">
          <IonCol size="2" className="left text-center">
            <img src="/assets/pages/pubblications-links/algoritmic-justice-league.png" />
          </IonCol>
          <IonCol size="10" className="right text-left">
            <h5 className="red">Algoritmic Justice League</h5>
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </IonCol>
        </IonRow>
        <br />
        <h1>News</h1>

        <IonSlides pager={true} options={slideOpts}>
          <GenerateFeed />
        </IonSlides>
      </IonContent>
    </IonSlide>
  );
};

export default Pubblications;
