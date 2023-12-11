import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import GroupCard from "./GroupCard";
import AddGroupCard from "./AddGroupCard";
import { GroupResponse, GroupsResponse } from "../../types/group";

export default function GroupsGrid(props: {
  groups?: GroupResponse["get"]["data"]["group"][];
}) {
  return (
    <IonGrid className="ion-padding-vertical">
      <IonCol size="12" className="ion-padding-vertical">
        <IonText className="pageTitle font-poppins">Recommended Groups</IonText>
      </IonCol>
      <IonCol size="12">
        <IonRow>
          {props.groups &&
            props.groups.map((group, index) => (
              <GroupCard key={group.id} group={group} />
            ))}
          <AddGroupCard />
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}
