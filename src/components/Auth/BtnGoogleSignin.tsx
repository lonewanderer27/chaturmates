import { IonButton, IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { ComponentProps } from "react";

type IonButtonProps = ComponentProps<typeof IonButton>;

export default function BtnGoogleSignin(
  props: IonButtonProps & {
    handleClick?: (user: any) => void;
  }
) {
  const { handleClick, ...rest } = props;
  return (
    <IonButton expand="block" {...rest}>
      <IonIcon slot="start" icon={logoGoogle} />
      Sign in using Google
    </IonButton>
  );
}
