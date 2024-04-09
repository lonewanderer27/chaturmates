import {IonText} from "@ionic/react";

export default function GroupDescription(props: {
  groupDescription?: string | null;
  isLoading: boolean;
}) {
  return (
      <IonText className="text-center ion-margin-vertical font-medium font-poppins">
        <p style={{textAlign: "center"}} className="px-2">
          {props.groupDescription}
        </p>
      </IonText>
  )
}