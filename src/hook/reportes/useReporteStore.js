import { ReporteStore } from "../../store/index";

export const useReporteStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const crearReportes = ReporteStore((state) => state.crearReportes);
  const startLoadReportes = ReporteStore(
    (state) => state.startLoadReportes
  );
  const startLoadReportesByEquipos = ReporteStore(
    (state) => state.startLoadReportesByEquipos
  );
  const descargarPdf = ReporteStore(
    (state) => state.descargarPdfReporte
  );
  const subirFirmadoStore = ReporteStore(
    (state) => state.subirFirmado
  );
  const descargarFirmadoStore = ReporteStore(
    (state) => state.descargarFirmado
  );
  const reabrirReporteStore = ReporteStore(
    (state) => state.reabrirReporte
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarReportes = async () => {
    const datos = await startLoadReportes();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarReportesByEquipos = async (id) => {
    const datos = await startLoadReportesByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearReporte = async (payload) => {
    const ok = await crearReportes(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const descargarPdfReporte = async (reporteId, usuarioId) => {
    const ok = await descargarPdf(reporteId, usuarioId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const subirFirmado = async (reporteId, archivo) => {
    const ok = await subirFirmadoStore(reporteId, archivo);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const descargarFirmado = async (reporteId) => {
    const ok = await descargarFirmadoStore(reporteId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const reabrirReporte = async (reporteId) => {
    const ok = await reabrirReporteStore(reporteId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  return {
    cargarReportes,
    cargarReportesByEquipos,
    crearReporte,
    descargarPdfReporte,
    subirFirmado,
    descargarFirmado,
    reabrirReporte,
  };
  ////////////////////////////////////////////////////////////////
};
