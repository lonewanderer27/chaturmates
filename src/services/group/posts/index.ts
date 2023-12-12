import { client } from "../../../client";

export async function getGroupPosts(id: string) {
  const group = await client.from("groups").select("*").eq("id", id).single();

  if (!group) {
    return Promise.reject("Group not found");
  }

  return await getGroupPostsByVanityUrl(group.data!.vanity_id);
}

export async function getGroupPostsByVanityUrl(vanity_id: string) {}

export async function getGroupPostById(post_id: string) {
  const post = await client
    .from("group_posts")
    .select("*, groups(*, group_members(*), students(*))")
    .eq("id", post_id)
    .single();

  if (!post) {
    return Promise.reject("Group post not found");
  }

  return post;
}

export async function getGroupPostComments(post_id: string) {
  const comments = await client
    .from("group_comments")
    .select("*, students(*)")
    .eq("post_id", post_id)
    .order("created_at", { ascending: false })

  return comments;
}
