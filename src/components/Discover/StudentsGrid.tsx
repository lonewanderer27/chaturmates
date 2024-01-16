import StudentCard from "./StudentCard";
import "swiper/css";
import "swiper/css/scrollbar";
import {StudentType} from "../../types";

export default function StudentsGrid(props: { students?: StudentType[] }) {
  return (
    <>
      <p className="px-2 mb-[-5px] text-base font-poppins font-semibold">
        Connect with a group or people like you
      </p>
      <div className="ion-padding-vertical flex overflow-x-scroll overflow-scroll  overflow-y-hidden">
        {props.students &&
          props.students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
      </div>
    </>
  );
}
