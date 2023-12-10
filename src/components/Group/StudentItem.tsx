import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { StudentType } from "../../types";
import { mail, mailOutline, personCircleOutline } from "ionicons/icons";
import S from "string";
import "./MemberItem.css";

export default function StudentItem(
  props: {
    student: StudentType;
    icon?: string;
    buttonLabel?: string;
    buttonIcon?: string;
  }
) {
  const rt = useIonRouter();
  // const { student } = useFindStudent(props.id + "");
  function handleClick() {
    rt.push("/student/" + props.student.id);
  }

  return (
    <IonItem lines="none" onClick={handleClick} className="cursor-pointer">
      {props?.student.avatar_url ? (
        <>
          <IonAvatar slot="start" className="mr-1 ml-[-5px]">
            <img src={props!.student.avatar_url} />
          </IonAvatar>
        </>
      ) : (
        <>
          <IonIcon
            className="memberItemIcon mr-1 ml-[-5px]"
            slot="start"
            icon={props.icon}
          ></IonIcon>
        </>
      )}
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="studentItemName truncate font-poppins font-semibold">{props?.student.full_name}</IonText>
          <br />
          <IonText className="studentType">
            {S(props?.student.type + "").capitalize().s}
          </IonText>
        </IonCol>
      </IonRow>
      <IonButton slot="end"  className="rounded-3xl">
        <IonIcon icon={props.buttonIcon} className=" text-3xl m-1"></IonIcon>
        {/* <IonText className="p-2">
          <span className=" font-poppins font-medium text-sm">{props.buttonLabel}</span>
        </IonText> */}
      </IonButton>
    </IonItem>
  );
}

StudentItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
  buttonIcon: mail
};
