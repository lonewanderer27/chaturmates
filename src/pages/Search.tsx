import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import SearchHistory from "../components/Discover/Search/SearchHistory";
import KlasmeytsResults from "../components/Discover/KlasmeytsResults";
import GroupsResults from "../components/Discover/GroupsResults";

export default function Search() {
  const rt = useIonRouter();
  function handleCancel() {
    rt.push("/discover", "back");
  }

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar
              placeholder='Example Letter "J"'
              mode="md"
              showCancelButton="always"
              onIonCancel={handleCancel}
            ></IonSearchbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <SearchHistory />
        <KlasmeytsResults />
        <GroupsResults />
      </IonContent>
    </IonPage>
  );
}
