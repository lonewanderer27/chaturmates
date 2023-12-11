import {
  GroupCommentType,
  StudentType,
} from "../../../../types";
import GroupPostComment from "./Comment";

export interface ExtendedCommentType extends GroupCommentType {
  students: StudentType;
}

export default function CommentList(props: {
  comments: ExtendedCommentType[];
  refetch: () => void;
}) {
  return (
    <>
      {props.comments &&
        props.comments.map((comment) => (
          <GroupPostComment comment={comment} student={comment.students} />
        ))}
    </>
  );
}
