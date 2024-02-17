import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const NotificationsPage = lazy(() => import("../pages/Notifications"));

export default function NotificationsRoute() {
  return (
    <IonRouterOutlet id="notifications">
      <Route exact path="/notifications" render={() => <Suspense  fallback={<GenericPage />}>
        <NotificationsPage />
      </Suspense>} />
    </IonRouterOutlet>
  );
}
