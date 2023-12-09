import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupPage from "../pages/GroupPage";

export default function GroupRoute() {
  return (
    <IonRouterOutlet id="group">
      <Route path="/group/:vanity_url" render={() => <GroupPage />} />
    </IonRouterOutlet>
  );
}
