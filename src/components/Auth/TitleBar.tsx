import { IonAvatar, IonCol, IonRow } from "@ionic/react";
import "./TitleBar.css"

export default function TitleBar() {
  return (
    <IonRow className="ion-text-center ion-align-items-center titleBar ion-padding">
      <IonCol size="12" className="ion-justify-content-center">
        <IonAvatar className="logo">
          <img alt="Chaturmates Logo" src="/logo.png" />
        </IonAvatar>
      </IonCol>
      <IonCol size="12">
        <h1 className="title">ChaturMates</h1>
      </IonCol>
    </IonRow>
  );
}
