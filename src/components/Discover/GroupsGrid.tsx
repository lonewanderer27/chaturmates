import { IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import GroupCard from "./GroupCard";
import { GroupType } from "../../types";
import AddGroupCard from "./AddGroupCard";

export default function GroupsGrid(props: {
  groups: GroupType[];
}) {
  return (
    <IonGrid className="ion-padding-vertical">
      <IonCol size="12" className="ion-padding-vertical">
        <IonText className="pageTitle">
          <IonText>Explore Groups</IonText>
        </IonText>
      </IonCol>
      <IonCol size="12">
        <IonRow>
          {props.groups.map((group, index) => (
            <GroupCard
              groupId={group.id}
              avatar_url={group.avatar_url}
              cover_url={group.cover_url}
              key={group.id}
              slug={group.vanity_url}
              groupName={group.name}
            />
          ))}
          <AddGroupCard/>
        </IonRow>
      </IonCol>
    </IonGrid>
  );
}

