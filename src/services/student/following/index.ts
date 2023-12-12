import { client } from "../../../client";
import { StudentResponse } from "../../../types/student";

export async function followStudent(
  student_id: string,
  following_id: string
): Promise<StudentResponse["following"]["follow"]> {
  // verify if the student exists
  console.log("Verifying if the student exists");
  const studentFollower = await client
    .from("students")
    .select("*")
    .eq("id", student_id)
    .single();
  console.log("Student follower:", studentFollower);

  // if the student is not found, reject the promise
  if (!studentFollower.data) {
    return Promise.reject("Student follower not found");
  }

  // verify if the student to be followed exists
  console.log("Verifying if the student to be followed exists");
  const studentToFollow = await client
    .from("students")
    .select("*")
    .eq("id", following_id)
    .single();
  console.log("Student to be followed:", studentToFollow);

  // if the student is not found, reject the promise
  if (!studentToFollow.data) {
    return Promise.reject("Student to be followed not found");
  }

  // verify if the student is already following the student to be followed
  console.log("Verifying if the student is already following the student to be followed");
  const alreadyFollowing = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", student_id)
    .eq("following_id", following_id)
    .single();
  // console.log("Already following:", alreadyFollowing);

  // if the student is already following the student to be followed, return an error
  if (alreadyFollowing.data?.id) {
    return Promise.reject("You already follow this student");
  }

  // follow the student
  console.log("Following the student");
  const followed = await client
    .from("student_followers")
    .insert({
      follower_id: Number(student_id),
      following_id: Number(following_id),
    })
    .select("*")
    .single();
  console.log("Followed:", followed);

  // if the student could not be followed, reject the promise
  if (!followed.data) {
    return Promise.reject("Could not follow");
  }

  return Promise.resolve({
    error: null,
    message: "Followed successfully",
    success: true,
    data: {
      student: followed.data!,
    },
  });
}

export async function unfollowStudent(
  student_id: string,
  following_id: string
): Promise<StudentResponse["following"]["unfollow"]> {
  // verify if the student exists
  const studentFollower = await client
    .from("students")
    .select("*")
    .eq("id", student_id)
    .single();

  // if the student is not found, reject the promise
  if (!studentFollower.data) {
    return Promise.reject("Student follower not found");
  }

  // verify if the student to be unfollowed exists
  const studentToFollow = await client
    .from("students")
    .select("*")
    .eq("id", following_id)
    .single();

  // if the student is not found, reject the promise
  if (!studentToFollow.data) {
    return Promise.reject("Student to be followed not found");
  }

  // verify if the student is not following the student to be unfollowed
  const alreadyFollowing = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", student_id)
    .eq("following_id", following_id)
    .single();

  // if the student is not following the student to be unfollowed, return an error
  if (!alreadyFollowing.data) {
    return Promise.reject("You do not follow this student");
  }

  // unfollow a student
  const unfollowed = await client
    .from("student_followers")
    .delete()
    .eq("follower_id", Number(student_id))
    .eq("following_id", following_id);

  // if the student could not be unfollowed, reject the promise
  if (!unfollowed.data) {
    return Promise.reject("Could not unfollow");
  }

  return Promise.resolve({
    error: null,
    message: "Unfollowed successfully",
    success: true,
  });
}

export async function getAllStudentFollowings(
  student_id: string
): Promise<StudentResponse["following"]["getAll"]> {
  // verify if the student exists
  const student = await client
    .from("students")
    .select("*")
    .eq("id", student_id)
    .single();

  if (!student) {
    return Promise.reject("Student not found");
  }

  // fetch the following ids of the student from the database
  const followingIds = await client
    .from("student_followers")
    .select("*")
    .eq("follower_id", student_id);

  // fetch the following of the student from the database
  const following = await client
    .from("students")
    .select("*")
    .in(
      "id",
      followingIds.data!.map((followingId) => followingId.following_id)
    );

  // return the student and their following
  return Promise.resolve({
    data: {
      student: student.data!,
      following: following.data!,
    },
    success: true,
    message: "Fetched successfully",
    error: null,
  });
}
