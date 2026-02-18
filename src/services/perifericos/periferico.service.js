import { iotApi } from "../../api/iotApi";

export class PerifericoService {
  static crearPeriferico = async (payload) => {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post("/perifericos", payload);
      const datos = resp.data;
      console.log("Datos del periferico creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el periferico";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static cargarPerifericos = async () => {
    try {
      const resp = await iotApi.get(`/perifericos`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los perifericos";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static cargarPerifericosByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/perifericos`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar las perifericos";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  static actualizarPeriferico = async (id, payload) => {
    try {
      const resp = await iotApi.put(`/perifericos/${id}`, payload);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo actualizar el periférico" };
    }
  };

  static cargarPerifericosSinEquipo = async () => {
    try {
      const resp = await iotApi.get("/perifericos/sin-equipo");
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudieron cargar los periféricos sin equipo" };
    }
  };

  static asignarEquipo = async (perifericoId, equipoId) => {
    try {
      const resp = await iotApi.patch(`/perifericos/${perifericoId}/asignar-equipo`, {
        EquipoID: equipoId,
      });
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo asignar el equipo al periférico" };
    }
  };
}
