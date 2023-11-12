import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import Profile from "../pages/Profile";

export default function ProfileRoute() {
  return (
    <IonRouterOutlet>
      <Route exact path="/me" render={() => <Profile/>}/>
    </IonRouterOutlet>
  )
}
