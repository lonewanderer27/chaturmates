import { FollowType, GroupMemberType, GroupType, StudentType } from ".";
import { GroupResponse } from "./group";

export interface StudentsResponse {
  getAll: {
    data: StudentResponse['get']['data'][],
    error: any;
    success: boolean;
    message: string;
  }
}

export interface StudentResponse {
  get: {
    data: {
      student: StudentType;
      groups: GroupResponse['get']['data']['group'][];
      followers: StudentType[];
      following: StudentType[];
    };
    error: any;
    success: boolean;
    message: string;
  };
  getByProfileId: {
    data: {
      student: StudentType;
      groups: GroupType[];
      followers: StudentType[];
      following: StudentType[];
    };
    error: any;
    success: boolean;
    message: string;
  };
  groups: {
    getAll: {
      data: {
        student: StudentType;
        groups: GroupResponse['get']['data']['group'][];
      };
      error: any;
      success: boolean;
      message: string;
    };
    create: {
      data: {
        group: GroupType;
      };
      error: any;
      success: boolean;
      message: string;
    };
  };
  followers: {
    getAll: {
      data: {
        student: StudentType;
        followers: StudentType[];
      };
      error: any;
      message: string;
      success: boolean;
    };
    follow: {
      data: {
        student: StudentType;
      };
      error: any;
      message: string;
      success: boolean;
    };
  };
  following: {
    getAll: {
      data: {
        student: StudentType;
        following: StudentType[];
      };
      error: any;
      message: string;
      success: boolean;
    },
    follow: {
      data: {
        student: FollowType;
      };
      error: any;
      message: string;
      success: boolean;
    }
    unfollow: {
      error: any;
      message: string;
      success: boolean;
    }
  };
  otp: {
    generate: {
      data: {
        code: string;
      }
      message: string;
      success: boolean;
      error: any;
    }
  }
}
