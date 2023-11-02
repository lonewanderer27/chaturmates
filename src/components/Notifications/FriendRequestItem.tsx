import { IonItem } from "@ionic/react";
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
    <IonItem>

    </IonItem>
  )
}

FriendRequestItem.defaultProps = {
  accepted: false,
  read: false,
  icon: notificationsOutline
}