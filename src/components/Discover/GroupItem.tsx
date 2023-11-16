import { ComponentProps } from "react";
import "./GroupItem.css";
import {
  IonBadge,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline } from "ionicons/icons";
import ItemListButton from "../ItemListButton";
import useGroupMembers from "../../hooks/group/useGroupMembers";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function GroupItem(
  props: {
    groupId: number;
    slug: string;
    avatar_url?: string;
    cover_url?: string;
    icon?: string;
    groupName: string;
    groupType?: string;
    buttonLabel?: string;
  }
) {
  const rt = useIonRouter();
  function handleView() {
    rt.push("/group/" + props.slug);
  }

  const { groupMembers } = useGroupMembers(props.groupId);

  return (
    <IonItem onClick={handleView}>
      <IonIcon
        className="groupItemIcon"
        slot="start"
        icon={props.icon}
      ></IonIcon>
      <IonRow className="ion-align-items-center">
        <IonCol>
          <IonText className="groupName">{props.groupName}</IonText>
          <br />
          <IonText className="groupCount">{groupMembers.length} Members</IonText>
        </IonCol>
      </IonRow>
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
}