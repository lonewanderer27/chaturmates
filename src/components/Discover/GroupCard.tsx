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
import { useQuery } from "@tanstack/react-query";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import "./GroupCard.css";
import { GroupType } from "../../types";
import getStudentsInGroup from "../../services/group/students";

export default function GroupCard(
  props: GroupType
) {
  const rt = useIonRouter();

  function handleView() {
    rt.push("/group/" + props.vanity_url);
  }

  const { data } = useQuery({
    queryKey: ['group', props.vanity_url],
    queryFn: async () => {
      const res =  (await getStudentsInGroup(props.id+"")).data;
      return res;
    }
  })

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full font-poppins"
        onClick={handleView}
      >
        <IonRow>
          <IonAvatar>
            {props.avatar_url ? (
              <img src={props.avatar_url} />
            ) : (
              <IonIcon className="groupCardIcon" src={props.avatar_url!}></IonIcon>
            )}
          </IonAvatar>
        </IonRow>
        <IonRow className="ion-margin-vertical">
          <IonLabel color="primary font-medium text-xl">
            <p>{props.name}</p>
          </IonLabel>
        </IonRow>
        <IonRow>
          {data?.students && data?.students.approved.length > 4 && (
            <>
              {data?.students.approved.slice(0, 4).map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={personCircleOutline}
                ></IonIcon>
              ))}
              <IonBadge color="light" className="groupCountBadge">
                <IonText>+ {data?.students.approved.length - 4}</IonText>
              </IonBadge>
            </>
          )}
          {data?.students && data?.students.approved.length < 4 && (
            <>
              {data?.students.approved.map((member, index) => (
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
