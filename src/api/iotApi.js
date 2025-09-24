import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL, VITE_API_CONT, VITE_DOWNLINK_URL } = getEnvVariables();
//////////////////////////////////////////////
export const iotApi = axios.create({
  baseURL: VITE_API_URL,
});
//////////////////////////////////////////////
iotApi.interceptors.request.use(async (config) => {
  //GET DEL ZUSTAND PARA TENER EL  TOKEN
  const token = localStorage.getItem("token");
  //console.log(token);
  if (token) {
    config.headers["x-token"] = token;
  }
  return config;
});
