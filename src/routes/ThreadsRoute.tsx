import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import Threads from "../pages/Threads";
import ThreadPage from "../pages/Threads/ThreadPage";

export default function ThreadsRoute() {
  return (
    <IonRouterOutlet id="threads">
      <Route path="/threads" exact render={() => <Threads />} />
      <Route path="/threads/:thread_id" render={() => <ThreadPage />} />
    </IonRouterOutlet>
  );
}
