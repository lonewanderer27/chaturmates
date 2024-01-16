import "./MePage.css";

import {
  IonButton,
  IonContent,
  IonInput,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  useIonRouter,
} from "@ionic/react";
import {useEffect, useState} from "react";

import Avatar from "../components/Me/Avatar";
import ChangePasswordModal from "../components/Me/ChangePasswordModal";
import Cover from "../components/Me/Cover";
import StudentInformation from "../components/Me/Information";
import {client} from "../client";
import useChangePassModal from "../hooks/me/useChangePassModal";
import useSelfStudent from "../hooks/student/useSelfStudent";
import useSession from "../hooks/auth/useSession";
import useUpdateInfo from "../hooks/me/useUpdateInfo";

function ProfilePage() {
  const {session} = useSession();
  const rt = useIonRouter()

  const [showMoreOpts, setShowMoreOpts] = useState(false);

  const toggleShowMoreOpts = () => {
    setShowMoreOpts((show) => !show);
  }

  const {page, modal, presentingElement, toggleShowChangePass} = useChangePassModal();
  const {setEdit, edit, handleSubmit, handleSave, handleError, setValue, register, saving} = useUpdateInfo();

  const handleLogout = () => {
    client.auth.signOut();
  };
  const {student, profile, groups, school, academic_year, following} = useSelfStudent();

  useEffect(() => {
    return () => {
      setEdit(false);
    }
  }, []);

  // @ts-ignore
  return (
      <IonPage ref={page}>
        <IonContent fullscreen>
          <Cover/>
          <form onSubmit={handleSubmit(handleSave, handleError)} className={"border-2 rounded-lg py-2"}>
            <Avatar student={student}/>
            <IonText>
              {!edit && <h3 className="text-xl font-semibold text-center font-poppins">
                {student?.full_name}
              </h3>}
              {edit && <IonInput labelPlacement={"floating"} label={"Full Name"}
                                 className={"font-poppins custom border-2 rounded-lg m-2 w-auto text-center"} {...register("fullName")} />}
            </IonText>
            {!edit && <IonText className=" font-poppins">
                <p className="px-4 pt-2 text-center">{student?.description ?? "Klasmeyt!"}</p>
            </IonText>}
            {edit && <IonTextarea autoGrow counter label={"Description"} labelPlacement={"floating"}
                                  className={"font-poppins custom border-2 rounded-lg m-2 w-auto text-center"}
                                  placeholder={"Klasmeyt!"} {...register("description")} />}

            <IonRow className={"justify-content-center"}>
              {!edit ? <IonButton size={"small"} className="py-2 px-2 bottom-0" onClick={() => {
                    setEdit(true);
                  }}>
                    <IonText className={"p-2 font-poppins font-bold"}>
                      Edit Profile
                    </IonText>
                  </IonButton> :
                  <IonButton disabled={saving} type={"submit"} size={"small"} className="py-2 px-2 bottom-0">
                    <IonText className={"p-2 font-poppins font-bold"}>
                      {saving && <IonSpinner name={"lines-small"}/>} Save Changes
                    </IonText>
                  </IonButton>}
              {session?.user.app_metadata.provider !== "google" && !edit && <>
                  <IonButton color={"dark"} size={"small"} className="py-2 bottom-0 font-poppins font-bold"
                             onClick={toggleShowMoreOpts}>
                      <IonText className={"px-2 font-poppins font-bold text-lg"}>
                          ...
                      </IonText>
                  </IonButton>
                {showMoreOpts && (
                    <IonButton size={"small"} className="py-2 px-2 bottom-0 font-poppins font-bold"
                               onClick={() => toggleShowChangePass()}>
                      Change Password
                    </IonButton>
                )}
              </>}
            </IonRow>
            <StudentInformation student={student} profile={profile} school={school} academic_year={academic_year}/>
            <div className={"border-2 m-2 rounded-lg flex flex-col"}>
              <h3 className={"font-poppins font-bold text-center mt-2"}>Groups</h3>
              <div className={"border-2 m-2 rounded-lg flex"}>
                {groups?.map((group) => (
                    <img src={group.avatar_url ?? ""} onClick={() => rt.push("/group/" + group.vanity_id, "forward")}
                         className={"cursor-pointer h-10 rounded-sm"}/>)
                )}
              </div>
              <h3 className={"font-poppins font-bold text-center mt-2"}>Following</h3>
              <div className={"border-2 m-2 rounded-lg flex"}>
                {following?.map((student) => (
                    <img src={student.avatar_url ?? ""} onClick={() => rt.push("/student/" + student.id, "forward")} className={"cursor-pointer h-10 rounded-sm"}/>)
                )}
              </div>
            </div>
            <IonButton onClick={handleLogout} expand="block" className="p-2 bottom-0 font-poppins font-bold">
              Logout
            </IonButton>
            <ChangePasswordModal handleToggle={toggleShowChangePass} presentingElementRef={presentingElement}
                                 modalRef={modal}/>
          </form>
        </IonContent>
      </IonPage>
  );
}

export default ProfilePage;
