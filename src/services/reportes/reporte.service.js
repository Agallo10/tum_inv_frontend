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
      const resp = await iotApi.get(`/equipos/${id}/reportes-servicio/resumen`);
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
  ///////////////////////////////////////////////////////////////////
  static descargarPdfReporte = async (reporteId, usuarioId) => {
    try {
      const resp = await iotApi.get(
        `/reportes-servicio/${reporteId}/pdf?usuario_id=${usuarioId}`,
        { responseType: 'blob' }
      );
      
      // Crear URL del blob y descargar
      const url = window.URL.createObjectURL(new Blob([resp.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_servicio_${reporteId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      return {
        ok: true,
      };
    } catch (error) {
      const errorMessage = "No se pudo descargar el PDF del reporte";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static subirFirmado = async (reporteId, archivo) => {
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      const resp = await iotApi.post(
        `/reportes-servicio/${reporteId}/subir-firmado`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo subir el PDF firmado" };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static descargarFirmado = async (reporteId) => {
    try {
      const resp = await iotApi.get(`/reportes-servicio/${reporteId}/descargar-firmado`);
      const { url } = resp.data;
      // Abrir en nueva pestaña para descargar
      window.open(url, '_blank');
      return { ok: true };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo descargar el PDF firmado" };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static reabrirReporte = async (reporteId) => {
    try {
      const resp = await iotApi.post(`/reportes-servicio/${reporteId}/reabrir`);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo reabrir el reporte" };
    }
  };
}
