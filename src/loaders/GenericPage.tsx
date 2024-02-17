import { IonContent, IonPage } from "@ionic/react"

function GenericPage(props: {
  children?: React.ReactNode
}) {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        {props.children}
      </IonContent>
    </IonPage>
  )
}

export default GenericPage