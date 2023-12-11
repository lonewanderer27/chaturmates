import { IonItem, IonText } from "@ionic/react";
import { GroupCommentType, StudentType } from "../../../../types";
import StudentItem from "../../../Discover/Search/StudentItem";

export default function GroupPostComment(props: {
  student?: StudentType;
  comment: GroupCommentType;
}) {
  return (
    <div className="my-2">
      <div className="mx-[-20px] mb-[-3px]">
        {props.student && (
          <StudentItem
            showType={false}
            showBtn={false}
            student={props.student}
          />
        )}
      </div>
      <IonText className="font-poppins">
        <p style={{ paddingLeft: "53px" }} className=" mt-[-20px]">
          {props.comment.content}
        </p>
      </IonText>
    </div>
  );
}
