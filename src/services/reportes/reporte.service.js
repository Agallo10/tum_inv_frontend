import { iotApi } from "../../api/iotApi";

export class ReporteService {
  static crearReporte = async (payload) => {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post("/reportes-servicio/completo", payload);
      const datos = resp.data;
      console.log("Datos del reporte creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el reporte";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static cargarReportes = async () => {
    try {
      const resp = await iotApi.get(`/reportes-servicio`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los reportes";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static cargarReportesByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/reportes-servicio`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar los reportes";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
