import { GroupMemberType, GroupType, StudentType } from ".";

export interface CreateGroupInputs {
  academic_year_id: number;
  avatar_url: string | null;
  course: number;
  cover_url: string | null;
  description: string | null;
  name: string;
  school: number;
  semester: number;
  vanity_url: string;
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

export interface GroupResponse {
  get: {
    data: {
      group: GroupType;
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
      }
    }
  };
}
