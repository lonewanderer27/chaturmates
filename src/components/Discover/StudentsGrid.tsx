import { IonGrid, IonRow } from "@ionic/react";
import StudentCard from "./StudentCard";
import "swiper/css";
import "swiper/css/scrollbar";
import useStudentSearch from "../../hooks/student/useStudentSearch";
import { StudentType } from "../../types";

export default function StudentsGrid(props: { students: StudentType[] }) {
  return (
    <div className="ion-padding-vertical flex overflow-x-auto overflow-scroll">
      {props.students.map((student) => (
        <StudentCard
          slug={student.id + ""}
          key={student.id}
          studentName={student.full_name ?? ""}
          studentDescription={student.description}
          studentType={student.type ?? ""}
        />
      ))}
    </div>
  );
}
