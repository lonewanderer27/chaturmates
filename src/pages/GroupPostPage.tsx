import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFabButton,
  IonFooter,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonPage,
  IonProgressBar,
  IonText,
  IonTextarea,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useQuery } from "@tanstack/react-query";
import { chevronBack, send, sendOutline } from "ionicons/icons";
import { useParams } from "react-router";
import {
  getGroupPostById,
  getGroupPostComments,
} from "../services/group/posts";
import { useMemo, useState } from "react";
import CommentList, {
  ExtendedCommentType,
} from "../components/Group/Post/Comment/CommentList";
import { client } from "../client";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import GroupPostComment from "../components/Group/Post/Comment/Comment";

export default function GroupPostPage() {
  const rt = useIonRouter();
  const handleBack = () => {
    if (rt.canGoBack()) {
      rt.goBack();
    }
    rt.push("/discover", "back");
  };

  const { vanity_id, post_id } = useParams<{
    vanity_id: string;
    post_id: string;
  }>();

  const pquery = useQuery({
    queryKey: ["group_post", post_id],
    queryFn: async () => {
      const res = await getGroupPostById(post_id);
      console.log("Post:", res.data);
      return res.data;
    },
  });

  const cquery = useQuery({
    queryKey: ["comments, post_id:", pquery.data?.group_id],
    queryFn: async () => {
      const res = await getGroupPostComments(pquery.data!.id + "");
      console.log("group post comments: ", res.data);
      return res.data;
    },
    enabled: !!pquery.data?.id,
  });

  const timestamp = useMemo(() => {
    if (pquery.data?.created_at) {
      return new Date(pquery.data?.created_at!);
    } else {
      return new Date();
    }
  }, [pquery.data?.created_at]);

  const [posting, setPosting] = useState(() => false);
  const {
    setValue,
    control,
    handleSubmit,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm<{ comment: string }>({
    resolver: yupResolver(
      object().shape({
        comment: string().required(),
      })
    ),
  });
  const handlePostComment: SubmitHandler<{ comment: string }> = async (
    data
  ) => {
    setPosting(() => true);

    // check if the comment's empty
    if (data.comment.length === 0) {
      setError("comment", {
        type: "custom",
        message: "You must fill up this input",
      });
      return;
    }

    // post the new comment
    const res = await client
      .from("group_comments")
      .insert({
        post_id: pquery.data!.id!,
        member_id: pquery.data!.member_id,
        student_id: pquery!.data!.student_id,
        content: data.comment!,
      })
      .select("*")
      .single();

    if (!res.data) {
      console.log("Error posting comment");
      console.log(res.error);
      setPosting(() => false);
      return;
    }

    // posting the comment was successful
    // refetch the latest comments
    await pquery.refetch();
    setPosting(() => false);

    // clear the comment box
    setValue("comment", "");
  };

  return (
    <IonPage>
      <IonContent>
        <IonFabButton className="m-3" size="small" onClick={handleBack}>
          <IonIcon src={chevronBack}></IonIcon>
        </IonFabButton>
        <IonCard className="postPageCard">
          {pquery.isLoading && <IonProgressBar type="indeterminate" />}
          <IonCardHeader>
            <IonCardTitle className="font-poppins text-xl">
              {pquery.data?.title}
            </IonCardTitle>
            <IonCardSubtitle>
              {timestamp.toDateString()} {timestamp.getHours()}:
              {timestamp.getMinutes()}
            </IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText className="font-poppins">
              <p>{pquery.data?.content}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
        <IonCard>
          {pquery.isLoading && <IonProgressBar type="indeterminate" />}
          <IonCardHeader>
            <IonCardSubtitle>Comments:</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {cquery.data &&
                cquery.data.map((comment) => (
                  <IonItemSliding>
                    <IonItem lines="none" className="mx-0 px-0">
                      <GroupPostComment
                        student={comment.students! ?? null}
                        comment={comment}
                      />
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption color="danger">Delete</IonItemOption>
                    </IonItemOptions>
                    <IonItemOptions side="start">
                      <IonItemOption color="tertiary">Edit</IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        {posting && <IonProgressBar type="indeterminate" />}
        <IonToolbar className="p-2">
          <Controller
            render={({ field }) => (
              <IonTextarea
                className={`custom ${
                  getFieldState("comment").error
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                disabled={posting}
                value={field.value}
                onIonChange={(e) => setValue("comment", e.detail.value ?? "")}
                autoGrow
                placeholder="Write a comment"
                errorText={getFieldState("comment").error?.message}
              />
            )}
            control={control}
            name="comment"
          />
        </IonToolbar>
        <IonToolbar className="px-2 mt-[-10px]">
          <IonButton
            disabled={posting}
            slot="end"
            size="small"
            fill="clear"
            onClick={handleSubmit(handlePostComment)}
          >
            <IonIcon src={send}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}