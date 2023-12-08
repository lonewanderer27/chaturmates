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
import { personCircleOutline } from "ionicons/icons";
import S from "string";
import "./MemberItem.css";

export default function StudentItem(
  props: StudentType & {
    icon?: string;
    buttonLabel?: string;
  }
) {
  const rt = useIonRouter();
  // const { student } = useFindStudent(props.id + "");
  function handleClick() {
    rt.push("/student/" + props.id);
  }

  return (
    <IonItem lines="none" onClick={handleClick} className="cursor-pointer">
      {props?.avatar_url ? (
        <>
          <IonAvatar>
            <img src={props!.avatar_url} />
          </IonAvatar>
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
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="studentItemName truncate font-poppins font-semibold">{props?.full_name}</IonText>
          <br />
          <IonText className="studentType">
            {S(props?.type + "").capitalize().s}
          </IonText>
        </IonCol>
      </IonRow>
      <IonButton slot="end"  className="rounded-3xl">
        <IonText className="p-2">
          <span className=" font-poppins font-medium text-sm">{props.buttonLabel}</span>
        </IonText>
      </IonButton>
    </IonItem>
  );
}

StudentItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
};
