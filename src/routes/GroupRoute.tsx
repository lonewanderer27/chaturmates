import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupPage from "../pages/GroupPage";
import Klasmeyts from "../pages/Group/Klasmeyts";

export default function GroupRoute() {
  return (
    <IonRouterOutlet id="group">
      <Route path="/group/:vanity_url" render={() => <GroupPage />} />
      <Route path="/group/:vanity_url/students" render={() => <Klasmeyts />} />
    </IonRouterOutlet>
  );
}
