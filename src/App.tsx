import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  chatboxEllipsesOutline,
  gridOutline,
  notificationsOutline,
  personCircleOutline,
} from "ionicons/icons";
import Discover from "./pages/Discover";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Our custom CSS */
import "./theme/main.css"; // global custom styles
import "./theme/typography.css"; // global text styles
import "./theme/inputs.css"; // global input styles
import "./theme/tabs.css"; // bottom tabs styles

import Login from "./pages/Login";
import ForgotMyPassword from "./pages/ForgotMyPassword";
import ForgotMyPassConfirm from "./pages/ForgotMyPassConfirm";
import Messages from "./pages/Messages";
import AuthWrapper from "./components/Auth/AuthWrapper";
import NonAuthdWrapper from "./components/Auth/NonAuthdWrapper";

setupIonicReact({
  mode: "ios",
});

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <AuthWrapper>
              <Route exact path="/discover">
                <Discover />
              </Route>
              <Route exact path="/messages">
                <Messages />
              </Route>
              <Route exact path="/notifications">
                <Notifications />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route path="/">
                <Redirect to="/discover" />
              </Route>
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
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="discover" href="/discover">
              <IonIcon aria-hidden="true" icon={gridOutline} />
            </IonTabButton>
            <IonTabButton tab="messages" href="/messages">
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
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
