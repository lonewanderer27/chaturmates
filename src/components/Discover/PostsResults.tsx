import { useState } from "react";
import { GroupPostType, GroupType } from "../../types";
import { IonText, IonList } from "@ionic/react";
import PostCard from "./PostCard";

export default function PostsResults(props: {
  posts?: GroupPostType[];
  handleViewMore?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical px-0 font-poppins">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Posts
      </IonText>
      {props.posts && props.posts.length > 0 && (
        <IonList lines="none">
          {showAll ? (
            <>
              {props.posts.map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </>
          ) : (
            <>
              {props.posts.slice(0, 3).map((post) => (
                <PostCard post={post} key={post.id} />
              ))}
            </>
          )}
        </IonList>
      )}
      {props.posts && props.posts.length === 0 && (
        <p className="ion-padding-start">No posts found.</p>
      )}
      {props.posts && props.posts.length > 3 && (
        <IonText
          onClick={toggleShowAll}
          color="primary"
          className="ion-margin-vertical ion-padding-start cursor-pointer"
        >
          {showAll ? "See Fewer Posts" : "See More Posts"}
        </IonText>
      )}
    </div>
  );
}
