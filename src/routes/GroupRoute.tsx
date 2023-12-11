import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import GroupPage from "../pages/GroupPage";
import GroupPostPage from "../pages/GroupPostPage";

export default function GroupRoute() {
  return (
    <IonRouterOutlet id="group">
      <Route path="/group/:vanity_id" render={() => <GroupPage />} />
      <Route
        path={`/group/:vanity_id/post/:post_id`}
        render={() => <GroupPostPage />}
      />
    </IonRouterOutlet>
  );
}
