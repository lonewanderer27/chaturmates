import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import MePage from "../pages/MePage";

export default function ProfileRoute() {
  return (
    <IonRouterOutlet id="me">
      <Route exact path="/me" render={() => <MePage/>}/>
    </IonRouterOutlet>
  )
}
