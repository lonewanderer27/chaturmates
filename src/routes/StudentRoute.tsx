import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router";
import { Suspense, lazy } from "react";
import GenericPage from "../loaders/GenericPage";
const StudentPage = lazy(() => import("../pages/StudentPage"));

export default function StudentRoute() {
  return (
    <IonRouterOutlet id="student">
      <Route path="/student/:student_id" render={() => <Suspense  fallback={<GenericPage />}><StudentPage /></Suspense>} />
    </IonRouterOutlet>
  );
}
