import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import Messages from "../pages/Messages";

export default function MessagesRoute() {
  return (
    <IonRouterOutlet id="messages">
      <Route path="/messages" exact render={() => <Messages />} />
    </IonRouterOutlet>
  );
}