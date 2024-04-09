import { IonAvatar } from "@ionic/react"
import "./ProfileIcon.css"

export default function ProfileIcon(props: {
  name: string,
  img: string
}) {
  return (
    <div className="profileIcon">
      <IonAvatar>
        <img alt={props.name} src={props.img} />
      </IonAvatar>
      <p>{props.name}</p>
    </div>
  )
}
