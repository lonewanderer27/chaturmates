import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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

// Poppins font
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

/* Bootstrap CSS */
import "bootstrap/dist/css/bootstrap.min.css";

/* Theme variables */
import "./theme/variables.css";

/* Our custom CSS */
import "./theme/typography.css"; // global text styles
import "./theme/inputs.css"; // global input styles
import "./theme/tabs.css"; // bottom tabs styles

import { Route, Redirect } from "react-router";
import AuthWrapper from "./components/Auth/AuthWrapper";
import ForgotMyPassConfirm from "./pages/ForgotMyPass/ForgotPassConfirm";
import ForgotMyPassword from "./pages/ForgotMyPassword";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import CreateRoute from "./routes/CreateRoute";
import DiscoverRoute from "./routes/DiscoverRoute";
import GroupRoute from "./routes/GroupRoute";
import MeRoute from "./routes/MeRoute";
import NotificationsRoute from "./routes/NotificationsRoute";
import StudentRoute from "./routes/StudentRoute";
import ThreadsRoute from "./routes/ThreadsRoute";
import {
  gridOutline,
  chatboxEllipsesOutline,
  notificationsOutline,
  personCircleOutline,
} from "ionicons/icons";

setupIonicReact({
  mode: "ios",
});

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet id="app">
            <AuthWrapper>
              <Route path="/create" render={() => <CreateRoute />} />
              <Route path="/discover" render={() => <DiscoverRoute />} />
              <Route path="/student" render={() => <StudentRoute />} />
              <Route path="/group" render={() => <GroupRoute />} />
              <Route path="/threads" render={() => <ThreadsRoute />} />
              <Route
                path="/notifications"
                render={() => <NotificationsRoute />}
              />
              <Route path="/me" render={() => <MeRoute />} />
              <Route
                path="/"
                exact
                render={() => <Redirect to="/discover" />}
              />
            </AuthWrapper>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/forgotpass">
              <ForgotMyPassword />
            </Route>
            <Route exact path="/forgotpass/confirm">
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
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
