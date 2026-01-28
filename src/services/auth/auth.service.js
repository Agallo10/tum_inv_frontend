import { iotApi } from "../../api/iotApi";

export class AuthService {
  /////////////////////////////////////////////////////////////////////
  static login = async ({ username, password }) => {
    try {
      console.log(username, password);
      const datos = await iotApi.post("/auth/login", { username, password });
      console.log(datos);
      return {
        usuario: datos.data.usuario,
        token: datos.data.token,
        refresh_token: datos.data.refresh_token,
        expires_at: datos.data.expires_at,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  /////////////////////////////////////////////////////////////////////
  static refreshToken = async (refresh_token) => {
    try {
      const datos = await iotApi.post("/auth/refresh", { refresh_token });
      return {
        ok: true,
        usuario: datos.data.usuario,
        token: datos.data.token,
        refresh_token: datos.data.refresh_token,
        expires_at: datos.data.expires_at,
      };
    } catch (error) {
      console.log("Error al renovar token:", error);
      return {
        ok: false,
        error: error,
      };
    }
  };
  /////////////////////////////////////////////////////////////////////
  static checkStatus = async () => {
    try {
      const data = await iotApi.get("/auth/renew");
      return data;
    } catch (error) {
      throw new Error("UnAuthorized");
    }
  };
  /////////////////////////////////////////////////////////////////////
}
