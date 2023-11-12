import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { closeCircleOutline, timeOutline } from "ionicons/icons";
import { ComponentProps } from "react";

type IonItemProps = ComponentProps<typeof IonItem>

export default function SearchHistoryItem(props: IonItemProps & {
  closeIcon: string
}) {
  return (
    <IonItem {...props}>
      <IonIcon icon={timeOutline} slot="start"></IonIcon>
      <IonLabel>{props.title}</IonLabel>
      <IonIcon icon={props.closeIcon}></IonIcon>
    </IonItem>
  );
}

SearchHistoryItem.defaultProps = {
  icon: timeOutline,
  title: "Johnna Doe",
  closeIcon: closeCircleOutline,
  lines: "none"
}