import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent, IonText } from "@ionic/react";

const utilities = new Utils();
const PrivacyPolicy: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container privacy-policy">
        <h1 className="text-center">Privacy Policy</h1>

        <IonText>
          <p className="text-left mt0 mb0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            justo nunc, placerat sed neque auctor, malesuada dictum leo. Aenean
            vitae tortor volutpat, pellentesque eros semper, imperdiet orci.
            Cras sagittis enim sed quam tristique accumsan. Nullam sodales
            rhoncus condimentum. Sed tristique gravida luctus. Suspendisse
            potenti. Vestibulum lobortis sagittis sagittis. Maecenas ultricies
            cursus volutpat. Maecenas neque est, malesuada sit amet sem sit
            amet, ornare dignissim eros. Praesent sollicitudin augue tortor, vel
            pharetra diam aliquam quis. Mauris sed est ex. Maecenas vel tempus
            urna. Duis ac dui vel nisl varius consequat. Ut convallis vulputate
            lectus. Nulla sed mauris varius, venenatis tellus vel, consectetur
            magna.
            <br />
            Pellentesque eros sem, viverra nec velit sit amet, facilisis
            placerat velit. Curabitur at tincidunt augue, in elementum risus.
            Integer semper et risus at fringilla. Phasellus vitae ullamcorper
            enim. Nunc faucibus velit non ex posuere porttitor. Phasellus
            imperdiet libero vitae metus accumsan sodales. Vivamus nunc lacus,
            dignissim sed pharetra ac, laoreet sed metus. Proin ac erat ligula.
            <br />
            Duis suscipit varius elementum. Mauris facilisis, nunc a hendrerit
            egestas, magna lectus vestibulum nibh, in efficitur turpis leo a
            tortor. Nulla libero augue, facilisis at blandit sit amet, laoreet
            in arcu. Donec vitae elit neque. Integer lobortis lectus ac sem
            blandit semper sed sed nisl. Etiam at ligula arcu. Proin rhoncus
            volutpat tempus. Integer quis pharetra erat. Duis ut eros sit amet
            erat lobortis iaculis id nec orci. Integer ut hendrerit massa. Nam
            malesuada erat a nunc efficitur ullamcorper. Sed lacinia libero
            vitae tortor pellentesque, et mattis odio facilisis. Phasellus
            aliquet mattis rutrum.
            <br />
            Nunc ornare scelerisque felis eget facilisis. Vivamus elementum elit
            ut erat pharetra lobortis. Suspendisse potenti. Aenean id euismod
            nisi. Morbi condimentum mi magna. Donec tempor dui sed venenatis
            dignissim. Donec eu augue hendrerit, convallis velit eu, ullamcorper
            urna.
            <br />
            Vivamus ut augue at neque porttitor rhoncus ut quis enim. Nam sed
            rhoncus nibh. Ut sit amet ultricies mauris, malesuada bibendum
            ligula. Nunc at magna id lectus luctus ullamcorper et nec felis.
            Donec gravida accumsan porttitor. Nam convallis ex at est
            sollicitudin sagittis. Morbi justo massa, rhoncus et lobortis
            pellentesque, semper ultrices leo. Etiam auctor eros ut erat
            gravida, vitae iaculis felis commodo. Curabitur elementum, nisl in
            hendrerit maximus, ligula diam cursus diam, eget faucibus metus
            justo eu turpis. Cras quis augue et eros vulputate venenatis. Cras
            porta ac lacus sed ultricies. Nunc iaculis elementum velit nec
            tempus.
          </p>
        </IonText>
      </IonContent>
    </IonSlide>
  );
};

export default PrivacyPolicy;
