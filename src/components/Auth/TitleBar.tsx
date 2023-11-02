import { IonAvatar, IonCol, IonRow, IonText } from "@ionic/react";
import "./TitleBar.css";

export default function TitleBar() {
  return (
    <IonRow className="ion-text-center ion-align-items-center titleBar ion-padding">
      <IonCol size="12" className="ion-justify-content-center">
        <IonAvatar className="logo">
          <img alt="Chaturmates Logo" src="/logo.png" />
        </IonAvatar>
      </IonCol>
      <IonCol size="12">
        <IonText>
          {/* change the color of this title to primary */}
          {/* for reference: see https://ionicframework.com/docs/api/text#theming */}
          <h1 className="title">ChaturMates</h1>
        </IonText>
      </IonCol>
    </IonRow>
  );
}
