import { client } from "../../client";
import { CourseResponse } from "../../types/course";
import { getCollege } from "../college";

export async function getAllCourses(): Promise<CourseResponse["getAll"]> {
  const courses = await client.from("courses").select("*");

  if (courses.data?.length === 0) {
    return Promise.reject("No courses found");
  }

  return Promise.resolve({
    data: {
      courses: courses.data!,
    },
    message: "Courses fetched successfully",
    error: null,
    success: true,
  });
}

export async function getCoursesInCollege(
  college_id: string
): Promise<CourseResponse["getAll"]> {
  // check if the college is valid
  try {
    const college = await getCollege(college_id);

    const courses = await client
      .from("courses")
      .select("*")
      .eq("college_id", college_id);

    if (courses.data?.length === 0) {
      return Promise.reject("No courses found");
    }

    return Promise.resolve({
      data: {
        courses: courses.data!,
      }
    })
  } catch {
    return Promise.reject("College not found")
  }
}
