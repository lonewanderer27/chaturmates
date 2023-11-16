import { IonAvatar, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText, useIonRouter } from "@ionic/react";
import { GroupMemberType } from "../../types";
import { useFindStudent } from "../../hooks/student/useSelfStudent";
import { personCircleOutline } from "ionicons/icons";
import S from "string";
import "./MemberItem.css";

export default function MemberItem(
  props: GroupMemberType & {
    icon: string;
    buttonLabel: string;
  }
) {
  const rt = useIonRouter();
  const { student } = useFindStudent(props.student_id + "");
  function handleClick() {
    rt.push("/student/" + props.student_id);
  }

  return (
    <IonItem lines="none" onClick={handleClick} className="cursor-pointer">
      {student?.avatar_url ? (
        <>
          <IonAvatar><img src={student!.avatar_url} /></IonAvatar>
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
            <IonText className="studentItemName ">{student?.full_name}</IonText>
            <br />
            <IonText className="studentType">
              {S(student?.type+"").capitalize().s}
            </IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
      {/* <ItemListButton>
        <IonText>{props.buttonLabel}</IonText>
        <IonIcon></IonIcon>
      </ItemListButton> */}
    </IonItem>
  );
}

MemberItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
};
