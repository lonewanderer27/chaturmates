import { IonList } from "@ionic/react";
import GenericItem from "./GenericItem";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";

export default function All() {
  return (
    <IonList lines="full">
      <GenericItem
        id="1"
        title="Johnna Doe has accepted your request to join CS-301"
        date={new Date()}
        icon={personCircleOutline}
      />
      <GenericItem
        id="2"
        title="Johnna Doe has sent you friend request"
        date={new Date()}
        icon={personCircleOutline}
        buttons={[
          {
            color: "primary",
            title: "Accept",
          },
          {
            title: "Decline",
          },
        ]}
      />
      <GenericItem
        id="3"
        title="CS301 has a new announcement"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
        icon={peopleCircleOutline}
      />
      <GenericItem
        id="4"
        title="Johnna Doe has mentioned you in a "
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
        icon={personCircleOutline}
      />
      <GenericItem
        id="5"
        title="Adamson has an announcement"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
      />
      <GenericItem
        id="6"
        title="Sampaguita has a new announcement"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu ex feugiat, condimentum mauris vel, pretium est. Donec vitae molestie dui. Aenean tincidunt eget mauris eget auctor."
        date={new Date()}
        icon={peopleCircleOutline}
      />
    </IonList>
  );
}
