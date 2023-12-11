import {
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { GroupPostType, GroupType } from "../../types";
import { megaphoneOutline } from "ionicons/icons";

export default function AdminPostCard(props: {
  group?: GroupType;
  post?: GroupPostType;
  icon?: string;
}) {
  const rt = useIonRouter();
  const handleClick = () => {
    rt.push(`/group/${props.group?.vanity_id}/post/${props.post?.id}`);
  };

  return (
    <IonCard
      className="studentCard ion-padding m-2 font-poppins"
      onClick={handleClick}
    >
      <IonRow>
        <IonCol size="1">
          <IonIcon
            className="postIcon ml-[-10px] text-3xl"
            src={props.icon}
          ></IonIcon>
        </IonCol>
        <IonCol className="flex ml-[10px] content-center">
          <IonText>
            <span className="text-xl font-bold text-ellipsis line-clamp-1 my-auto">
              {props.group?.name ?? "Admin Post"}
            </span>
          </IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonText>
          <p className="line-clamp-3 font-medium">{props.post?.content}</p>
        </IonText>
      </IonRow>
    </IonCard>
  );
}

AdminPostCard.defaultProps = {
  icon: megaphoneOutline,
};
