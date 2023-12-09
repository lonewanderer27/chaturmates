import { CollegeType, CourseType } from ".";

export interface CollegeResponse {
  getAll: {
    data: {
      colleges: CollegeType[];
    }
  },
  get: {
    data: {
      college: CollegeType;
      courses: CourseType[];
    }
  }
}