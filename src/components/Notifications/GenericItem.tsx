import {
  IonButton,
  IonCol,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import "./GenericItem.css";

type IonItemProps = ComponentProps<typeof IonItem>;
type IonButtonProps = ComponentProps<typeof IonButton>;

export default function GenericItem(
  props: IonItemProps & {
    id: string;
    keywords?: string[];
    title: string;
    description?: string;
    buttons?: IonButtonProps[];
    date: Date;
    read?: boolean;
    icon?: string;
  }
) {
  return (
    <IonItem detail>
      <IonIcon src={props.icon} size="large" slot="start" />
      <IonLabel>
        <span className="notifTitle">{props.title}</span>
        <br />
        <p className="notifDatetime">{props.date.toDateString()}</p>
        {props.description && (
          <>
            <br />
            <p className="notifDescription">{props.description}</p>
          </>
        )}
      </IonLabel>
        {props.buttons?.map((button, index) => (
          <IonButton key={index} {...button}>
            {button.title}
          </IonButton>
        ))}
    </IonItem>
  );
}

GenericItem.defaultProps = {
  description: undefined,
  read: false,
  icon: notificationsOutline,
};
