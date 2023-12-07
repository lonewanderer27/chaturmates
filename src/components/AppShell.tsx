import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-supabase";

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

/* Bootstrap CSS */
import "bootstrap/dist/css/bootstrap.min.css";

/* Theme variables */
import "../theme/m/variables.css";

/* Our custom CSS */
import "../theme/m/typography.css"; // global text styles
import "../theme/m/inputs.css"; // global input styles
import "../theme/m/tabs.css"; // bottom tabs styles

import Tabs from "./Tabs";

// setup ionic react
setupIonicReact({
  mode: "ios",
});

// instantiate tanstack client
const client = new QueryClient();

function App() {
  return (
    <Provider value={client}>
      <QueryClientProvider client={client}>
        <IonApp>
          <IonReactRouter>
            <Tabs />
          </IonReactRouter>
        </IonApp>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
