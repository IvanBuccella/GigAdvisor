import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { timeOutline } from "ionicons/icons";

const utilities = new Utils();

const Platform: React.FC = () => {
  const [platform, setPlatform] = useState({
    id: 0,
    name: "",
    slug: "",
    logo: "",
    category: "",
    avg: 0,
    fields: [],
  });
  const [reviews, setReviews] = useState([]);

  function ReviewsCards() {
    let ret = <></>;
    let review = null;
    for (let i = 0; i < reviews.length; i++) {
      review = reviews[i];
      ret = (
        <>
          {ret}
          <IonRow className="review">
            <IonCard className="card">
              <IonCardHeader>
                <IonCardSubtitle className="subtitle text-left">
                  <IonIcon icon={timeOutline} className="icon" />
                  <p className="text-left mt0 mb0">{review["date"]}</p>
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3 className="title blue text-left">{review["name"]}</h3>
                  <h5 className="subtitle black text-left">{review["text"]}</h5>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonRow>
        </>
      );
    }

    return ret;
  }

  useEffect(() => {
    let data = {
      slug: utilities.getLastItem(window.location.pathname),
      id: 0,
    };
    utilities.postCall("platforms", JSON.stringify(data)).then((res) => {
      if (res.status) {
        let elem = res.data;

        setPlatform({
          id: elem.id,
          name: elem.name,
          slug: elem.slug,
          logo: elem.logo,
          category: elem.category.name,
          avg: elem.avg,
          fields: elem.fields,
        });

        data = {
          slug: "",
          id: elem.id,
        };
        utilities.postCall("reviews", JSON.stringify(data)).then((res) => {
          if (res.status) {
            res.data.forEach((elem: any) => {
              setReviews(res.data);
            });
          }
        });
      }
    });
  }, []);

  const fields = [];
  let field = null;
  for (let i = 0; i < platform.fields.length; i++) {
    field = platform.fields[i];
    fields.push(
      <IonRow className="rating pt1 pb1 text-left">
        <p className="title grey mt0 mb0">{field["name"]}</p>
        <p className="value grey mt0 mb0">{field["avg"]}</p>
      </IonRow>
    );
  }

  return (
    <IonSlide>
      <IonContent className="page-container platform">
        <h1 className="form-title mt1 mb1">See Reviews</h1>
        <IonRow className="platform-container">
          <IonCol className="platform-left">
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonImg
                    src={utilities.getApiEndpoint() + platform.logo}
                    className="image"
                  />
                </IonCardSubtitle>
                <IonCardTitle>
                  <h3 className="title blue text-left">{platform.name}</h3>
                  <h6 className="category grey text-left">
                    Category: {platform.category}
                  </h6>
                  <h5 className="rating-total black text-left">
                    Rating: {platform.avg}
                  </h5>
                  <div className="rating-list mt1 mb1">{fields}</div>
                </IonCardTitle>
              </IonCardHeader>
            </IonCard>
          </IonCol>
          <IonCol className="platform-right">
            <IonButton
              onClick={() => utilities.pageRedirect("review/" + platform.slug)}
              className="review-button text-left"
            >
              Rate {platform.name} Platform
            </IonButton>
            <ReviewsCards />
          </IonCol>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default Platform;
