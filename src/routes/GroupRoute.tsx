import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupPage from "../pages/GroupPage";
import GroupPostPage from "../pages/GroupPostPage";
import GroupMembersPage from "../pages/GroupPage/PendingGroupMembersPage";
import PendingGroupMembersPage from "../pages/GroupPage/PendingGroupMembersPage";

export default function GroupRoute() {
  return (
    <IonRouterOutlet id="group">
      <Route path="/group/:vanity_id" render={() => <GroupPage />} />
      <Route
        path={`/group/:vanity_id/post/:post_id`}
        render={() => <GroupPostPage />}
      />
      <Route path="/group/:vanity_id/members/pending" render={() => <PendingGroupMembersPage/>} />
    </IonRouterOutlet>
  );
}
