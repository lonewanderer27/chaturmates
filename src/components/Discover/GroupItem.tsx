import "./GroupItem.css";
import {
  IonAvatar,
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
import { useMemo } from "react";

export default function GroupItem(props: {
  group: GroupResponse["get"]["data"]["group"];
  icon?: string;
  buttonLabel?: string;
}) {
  const rt = useIonRouter();

  const isValidUrl = useMemo(() => {
    try {
      new URL(props.group.avatar_url+"");
      return true;
    } catch (_) {
      return false;
    }
  }, [props.group.avatar_url]);


  function handleView() {
    rt.push("/group/" + props.group.vanity_id);
  }

  return (
    <IonItem onClick={handleView}>
      {props.group.avatar_url && isValidUrl ? (
        <IonAvatar slot="start" className="mr-3 groupItemLogo">
          <img className="groupItemLogo" src={props.group.avatar_url} />
        </IonAvatar>
      ) : (
        <IonIcon
          className="groupItemIcon mr-1 ml-[-5px]"
          slot="start"
          icon={props.icon}
        ></IonIcon>
      )}
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="groupName truncate font-poppins  font-semibold">
            {props.group.name}
          </IonText>
          <br />
          <IonText className="groupCount">
            {props.group.group_members.length} Members
          </IonText>
        </IonCol>
      </IonRow>
      <IonButton slot="end" className="rounded-3xl">
        <IonText className="p-2">
          <span className=" font-poppins font-medium text-base">
            {props.buttonLabel}
          </span>
        </IonText>
      </IonButton>
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
  buttonLabel: "Join",
};
