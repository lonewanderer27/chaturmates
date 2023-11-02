import { IonList } from "@ionic/react";
import GenericItem from "./GenericItem";

export default function All() {
  return (
    <IonList lines="full">
      <GenericItem
        id="1"
        title="CS301 has a new announcement"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
      />
      <GenericItem
        id="2"
        title="Adamson has an announcement"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
      />
    </IonList>
  );
}
