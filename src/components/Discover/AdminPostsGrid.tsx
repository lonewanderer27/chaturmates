import { GroupPostType, GroupType } from "../../types";
import AdminPostCard from "./AdminPostCard";

export default function AdminPostsGrid(props: {
  group?: GroupType & {
    group_posts: GroupPostType[]
  }
  posts?: GroupPostType[];
}) {
  return (
    <>
      <p className="px-2 mb-[-5px] text-base font-poppins font-semibold">
        Important Announcements
      </p>
      <div className="ion-padding-vertical flex overflow-x-auto overflow-scroll overflow-y-hidden">
        {props.posts &&
          props.posts.map((post) => (
            <AdminPostCard key={post.id} group={props.group} post={post} />
          ))}
      </div>
    </>
  );
}
