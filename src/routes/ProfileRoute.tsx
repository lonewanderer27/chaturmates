import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import ProfilePage from "../pages/ProfilePage";

export default function ProfileRoute() {
  return (
    <IonRouterOutlet id="me">
      <Route exact path="/me" render={() => <ProfilePage/>}/>
    </IonRouterOutlet>
  )
}
