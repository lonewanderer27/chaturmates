import { GroupType, StudentType } from ".";
import { Database } from "./supabase";

export interface StudentResponse {
  get: {
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
        groups: GroupType[];
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
