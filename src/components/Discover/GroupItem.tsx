import { ComponentProps } from "react";
import "./GroupItem.css";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline } from "ionicons/icons";
import { GroupResponse } from "../../types/group";
type IonItemProps = ComponentProps<typeof IonItem>;

export default function GroupItem(
  props: {
    group: GroupResponse['get']['data']['group'];
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

  return (
    <IonItem onClick={handleView}>
      <IonIcon
        className="groupItemIcon"
        slot="start"
        icon={props.icon}
      ></IonIcon>
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="groupName truncate font-poppins  font-semibold">{props.groupName}</IonText>
          <br />
          <IonText className="groupCount">
            {props.group.group_members.length} Members
          </IonText>
        </IonCol>
      </IonRow>
      <IonButton slot="end" className="rounded-3xl">
        <IonText className="p-2">
          <span className=" font-poppins font-medium text-base">{props.buttonLabel}</span>
        </IonText>
      </IonButton>
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
  buttonLabel: "Join"
}