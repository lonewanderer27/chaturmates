import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import GroupCard from "./GroupCard";
import { GroupType } from "../../types";
import AddGroupCard from "./AddGroupCard";

export default function GroupsGrid(props: { groups?: GroupType[] }) {
  return (
    <IonGrid className="ion-padding-vertical">
      <IonCol size="12" className="ion-padding-vertical">
        <IonText className="pageTitle font-poppins">
          Explore Groups
        </IonText>
      </IonCol>
      <IonCol size="12">
        <IonRow>
          {props.groups &&
            props.groups.map((group, index) => <GroupCard key={group.id} {...group} />)}
          <AddGroupCard />
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}
