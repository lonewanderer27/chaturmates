import { IonList } from "@ionic/react";
import GenericItem from "./GenericItem";
import { notifications } from "../../constants/notifications";
import { memo, useMemo, useState } from "react";

function All() {
  const [nnns, setNotifications] = useState(() => notifications);

  const handleRemove = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id + "" !== id));
  };

  return (
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
  );
}

export default memo(All);
