import { client } from "../../client";

export async function addToSearch(
  query: string,
  profile_id: string,
  student_id: number
) {
  return await client.from("search_history").insert({
    query,
    profile_id,
    student_id,
  });
}
