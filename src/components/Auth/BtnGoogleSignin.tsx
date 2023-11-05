import { IonButton, IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { ComponentProps } from "react";
import useGoogle from "../../hooks/auth/useGoogle";

type IonButtonProps = ComponentProps<typeof IonButton>;

export default function BtnGoogleSignin(props: IonButtonProps) {
  const { ...rest } = props;
  const { handleGoogle } = useGoogle();

  return (
    <IonButton expand="block" {...rest} onClick={handleGoogle}>
      <IonIcon slot="start" icon={logoGoogle} />
      Sign in using Google
    </IonButton>
  );
}
