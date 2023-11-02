import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { ComponentProps } from "react";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function GenericItem(props: IonItemProps & {
  id: string;
  keywords?: string[];
  title: string;
  description: string | null;
  date: Date;
  read?: boolean;
  icon?: string;
}) {

  return (
    <IonItem detail>
      <IonIcon src={props.icon} size="large" slot="start" />
      <IonLabel>
        <span className="notifTitle">{props.title}</span><br/><br/>
        <p className="notifDatetime">{props.date.toDateString()}</p><br/>
        <p className="notifDescription">{props.description}</p>
      </IonLabel>
    </IonItem>
  )
}

GenericItem.defaultProps = {
  description: null,
  read: false,
  icon: notificationsOutline
}