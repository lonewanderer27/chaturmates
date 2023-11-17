import { IonCard, IonRow, IonText } from "@ionic/react";
import { ThreadMessageType } from "../../types";
import useSelfStudent from "../../hooks/student/useSelfStudent";

export default function ThreadMessage(
  props: ThreadMessageType & {
    self: boolean;
  }
) {
  return (
    <IonRow className={`flex ${props.self ? "justify-end" : "justify-start"}`}>
      <IonCard
        className={`my-2 ion-padding ${props.self ? "text-end" : "text-start"}`}
      >
        <IonText className="text-lg">{props.text}</IonText>
      </IonCard>
    </IonRow>
  );
}
