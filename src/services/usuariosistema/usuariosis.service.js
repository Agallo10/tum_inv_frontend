import { iotApi } from "../../api/iotApi";

export class UsuarioSistemaService {
  static createUsuarioSistema = async (payload) => {
    // console.log('Payload de createUsuarioSistema:', payload);

    try {
      const resp = await iotApi.post("/usuarios-sistema", payload);
      const datos = resp.data;
      console.log("Datos del usuario creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el usuario";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static getAllUsuariosSistema = async () => {
    try {
      const resp = await iotApi.get(`/usuarios-sistema`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los usuarios";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static getAllUsuariosSistemaByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/usuarios-sistema`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar los usuarios";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
