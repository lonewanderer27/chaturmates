import { IonButton, IonIcon, useIonRouter } from "@ionic/react"

import { ComponentProps } from "react"
import { search } from "ionicons/icons"

type BtnSearchProps = ComponentProps<typeof IonButton>

export default function BtnSearch(props: BtnSearchProps) {
  const hst = useIonRouter()

  const handleClick = () => {
    hst.push("/discover/search")
  }

  return (
    <IonButton {...props} onClick={handleClick} size="large" className="ml-4">
      <IonIcon src={search} />
    </IonButton>
  )
}
