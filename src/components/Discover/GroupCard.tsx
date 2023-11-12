import {
  IonAvatar,
  IonBadge,
  IonCard,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import "./GroupCard.css";

// TODO:  change the color of the ion card to be black
//        for some reason it displays as gray
type IonCardProps = ComponentProps<typeof IonCard>;

export default function GroupCard(
  props: IonCardProps & {
    icon: string;
    members: {
      name: string;
      icon: string;
    }[];
  }
) {
  return (
    <IonCol size="6">
      <IonCard className="groupCard ion-padding ion-no-margin">
        <IonRow>
          <IonAvatar>
            <IonIcon className="groupIcon" src={props.icon}></IonIcon>
          </IonAvatar>
        </IonRow>
        <IonRow className="ion-margin-vertical">
          <IonLabel color="primary">
            <p>{props.title}</p>
          </IonLabel>
        </IonRow>
        <IonRow>
          {props.members.length > 4 && (
            <>
              {props.members.slice(0, 4).map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={member.icon}
                ></IonIcon>
              ))}
              <IonBadge color="light" className="groupCountBadge">
                <IonText>+ {props.members.length - 4}</IonText>
              </IonBadge>
            </>
          )}
          {props.members.length < 4 && (
            <>
              {props.members.map((member, index) => (
                <IonIcon
                  key={"ionicon:members:" + index}
                  className="groupMemberIcon"
                  src={member.icon}
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
  title: "Software Engineering The Best",
  icon: peopleCircleOutline,
  members: [
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
