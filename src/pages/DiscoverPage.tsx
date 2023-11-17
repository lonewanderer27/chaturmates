import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./Discover.css";
import BtnSearch from "../components/Discover/BtnSearch";
import useSession from "../hooks/auth/useSession";
import GroupsGrid from "../components/Discover/GroupsGrid";
import StudentsGrid from "../components/Discover/StudentsGrid";
import useGroups from "../hooks/group/useGroups";
import useCreateGroupModal from "../hooks/group/useCreateGroupModal";
import GroupCreateModal from "../components/Group/GroupCreateModal";
import useStudents from "../hooks/student/useStudents";

function DiscoverPage() {
  const { session, nickname } = useSession();
  const { groups } = useGroups();
  const { students } = useStudents();

  const { page, modal, presentingElement, toggleShowCreateGroup } =
    useCreateGroupModal();

  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle">
              Welcome, {nickname}
            </IonText>
            <IonButtons slot="end">
              <BtnSearch />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <p className="p-2 text-lg">
          Connect with a group or people like you
        </p>
        <StudentsGrid students={students} />
        <GroupsGrid groups={groups} />
        <GroupCreateModal
          handleToggle={toggleShowCreateGroup}
          presentingElementRef={presentingElement}
          modalRef={modal}
        />
      </IonContent>
    </IonPage>
  );
}

export default DiscoverPage;
