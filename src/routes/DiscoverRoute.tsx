import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import DiscoverPage from "../pages/DiscoverPage";
import SearchPage from "../pages/SearchPage";

export default function DiscoverRoute() {
  return (
    <IonRouterOutlet id="discover">
      <Route path="/discover" exact render={() => <DiscoverPage />} />
      <Route path="/discover/search/" render={() => <SearchPage />} />
    </IonRouterOutlet>
  );
}
