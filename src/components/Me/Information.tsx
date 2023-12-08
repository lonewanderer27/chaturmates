import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow,
} from "@ionic/react";
import { ProfileType, StudentType } from "../../types";

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
        <IonLabel>AdU Email</IonLabel>
        <IonLabel>{props.student?.school_email ?? ""}</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Phone Number</IonLabel>
        <IonLabel>09983084812</IonLabel>
      </IonItem>
    </IonList>
  );
}
