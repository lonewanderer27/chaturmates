import {
  IonBadge,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import "./KlasmeytItem.css";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function KlasmeytItem(
  props: IonItemProps & {
    size: string;
    icon: string;
    studentName: string;
    studentType: string;
    buttonLabel: string;
  }
) {
  return (
    <IonItem {...props}>
      <IonIcon
        className="klasmeytItemIcon"
        slot="start"
        icon={props.icon}
      ></IonIcon>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonText className="studentName">{props.studentName}</IonText>
            <br />
            <IonText className="studentType">{props.studentType}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonBadge slot="end">{props.buttonLabel}</IonBadge>
    </IonItem>
  );
}

KlasmeytItem.defaultProps = {
  lines: "none",
  icon: personCircleOutline,
  size: "large",
  studentName: "Johnna Doe",
  studentType: "Regular",
  buttonLabel: "Message",
};
