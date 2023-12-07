import { IonButton, IonIcon, useIonRouter } from "@ionic/react"
import { search } from "ionicons/icons"
import { ComponentProps } from "react"
import { useHistory } from "react-router"

type BtnSearchProps = ComponentProps<typeof IonButton>

export default function BtnSearch(props: BtnSearchProps) {
  const hst = useHistory();

  const handleClick = () => {
    hst.push("/discover/search")
  }

  return (
    <IonButton {...props} onClick={handleClick}>
      <IonIcon src={search} />
    </IonButton>
  )
}
