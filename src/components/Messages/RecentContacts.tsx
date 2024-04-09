import { StudentType } from "../../types";
import Contact from "./Contact";

export default function RecentContacts(props: { students: StudentType[] }) {
  return (
    <div className="flex ion-padding overflow-x-auto overflow-scroll">
      {props.students.map((student) => (
        <Contact key={student.id} {...student} />
      ))}
    </div>
  );
}
