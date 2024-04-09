import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const DiscoverPage = lazy(() => import("../pages/DiscoverPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));

export default function DiscoverRoute() {
  return (
    <IonRouterOutlet id="discover">
      <Route path="/discover" exact render={() => <Suspense  fallback={<GenericPage />}>
        <DiscoverPage />
      </Suspense>} />
      <Route path="/discover/search/" render={() => <Suspense  fallback={<GenericPage />}>
        <SearchPage />
      </Suspense>} />
    </IonRouterOutlet>
  );
}
