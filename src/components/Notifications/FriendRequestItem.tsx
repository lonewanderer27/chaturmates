import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { ComponentProps } from "react";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function FriendRequestItem(props: IonItemProps & {
  id: string;
  title: string
  date: Date;
  read?: boolean;
  accepted?: boolean;
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

FriendRequestItem.defaultProps = {
  accepted: false,
  read: false,
  icon: notificationsOutline
}