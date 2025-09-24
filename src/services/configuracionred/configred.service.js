import { iotApi } from "../../api/iotApi";

export class ConfigRedService {
  static createConfigRed = async (payload) => {
    // console.log('Payload de createConfigRed:', payload);

    try {
      const resp = await iotApi.post("/configuraciones-red", payload);
      const datos = resp.data;
      console.log("Datos de la configuracion de red creada:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear la configuracion de red";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static updateConfigRed = async (payload, id) => {
    // console.log('Payload de createConfigRed:', payload);

    try {
      const resp = await iotApi.put(`/configuraciones-red/${id}`, payload);
      const datos = resp.data;
      console.log("Datos la configuracion de red actualizada:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo actualizar";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static getAllConfigRed = async () => {
    try {
      const resp = await iotApi.get(`/configuraciones-red`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo cargar la configuracion de red";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static getAllConfigRedByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/configuracion-red`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage =
        "No se pudo cargar la configuracion de red por equipos";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
