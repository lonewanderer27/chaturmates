import { IonButton, IonIcon, useIonRouter } from "@ionic/react"
import { search } from "ionicons/icons"
import { ComponentProps } from "react"

type BtnSearchProps = ComponentProps<typeof IonButton>

export default function BtnSearch(props: BtnSearchProps) {
  const hst = useIonRouter()

  const handleClick = () => {
    hst.push("/discover/search")
  }

  return (
    <IonButton {...props} onClick={handleClick} size="large">
      <IonIcon src={search} />
    </IonButton>
  )
}
