import "./TitleBar.css";

import { IonAvatar, IonCol, IonRow, IonText } from "@ionic/react";

export default function TitleBar() {
  return (
    <IonRow className="ion-text-center ion-align-items-center titleBar ion-padding">
      <IonCol size="12">
        <IonAvatar className="logo">
          <img alt="Chaturmates Logo" src="/logo_icon_only.png" />
        </IonAvatar>
      </IonCol>
      <div className="backgroundBox mt-1">
        <IonText color="light">
          <h1 className="chatur font-poppins">Chatur</h1>
        </IonText>
        <IonText color="light">
          <h1 className="meyts font-poppins">Meyts</h1>
        </IonText>
      </div>
    </IonRow>
  );
}