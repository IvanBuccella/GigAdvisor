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
import { pinOutline, timeOutline } from "ionicons/icons";
import Loader from "../components/Loader";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const utilities = new Utils();

const PlatformMap: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
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
  const [centerLatitude, setCenterLatitude] = useState(41.909986);
  const [centerLongitude, setCenterLongitude] = useState(12.3959135);

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
            setReviews(res.data);
          }
          setShowLoader(false);
        });
      }
    });
  }, []);

  function MapMarkers() {
    let greenMark =
      "https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-a.png";
    let redMark =
      "https://mt.google.com/vt/icon?color=ff004C13&name=icons/spotlight/spotlight-waypoint-b.png";

    let ret = <></>;
    for (let i = 0; i < reviews.length; i++) {
      if (
        reviews[i]["latitude"] != undefined &&
        reviews[i]["latitude"] > 0 &&
        reviews[i]["longitude"] != undefined &&
        reviews[i]["longitude"] > 0
      ) {
        if (i == 0) {
          setCenterLatitude(reviews[i]["latitude"]);
          setCenterLongitude(reviews[i]["longitude"]);
        }
        ret = (
          <>
            {ret}
            <Marker
              position={{
                lat: reviews[i]["latitude"],
                lng: reviews[i]["longitude"],
              }}
              icon={redMark}
            />
          </>
        );
      }
    }
    return ret;
  }

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container platform-map">
          <h1 className="form-title mt1 mb1">
            Reviews' Map for {platform.name}
          </h1>
          <IonRow className="platform-container">
            <LoadScript googleMapsApiKey="AIzaSyAa9Ex4TeHbDb5ZWYA3fKN_n5iki_Np_jA">
              <GoogleMap
                mapContainerStyle={{
                  width: "100%",
                  height: "70vh",
                }}
                center={{ lat: centerLatitude, lng: centerLongitude }}
                zoom={6}
              >
                <MapMarkers />
              </GoogleMap>
            </LoadScript>
          </IonRow>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default PlatformMap;
