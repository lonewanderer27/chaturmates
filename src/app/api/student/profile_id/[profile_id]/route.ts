import { client } from "@/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export async function GET(
  request: Request,
  { params }: { params: { profile_id: string } }
) {
  // fetch the profile id from the url
  console.log(params);
  const { profile_id } = params;

  // if the profile id is not present, return an error
  if (!profile_id) {
    return new Response(
      JSON.stringify({ error: "Missing profile id", success: false }),
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  // verify if the profile exists
  const profile = await client
    .from("profiles")
    .select("*")
    .eq("id", profile_id)
    .single();

  // if the profile is not found, return an error
  if (!profile) {
    return new Response(
      JSON.stringify({ error: "Profile not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // verify if the student exists with the profile id
  const student = await client
    .from("students")
    .select("*")
    .eq("profile_id", profile_id)
    .single();

  // if the student is not found, return an error
  if (!student) {
    return new Response(
      JSON.stringify({ error: "Student not found", success: false }),
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }

  // fetch the follower ids of the student from the database
  const followerIds = await client
    .from("student_followers")
    .select("*")
    .eq("following_id", student.data!.id);

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
    .eq("follower_id", student.data!.id);

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
    .eq("student_id", student.data!.id);

  // fetch the groups of the student from the database
  const groups = await client
    .from("groups")
    .select("*")
    .in(
      "id",
      group_ids.data!.map((group_id) => group_id.group_id)
    );

  // return the student, followers, following, and groups
  return new Response(
    JSON.stringify({
      error: null,
      success: true,
      data: {
        student: student.data,
        followers: followers.data,
        following: following.data,
        groups: groups.data,
      },
    }),
    {
      status: 200,
      statusText: "OK",
    }
  );
}
