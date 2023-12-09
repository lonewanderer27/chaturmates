import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import CreateGroupPage from "../pages/Create/Group/v1/CreateGroupPage";
import CreateGroupP1 from "../pages/Create/Group/v2/CreateGroupP1";
import CreateGroupP2 from "../pages/Create/Group/v2/CreateGroupP2";
import CreateGroupP3 from "../pages/Create/Group/v2/CreateGroupP3";


export default function CreateRoute() {
  return (
    <IonRouterOutlet id="create">
      <Route path="/create/v1/group" exact render={() => <CreateGroupPage />} />
      <Route path="/create/v2/group" exact render={() => <CreateGroupP1/>} />
      <Route path="/create/v2/group/1" exact render={() => <CreateGroupP1/>} />
      <Route path="/create/v2/group/2" exact render={() => <CreateGroupP2/>} />
      <Route path="/create/v2/group/3" exact render={() => <CreateGroupP3/>} />
    </IonRouterOutlet>
  )
}