import { StudentType } from "../../types";
import {
  IonCol,
  IonFabButton,
  IonIcon,
  IonLabel,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { cameraOutline, peopleCircleOutline } from "ionicons/icons";
import "./Avatar.css";

export default function Avatar(props: { student?: StudentType | null }) {
  return (
    <>
      <IonRow className="align-center py-2 mt-[-50px] text-center">
        {props.student && props.student.avatar_url ? (
          <IonCol size="4">
            <img
              className="mePageLogo mx-auto"
              src={props.student.avatar_url}
            />
          </IonCol>
        ) : (
          <IonIcon
            className="mePageIcon mx-auto bg-white rounded-full"
            src={peopleCircleOutline}
          ></IonIcon>
        )}
        <IonFabButton disabled size='small' className="absolute right-28 top-36">
          <IonIcon size='small' icon={cameraOutline} />
        </IonFabButton>
      </IonRow>
    </>
  );
}
