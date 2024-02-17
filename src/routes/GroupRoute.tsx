import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupMembersPage from "../pages/GroupPage/PendingGroupMembersPage";
import PendingGroupMembersPage from "../pages/GroupPage/PendingGroupMembersPage";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const GroupPage = lazy(() => import("../pages/GroupPage"));
const GroupPostPage = lazy(() => import("../pages/GroupPostPage"));

export default function GroupRoute() {
  return (
    <IonRouterOutlet id="group">
      <Route path="/group/:vanity_id" render={() => <Suspense  fallback={<GenericPage />}>
        <GroupPage />
      </Suspense>} />
      <Route
        path={`/group/:vanity_id/post/:post_id`}
        render={() => <Suspense  fallback={<GenericPage />}>
          <GroupPostPage />
        </Suspense>}
      />
      <Route path="/group/:vanity_id/members/pending" render={() => <PendingGroupMembersPage/>} />
    </IonRouterOutlet>
  );
}
