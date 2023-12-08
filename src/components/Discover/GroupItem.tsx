import { ComponentProps } from "react";
import "./GroupItem.css";
import {
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import { getGroupById } from "../../services/group";

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

  // const { groupMembers } = useGroupMembers(props.groupId);
  const query = useQuery({
    queryKey: ["group", props.slug],
    queryFn: async () => {
      const res = (await getGroupById(props.groupId+"")).data;
      return res;
    },
    enabled: !!props.groupId,
  });

  return (
    <IonItem onClick={handleView}>
      <IonIcon
        className="groupItemIcon"
        slot="start"
        icon={props.icon}
      ></IonIcon>
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="groupName">{props.groupName}</IonText>
          <br />
          <IonText className="groupCount">
            {query.data?.students.approved.length} Members
          </IonText>
        </IonCol>
      </IonRow>
      <IonButton slot="end" size="default" className="py-2">
        <IonLabel>{props.buttonLabel}</IonLabel>
      </IonButton>
    </IonItem>
  );
}

GroupItem.defaultProps = {
  icon: peopleCircleOutline,
  buttonLabel: "Join"
}