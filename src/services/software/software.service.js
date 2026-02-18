import { iotApi } from "../../api/iotApi";

export class SoftwareService {
  static createSoftware = async (payload) => {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post("/software", payload);
      const datos = resp.data;
      console.log("Datos del software creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el software";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static getAllSoftware = async () => {
    try {
      const resp = await iotApi.get(`/software`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los software";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static getAllSoftwareByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/software`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar los software";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  static actualizarSoftware = async (id, payload) => {
    try {
      const resp = await iotApi.put(`/software/${id}`, payload);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo actualizar el software" };
    }
  };
}
