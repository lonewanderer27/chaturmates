import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import JaneDoe from "../pages/Klasmeyts/JaneDoe";
import JonathanDoe from "../pages/Klasmeyts/JonathanDoe";
import JohhnaDoe from "../pages/Klasmeyts/JohhnaDoe";
import StudentPage from "../pages/StudentPage";

export default function StudentRoute() {
  return (
    <IonRouterOutlet id="student">
      <Route path="/student/:student_id" render={() => <StudentPage />} />
      {/* <Route exact path="/student/jane-doe" render={() => <JaneDoe />} />  */}
    </IonRouterOutlet>
  );
}
