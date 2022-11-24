import axios from "axios";

const escapedToken = JSON.parse(localStorage.getItem("persist:root"))?.token;

const token = escapedToken && JSON.parse(escapedToken);

export const axiosWithToken = axios.create({
  baseURL: "https://13671.fullstack.clarusway.com/",
  //headers: { Authorization: `Token ${token}` },
});

// Add a request interceptor
axiosWithToken.interceptors.request.use((config) => {
  console.log("interceptor run");
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});


