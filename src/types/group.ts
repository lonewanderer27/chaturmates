import {
  CollegeType,
  CourseType,
  GroupMemberType,
  GroupType,
  StudentType,
} from ".";

export interface GroupCreateInputs {
  step1: {
    name: string;
    description: string;
  };
  step2: {
    avatar_url?: string;
    cover_url?: string;
    vanity_id: string;
  };
  step3: {
    school: number;
    course: number;
    college: number;
    semester: number;
    academic_year_id: number;
  };
}

export interface CreateGroupInputs {
  academic_year_id: number;
  avatar_url: string | null;
  course: number;
  cover_url: string | null;
  description: string | null;
  name: string;
  school: number;
  semester: number;
  vanity_id: string;
}

export interface GroupsResponse {
  getAll: {
    data: {
      groups: GroupResponse["get"]["data"]["group"][];
    };
    message: string;
    success: boolean;
    error: any;
  };
}

export interface ExpandedGroupMemberType extends GroupMemberType {
  students: StudentType
}

export interface GroupResponse {
  get: {
    data: {
      group: GroupType & {
        memberCount?: number;
        group_members: ExpandedGroupMemberType[];
      };
      college?: CollegeType;
      course?: CourseType;
      members: {
        all: GroupMemberType[];
        approved: GroupMemberType[];
        pending: GroupMemberType[];
      };
      admins?: StudentType[];
      students: {
        all: StudentType[];
        approved: StudentType[];
        pending: StudentType[];
      };
    };
    message: string;
    success: boolean;
    error: any;
  };
  students: {
    getAll: {
      data: {
        group: GroupType;
        students: {
          all: StudentType[];
          approved: StudentType[];
          pending: StudentType[];
        };
      };
    };
  };
}
