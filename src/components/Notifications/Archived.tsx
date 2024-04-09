import {IonList, IonReorderGroup} from "@ionic/react";
import GenericItem from "./GenericItem";
import {notifications} from "../../constants/notifications";
import {useState} from "react";

const ns = [
  notifications[0],
  notifications[1],
  notifications[2],
  notifications[3],
  notifications[4],
];

export default function Archived() {
  const [nnns, setNotifications] = useState(() => ns);

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id + "" !== id));
  }

  return (
      <IonReorderGroup>
        <IonList lines="full">
          {nnns.map((notification) => (
              <GenericItem
                  key={notification.id}
                  id={notification.id + ""}
                  title={notification.title}
                  description={notification.description}
                  date={notification.date}
                  icon={notification.icon}
                  buttons={notification.buttons}
                  handleRemove={handleRemove}
              />
          ))}
        </IonList>
      </IonReorderGroup>
  );
}
