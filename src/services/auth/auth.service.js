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
      };
    } catch (error) {
      console.log(error);
    }
  };
  //Falta el check-satatus
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
