import { client } from "../../client";
import { StudentResponse } from "../../types/student";

export async function getAllStudents() {
  const response = await client
    .from("students")
    .select("*")
    .order("description", { nullsFirst: false });
  return Promise.resolve({
    data: {
      students: response.data!,
    },
    message: "Students fetched successfully",
    error: null,
    success: true,
  });
}

export async function getStudentById(
  id: string
): Promise<StudentResponse["get"]> {
  console.log("student id: ", id);

  // verify if the student exists
  const student = await client
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  // if student is not found, reject the promise
  if (!student) {
    return Promise.reject("Student not found");
  }

  // fetch the follower ids of the student from the database
  const followerIds = await client
    .from("student_followers")
    .select("*")
    .eq("following_id", id);

  // fetch the followers of the student from the database
  const followers = await client
    .from("students")
    .select("*")
    .in(
      "id",
      followerIds.data!.map((followerId) => followerId.follower_id)
    );

  // fetch the following ids of the student from the database
  const followingIds = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", id);

  // fetch the following of the student from the database
  const following = await client
    .from("students")
    .select("*")
    .in(
      "id",
      followingIds.data!.map((followingId) => followingId.following_id)
    );

  // fetch the group ids of the student from the database
  const group_ids = await client
    .from("group_members")
    .select("*")
    .eq("student_id", id);

  // fetch the groups of the student from the database
  const groups = await client
    .from("groups")
    .select("*, group_members(*)")
    .in(
      "id",
      group_ids.data!.map((group_id) => group_id.group_id)
    );

  // return the student, followers, following, and groups
  // @ts-ignore
  return Promise.resolve({
    data: {
      student: student.data!,
      followers: followers.data!,
      following: following.data!,
      groups: groups.data!,
    },
    message: "Student found",
    success: true,
    error: null,
  });
}
