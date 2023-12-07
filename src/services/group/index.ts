import { client } from "../../client";
import { GroupResponse } from "../../types/group";

export async function getGroupById(id: string): Promise<GroupResponse["get"]> {
  const group = await client.from("groups").select("*").eq("id", id).single();

  if (!group) {
    return Promise.reject("Group not found");
  }

  return await getGroupByVanityUrl(group.data!.vanity_url);
}

export async function getGroupByVanityUrl(
  vanity_url: string
): Promise<GroupResponse["get"]> {
  const group = await client
    .from("groups")
    .select("*")
    .eq("vanity_url", vanity_url)
    .single();

  if (!group) {
    return Promise.reject("Group not found");
  }

  // fetch the group members from the database
  const groupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id);

  // fetch the approved group members from the database
  const approvedGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id)
    .eq("approved", true);

  // fetch the pending group members from the database
  const pendingGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id)
    .eq("approved", false);

  // fetch the students based on the group members from the database
  const students = await client
    .from("students")
    .select("*")
    .in(
      "id",
      groupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the students based on the approved group members from the database
  const approvedStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      approvedGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the students based on the pending group members from the database
  const pendingStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      pendingGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the group chat urls from the database
  const groupChatUrls = await client
    .from("group_chat_urls")
    .select("*")
    .eq("group_id", group.data!.id);

  // fetch the group posts from the database
  const groupPosts = await client
    .from("group_posts")
    .select("*")
    .eq("group_id", group.data!.id);

  // fetch the admin ids of the group from the database
  const adminIds = await client
    .from("group_members")
    .select("*")
    .eq("is_admin", true)
    .eq("group_id", group.data!.id);

  // fetch the admin members of the group from the database
  const admins = await client
    .from("group_members")
    .select("*")
    .in(
      "id",
      adminIds.data!.map((adminId) => adminId.student_id)
    );

  // fetch the admin students of the group from the database
  const adminStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      admins.data!.map((admin) => admin.student_id)
    );

  // return the group, members, admins, students, chat urls, and posts
  return Promise.resolve({
    data: {
      group: group.data!,
      chat_urls: groupChatUrls.data!,
      posts: groupPosts.data!,
      members: {
        all: groupMembers.data!,
        approved: approvedGroupMembers.data!,
        pending: pendingGroupMembers.data!,
      },
      admins: adminStudents.data!,
      students: {
        all: students.data!,
        approved: approvedStudents.data!,
        pending: pendingStudents.data!,
      },
    },
    message: "Group fetched successfully",
    error: null,
    success: true,
  });
}
