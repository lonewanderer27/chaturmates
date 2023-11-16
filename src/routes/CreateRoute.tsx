import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupCreatePage from "../pages/Create/GroupCreatePage";


export default function CreateRoute() {
  return (
    <IonRouterOutlet id="create">
      <Route path="/create/group" exact render={() => <GroupCreatePage />} />
    </IonRouterOutlet>
  )
}
