import { GroupResponse } from "@/types/group";
import { AxiosResponse } from "axios";
import http from "./http.service";

const GroupHTTPServices = {
  get: (id: string): Promise<AxiosResponse<GroupResponse['get']>> => {
    console.log("get group");
    return http.get(`/group/id/${id}`)
  },
  getByVanityUrl: (url: string): Promise<AxiosResponse<GroupResponse['get']>> => {
    console.log("get group");
    return http.get(`/group/vanity_url/${url}`)
  },
}

export default GroupHTTPServices;