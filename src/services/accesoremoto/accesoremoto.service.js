import { iotApi } from "../../api/iotApi";

export class AccesoRemotoService {
  static createAccesoRemoto = async (payload) => {
    // console.log('Payload de createAccesoRemoto:', payload);

    try {
      const resp = await iotApi.post("/accesos-remotos", payload);
      const datos = resp.data;
      console.log("Datos del hardware creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el acceso remoto";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static getAllAccesosRemotos = async () => {
    try {
      const resp = await iotApi.get(`/accesos-remotos`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los accesos remotos";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static getAllAccesosRemotosByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/accesos-remotos`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage =
        "No se pudieron cargar los accesos remotos por equipo";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
