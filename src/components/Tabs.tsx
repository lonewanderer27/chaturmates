import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import {
  gridOutline,
  chatboxEllipsesOutline,
  notificationsOutline,
  personCircleOutline,
} from "ionicons/icons";
import { Route, Redirect } from "react-router";
import ForgotMyPassConfirm from "../pages/ForgotMyPassConfirm";
import ForgotMyPassword from "../pages/ForgotMyPassword";
import Login from "../pages/Login";
import DiscoverRoute from "../routes/DiscoverRoute";
import AuthWrapper from "./Auth/AuthWrapper";
import ThreadsRoute from "../routes/ThreadsRoute";
import NotificationsRoute from "../routes/NotificationsRoute";
import ProfileRoute from "../routes/ProfileRoute";
import GroupRoute from "../routes/GroupRoute";
import StudentRoute from "../routes/StudentRoute";
import Verification from "../pages/Verification";
import CreateRoute from "../routes/CreateRoute";

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet id="app">
        <AuthWrapper>
          <Route path="/create" render={() => <CreateRoute />} />
          <Route path="/discover" render={() => <DiscoverRoute />} />
          <Route path="/student" render={() => <StudentRoute />} />
          <Route path="/group" render={() => <GroupRoute />} />
          <Route path="/threads" render={() => <ThreadsRoute />} />
          <Route path="/notifications" render={() => <NotificationsRoute />} />
          <Route path="/me" render={() => <ProfileRoute />} />
          <Route path="/" exact render={() => <Redirect to="/discover" />} />
        </AuthWrapper>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgotmypass">
          <ForgotMyPassword />
        </Route>
        <Route exact path="/forgotmypassconfirm">
          <ForgotMyPassConfirm />
        </Route>
        <Route exact path="/verify">
          <Verification />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="discover" href="/discover">
          <IonIcon aria-hidden="true" icon={gridOutline} />
        </IonTabButton>
        <IonTabButton tab="threads" href="/threads">
          <IonIcon aria-hidden="true" icon={chatboxEllipsesOutline} />
        </IonTabButton>
        <IonTabButton tab="notifications" href="/notifications">
          <IonIcon aria-hidden="true" icon={notificationsOutline} />
        </IonTabButton>
        <IonTabButton tab="me" href="/me">
          <IonIcon aria-hidden="true" icon={personCircleOutline} />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}
