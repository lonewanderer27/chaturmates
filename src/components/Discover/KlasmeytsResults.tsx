import { IonList, IonText } from "@ionic/react";
import KlasmeytItem from "./KlasmeytItem";

export default function KlasmeytsResults() {
  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      <IonList>
        <KlasmeytItem />
        <KlasmeytItem />
        <KlasmeytItem />
      </IonList>
      <IonText color="primary" className="ion-margin-vertical ion-padding-start">
        See More Klasmeyts
      </IonText>
    </div>
  );
}
