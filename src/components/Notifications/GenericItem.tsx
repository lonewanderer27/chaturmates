import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { notificationsOutline, removeOutline } from "ionicons/icons";
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
    handleRemove: (id: string) => void;
  }
) {
  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption
          color="danger"
          onClick={() => props.handleRemove(props.id)}
        >
          Dismiss
        </IonItemOption>
      </IonItemOptions>
      <IonItem detail>
        <IonIcon src={props.icon} size="large" slot="start" />
        <IonGrid>
          <IonRow>
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
          </IonRow>
          <IonRow>
            {props.buttons?.map((button, index) => (
              <IonButton key={index} {...button} onClick={() => props.handleRemove(props.id)}>
                {button.title}
              </IonButton>
            ))}
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonItemSliding>
  );
}

GenericItem.defaultProps = {
  description: undefined,
  read: false,
  icon: notificationsOutline,
};
