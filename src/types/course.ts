import { CourseType } from "."

export interface CourseResponse {
  getAll: {
    data: {
      courses: CourseType[];
    },
  },
  get: {
    data: {
      course: CourseType;
    }
  }
}