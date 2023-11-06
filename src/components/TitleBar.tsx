import { IonAvatar, IonCol, IonRow, IonText } from "@ionic/react";
import "./TitleBar.css";

export default function TitleBar() {
  return (
    <IonRow className="ion-text-center ion-align-items-center titleBar ion-padding">
      <IonCol size="12">
        <IonAvatar className="logo">
          <img alt="Chaturmates Logo" src="/logo.png" />
        </IonAvatar>
      </IonCol>
      <div className="backgroundBox">
        <IonText color="light">
          <h1 className="chatur">Chatur</h1>
        </IonText>
        <IonText color="light">
          <h1 className="meyts">Meyts</h1>
        </IonText>
      </div>
    </IonRow>
  );
}