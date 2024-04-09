import { IonIcon, IonTabButton } from '@ionic/react'

function TabBarButton(props: {
  tab: string
  href: string
  icon: string
}) {
  return (
    <IonTabButton tab={props.tab} href={props.href} style={{
      backgroundColor: "#0080c9"
    }}>
      <IonIcon aria-hidden="true" icon={props.icon} />
    </IonTabButton>
  )
}

export default TabBarButton