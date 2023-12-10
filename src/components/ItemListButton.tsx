import { ComponentProps } from "react";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import "./ItemListButton.css";

type IonButtonProps = ComponentProps<typeof IonButton>;

export default function ItemListButton(
  props: IonButtonProps & {
    buttonIcon?: string;
    buttonLabel?: string;
  }
) {
  return (
    <IonButton slot="end" className="rounded-3xl" {...props}>
      {props.buttonIcon && (
        <IonIcon
          slot="start"
          icon={props.buttonIcon}
          className=" text-3xl m-1"
        ></IonIcon>
      )}
      {props.buttonLabel && (
        <IonText className="p-2">
          {props.buttonLabel && (
            <span className=" font-poppins font-medium text-base">
              {props.buttonLabel}
            </span>
          )}
        </IonText>
      )}
    </IonButton>
  );
}
