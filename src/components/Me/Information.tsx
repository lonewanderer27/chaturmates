import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from "@ionic/react";
import { ProfileType, StudentType } from "../../types";
import S from "string";

export default function StudentInformation(props: {
  student?: StudentType | null;
  profile?: ProfileType | null;
}) {
  return (
    <IonList lines="none">
      <IonListHeader>
        <IonLabel className="text-lg">Student Information</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonLabel>School</IonLabel>
        <IonLabel>Adamson University</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>School Year</IonLabel>
        <IonLabel>{props.student?.academic_year_id ?? ""}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>School Email</IonLabel>
        <IonLabel>{props.student?.school_email ?? ""}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Type</IonLabel>
        <IonLabel>{S(props.student?.type + "").capitalize().s}</IonLabel>
      </IonItem>
      {/* <IonItem>
        <IonLabel>Phone Number</IonLabel>
        <IonLabel>{props.student.}</IonLabel>
      </IonItem> */}
    </IonList>
  );
}
