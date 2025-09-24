import { iotApi } from "../../api/iotApi";

export class EquipoService {
  static crearEquipo = async (payload) => {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post("/equipos", payload);
      const datos = resp.data;
      console.log("Datos del equipo creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el equipo";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static cargarEquipos = async () => {
    try {
      const resp = await iotApi.get(`/equipos`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los equipos";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static cargarEquiposByDependencia = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/dependencia`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear las Siembras";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  static cargarEquipoHv = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/hv`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear las Siembras";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
