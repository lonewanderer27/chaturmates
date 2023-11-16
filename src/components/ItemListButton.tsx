import { ComponentProps } from "react";
import { IonButton, IonText } from "@ionic/react";
import "./ItemListButton.css"

type IonButtonProps = ComponentProps<typeof IonButton>;

export default function ItemListButton(props: IonButtonProps & {}) {
  return <IonButton className="itemListButton" size="small" slot="end" shape="round">
    {props.children}
  </IonButton>
}
