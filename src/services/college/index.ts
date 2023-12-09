import { client } from "../../client";
import { CollegeResponse } from "../../types/college";

export async function getAllColleges(): Promise<CollegeResponse["getAll"]> {
  const colleges = await client.from("colleges").select("*");

  if (colleges.data!.length === 0) {
    return Promise.reject("No colleges found");
  }

  return Promise.resolve({
    data: {
      colleges: colleges.data!,
    },
    message: "Colleges fetched successfully",
    error: null,
    success: true,
  });
}

export async function getCollege(id: string): Promise<CollegeResponse["get"]> {
  const college = await client
    .from("colleges")
    .select("*")
    .eq("id", id)
    .single();

  if (!college) {
    return Promise.reject("College not found");
  }

  // fetch the courses from the database
  const courses = await client
    .from("courses")
    .select("*")
    .eq("college_id", college.data!.id);

  return Promise.resolve({
    data: {
      college: college.data!,
      courses: courses.data!,
    },
    message: "College fetched successfully",
    error: null,
    success: true,
  });
}
