import {IonRouterOutlet} from "@ionic/react";
import {Route} from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const MePage = lazy(() => import("../pages/MePage"));

export default function ProfileRoute() {
  return (
    <IonRouterOutlet id="me">
      <Route exact path="/me" render={() => <Suspense  fallback={<GenericPage />}>
        <MePage/>
      </Suspense>}/>
    </IonRouterOutlet>
  )
}
