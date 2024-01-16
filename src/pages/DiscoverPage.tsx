import "./Discover.css";

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
import { notifications, notificationsCircleOutline, notificationsOutline, notificationsSharp } from "ionicons/icons";

import AdminPostsGrid from "../components/Discover/AdminPostsGrid";
import BtnSearch from "../components/Discover/BtnSearch";
import GroupCreateModal from "../components/Group/GroupCreateModal";
import GroupsGrid from "../components/Discover/GroupsGrid";
import NavBtn from "../components/Discover/NavBtn";
import StudentsGrid from "../components/Discover/StudentsGrid";
import { getAdminPosts } from "../services/group/admin/posts";
import { getAllGroups } from "../services/group";
import { getAllStudents } from "../services/student";
import useCreateGroupModal from "../hooks/group/useCreateGroupModal";
import { useQuery } from "@tanstack/react-query";
import useSelfStudent from "../hooks/student/useSelfStudent";
import useSession from "../hooks/auth/useSession";
import useStudents from "../hooks/student/useStudents";

function DiscoverPage() {
  const { session, nickname } = useSession();
  const { student } = useSelfStudent();
  const query = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      console.log("useQuery");
      const res = await getAllGroups();
      await close();
      console.log("data", res.data);
      return res.data;
    },
  });
  
  const squery = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      console.log("useQuery");
      const res = await getAllStudents();
      await close();
      console.log("data", res.data);
      return res.data;
    },
  });

  const iaQuery = useQuery({
    queryKey: ["important_announcements"],
    queryFn: async () => {
      const res = await getAdminPosts(student!.school+"");
      console.log("adminPosts", res);
      return res.data;
    },
    enabled: !!student?.id
  })

  const { page, modal, presentingElement, toggleShowCreateGroup } =
    useCreateGroupModal();

  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle font-poppins">
              Welcome {nickname}
            </IonText>
            <IonButtons slot="end">
              <BtnSearch />
              <NavBtn
                route="/notifications"
                icon={notificationsSharp}
              />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <AdminPostsGrid group={iaQuery.data} posts={iaQuery.data?.group_posts} />
        <StudentsGrid students={squery.data?.students} />
        <GroupsGrid groups={query.data?.groups} />
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
