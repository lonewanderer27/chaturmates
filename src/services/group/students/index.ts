import { client } from "../../../client";
import { GroupResponse } from "../../../types/group";

export default async function getStudentsInGroup(id: string): Promise<GroupResponse['students']['getAll']> {
  // verify if the group exists
  const group = await client.from("groups").select("*").eq("id", id).single();

  // if the group is not found, return an error
  if (!group) {
    return Promise.reject("Group not found")
  }

  // fetch the group members from the database
  const groupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id!);

  // fetch the approved group members from the database
  const approvedGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id!)
    .eq("approved", true);

  // fetch the pending group members from the database
  const pendingGroupMembers = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group.data!.id!)
    .eq("approved", false);

  // fetch the students based on the group members from the database
  const students = await client
    .from("students")
    .select("*")
    .in(
      "id",
      groupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the approved students based on the approved group members from the database
  const approvedStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      approvedGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // fetch the pending students based on the pending group members from the database
  const pendingStudents = await client
    .from("students")
    .select("*")
    .in(
      "id",
      pendingGroupMembers.data!.map((groupMember) => groupMember.student_id)
    );

  // return the group students, approved group students, pending group students, and the group
  return Promise.resolve({
    data: {
      group: group.data!,
      students: {
        all: students.data!,
        approved: approvedStudents.data!,
        pending: pendingStudents.data!,
      },
    },
    message: "Group students fetched successfully",
    success: true,
    error: null,
  })
}