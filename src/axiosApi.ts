import axios from "axios";

export const axiosApi = axios.create({
  baseURL: "https://js-30-timur-default-rtdb.europe-west1.firebasedatabase.app",
})