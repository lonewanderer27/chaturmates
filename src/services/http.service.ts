import axios from "axios";

// create axios instance
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL ? process.env.NEXT_PUBLIC_BACKEND_URL : window.location.origin+"/api",
})

// add request interceptor
http.interceptors.request.use(function (config: any) {
  // do something before request is sent
  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
})

export default http