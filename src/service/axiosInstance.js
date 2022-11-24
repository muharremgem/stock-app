import axios from "axios";


const escapedToken = JSON.parse()

export const axiosWithToken = axios.create({
  baseURL: "https://13671.fullstack.clarusway.com/",
  headers: { Authorization: `Token ${token}` },
});
