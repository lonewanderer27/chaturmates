import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const ThreadPage = lazy(() => import("../pages/Threads/ThreadPage"));
const Threads = lazy(() => import("../pages/Threads"));

export default function ThreadsRoute() {
  return (
    <IonRouterOutlet id="threads">
      <Route path="/threads" exact render={() => <Suspense fallback={<GenericPage />}><Threads /></Suspense>} />
      <Route path="/threads/:thread_id" render={() => <Suspense><ThreadPage /></Suspense>} />
    </IonRouterOutlet>
  );
}
