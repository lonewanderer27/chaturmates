import { GroupType } from "../types";
import { StudentResponse } from "../types/student";
import http from "./http.service";
import { AxiosResponse } from "axios";

const StudentHTTPServices = {
  get: (id: string): Promise<AxiosResponse<StudentResponse["get"]>> => {
    console.log("baseURL: ", http.defaults.baseURL)
    console.log("get student");
    return http.get(`/student/id/${id}`);
  },
  groups: {
    getAll: (
      id: string
    ): Promise<AxiosResponse<StudentResponse["groups"]["getAll"]>> => {
      return http.get(`/student/id/${id}/groups`);
    },
    create: (
      id: string,
      data: GroupType
    ): Promise<AxiosResponse<StudentResponse["groups"]["create"]>> => {
      return http.post(`/student/id/${id}/groups`, data);
    },
  },
  followers: {
    getAll: (
      id: string
    ): Promise<AxiosResponse<StudentResponse["followers"]["getAll"]>> => {
      return http.get(`/student/id/${id}/followers`);
    },
  },
  following: {
    getAll: (
      id: string
    ): Promise<AxiosResponse<StudentResponse["following"]["getAll"]>> => {
      return http.get(`/student/id/${id}/following`);
    },
  },
  otp: {
    create: (
      id: string
    ): Promise<AxiosResponse<StudentResponse["otp"]["generate"]>> => {
      return http.post(`/student/id/${id}/otp`);
    },
  },
};

export default StudentHTTPServices;
