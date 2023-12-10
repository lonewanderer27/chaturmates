import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import "./GroupCard.css";
import { GroupResponse } from "../../types/group";

export default function GroupCard(props: {
  group: GroupResponse["get"]["data"]["group"];
  icon: string;
}) {
  const rt = useIonRouter();

  function handleView() {
    rt.push("/group/" + props.group.vanity_id, "forward");
  }

  const isValidUrl = (urlString: string | URL) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full font-poppins"
        onClick={handleView}
      >
        <IonRow>
          <IonAvatar>
            {props.group.avatar_url && isValidUrl(props.group.avatar_url) ? (
              <img src={props.group.avatar_url} />
            ) : (
              <IonIcon className="groupCardIcon" src={props.icon}></IonIcon>
            )}
          </IonAvatar>
        </IonRow>
        <IonRow className="ion-margin-vertical">
          <IonText className="font-medium text-lg font-poppins">
            <p>{props.group.name}</p>
          </IonText>
        </IonRow>
        <IonRow>
          {props.group.group_members.length > 4 && (
            <>
              {props.group.group_members.slice(0, 4).map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={personCircleOutline}
                ></IonIcon>
              ))}
              <IonBadge color="light" className="groupCountBadge">
                <IonText>+ {props.group.group_members.length - 4}</IonText>
              </IonBadge>
            </>
          )}
          {props.group.group_members.length < 4 && (
            <>
              {props.group.group_members.map((member, index) => (
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
