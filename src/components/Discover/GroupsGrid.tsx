import { IonCol, IonGrid, IonLabel, IonRow, IonText } from "@ionic/react";
import GroupCard from "./GroupCard";

export default function GroupsGrid() {
  return (
    <IonGrid className="ion-padding-vertical">
      <IonCol size="12" className="ion-padding-vertical">
        <IonText className="pageTitle">
          <IonText>Explore Groups</IonText>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <IonRow>
          <GroupCard />
          <GroupCard />
          <GroupCard />
          <GroupCard />
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}
