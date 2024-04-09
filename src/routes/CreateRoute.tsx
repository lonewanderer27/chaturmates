import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const CreateGroupPage = lazy(() => import("../pages/Create/Group/v1/CreateGroupPage"));
const CreateGroupP1 = lazy(() => import("../pages/Create/Group/v2/CreateGroupP1"));
const CreateGroupP2 = lazy(() => import("../pages/Create/Group/v2/CreateGroupP2"));
const CreateGroupP3 = lazy(() => import("../pages/Create/Group/v2/CreateGroupP3"));

export default function CreateRoute() {
  return (
    <IonRouterOutlet id="create">
      <Route path="/create/v1/group" exact render={() => <Suspense fallback={<GenericPage />}>
        <CreateGroupPage />
      </Suspense>} />
      <Route path="/create/v2/group" exact render={() => <Suspense fallback={<GenericPage />}>
        <CreateGroupP1 />
      </Suspense>} />
      <Route path="/create/v2/group/1" exact render={() => <Suspense fallback={<GenericPage />}>
        <CreateGroupP1 />
      </Suspense>} />
      <Route path="/create/v2/group/2" exact render={() => <Suspense fallback={<GenericPage />}>
        <CreateGroupP2 />
      </Suspense>} />
      <Route path="/create/v2/group/3" exact render={() => <Suspense fallback={<GenericPage />}>
        <CreateGroupP3 />
      </Suspense>} />
    </IonRouterOutlet>
  )
}