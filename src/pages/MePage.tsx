import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
} from "@ionic/react";
import "./MePage.css";
import { client } from "../client";
import Cover from "../components/Me/Cover";
import Avatar from "../components/Me/Avatar";
import useSelfStudent from "../hooks/student/useSelfStudent";
import StudentInformation from "../components/Me/Information";

function ProfilePage() {
  const handleLogout = () => {
    client.auth.signOut();
  };
  const { student, profile, groups } = useSelfStudent();

  return (
    <IonPage>
      <IonContent fullscreen>
        <Cover />
        <Avatar student={student} />
        <IonText>
          <h3 className="text-xl font-bold text-center font-poppins">
            {student?.full_name}
          </h3>
        </IonText>
        <IonText className=" font-poppins">
          <p className="px-4 pt-2 text-center">{student?.description}</p>
        </IonText>
        <StudentInformation student={student} profile={profile} />
        <IonButton onClick={handleLogout} expand="block" className="p-4 bottom-0 font-poppins font-bold">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default ProfilePage;
