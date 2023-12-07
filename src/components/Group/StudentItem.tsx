import { IonAvatar, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText, useIonRouter } from "@ionic/react";
import { GroupMemberType, StudentType } from "../../types";
import { useFindStudent } from "../../hooks/student/useSelfStudent";
import { personCircleOutline } from "ionicons/icons";
import S from "string";
import "./MemberItem.css";
import { useHistory } from "react-router";

export default function StudentItem(
  props: StudentType & {
    icon?: string;
    buttonLabel?: string;
  }
) {
  const rt = useHistory();
  // const { student } = useFindStudent(props.id + "");
  function handleClick() {
    rt.push("/student/" + props.id);
  }

  return (
    <IonItem lines="none" onClick={handleClick} className="cursor-pointer">
      {props?.avatar_url ? (
        <>
          <IonAvatar><img src={props!.avatar_url} /></IonAvatar>
        </>
      ) : (
        <>
          <IonIcon
            className="memberItemIcon"
            slot="start"
            icon={props.icon}
          ></IonIcon>
        </> 
      )}
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonText className="studentItemName ">{props?.full_name}</IonText>
            <br />
            <IonText className="studentType">
              {S(props?.type+"").capitalize().s}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonItem>
  );
}

StudentItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
};
