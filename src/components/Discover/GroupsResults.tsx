import { IonList, IonText } from "@ionic/react";
import GroupItem from "./GroupItem";
import "./GroupItem.css"

export default function GroupsResults() {
  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Groups
      </IonText>
      <IonList>
        <GroupItem/>
        <GroupItem/>
        <GroupItem/>
      </IonList>
      <IonText color="primary" className="ion-margin-vertical ion-padding-start">
        See More Groups
      </IonText>
    </div>
  )
}
