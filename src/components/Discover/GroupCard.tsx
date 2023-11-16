import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCol,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import "./GroupCard.css";
import useGroupMembers from "../../hooks/group/useGroupMembers";

// TODO:  change the color of the ion card to be black
//        for some reason it displays as gray
type IonCardProps = ComponentProps<typeof IonCard>;

export default function GroupCard(
  props: IonCardProps & {
    groupId: number;
    slug: string;
    avatar_url: string | null;
    cover_url: string | null;
    icon: string;
    groupName: string;
  }
) {
  const rt = useIonRouter();

  function handleView() {
    rt.push("/group/" + props.slug);
  }

  const { groupMembers } = useGroupMembers(props.groupId);

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full"
        onClick={handleView}
      >
        <IonRow>
          <IonAvatar>
            {props.avatar_url ? (
              <img src={props.avatar_url} />
            ) : (
              <IonIcon className="groupCardIcon" src={props.icon}></IonIcon>
            )}
          </IonAvatar>
        </IonRow>
        <IonRow className="ion-margin-vertical">
          <IonLabel color="primary">
            <p>{props.groupName}</p>
          </IonLabel>
        </IonRow>
        <IonRow>
          {groupMembers.length > 4 && (
            <>
              {groupMembers.slice(0, 4).map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={personCircleOutline}
                ></IonIcon>
              ))}
              <IonBadge color="light" className="groupCountBadge">
                <IonText>+ {groupMembers.length - 4}</IonText>
              </IonBadge>
            </>
          )}
          {groupMembers.length < 4 && (
            <>
              {groupMembers.map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={personCircleOutline}
                ></IonIcon>
              ))}
            </>
          )}
        </IonRow>
      </IonCard>
    </IonCol>
  );
}

GroupCard.defaultProps = {
  slug: "software_engineering_the_best",
  groupName: "Software Engineering The Best",
  icon: peopleCircleOutline,
  groupMembers: [
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
    { name: "Johnna Doe", icon: personCircleOutline },
  ],
};
