import { ComponentProps } from "react"
import "./GroupItem.css"
import { IonBadge, IonCol, IonGrid, IonIcon, IonItem, IonRow, IonText } from "@ionic/react"
import { peopleCircleOutline } from "ionicons/icons";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function GroupItem(props: IonItemProps & {
  size: string,
  icon: string,
  groupName: string,
  groupCount: number,
  buttonLabel: string
}) {
  return (
    <IonItem {...props}>
      <IonIcon
        className="groupItemIcon"
        slot="start"
        icon={props.icon}
      ></IonIcon>
      <IonGrid>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonText className="groupName">{props.groupName}</IonText>
            <br />
            <IonText className="groupCount">{props.groupCount} Members</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonBadge slot="end">{props.buttonLabel}</IonBadge>
    </IonItem>
  )
}

GroupItem.defaultProps = {
  lines: "none",
  icon: peopleCircleOutline,
  size: "large",
  groupName: "*Random Group Name J*",
  groupCount: 27,
  buttonLabel: "Join"
}