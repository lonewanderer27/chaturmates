import {IonGrid, IonRow } from "@ionic/react";
import StudentCard from "./StudentCard";
import "swiper/css";
import "swiper/css/scrollbar";
import useStudentSearch from "../../hooks/student/useStudentSearch";
import { StudentType } from "../../types";

export default function StudentsGrid(props: {
  students: StudentType[];
}) {
  return (
    <IonGrid className="ion-padding-vertical">
      <IonRow className="flex flex-col">
        {props.students.slice(0, 1).map((student) => (
          <StudentCard
            slug={student.id+""}
            key={student.id}
            studentName={student.full_name ?? ""}
            studentDescription={student.description ?? ""}
            studentType={student.type ?? ""}
          />
        ))}
      </IonRow>
    </IonGrid>
  );
}
