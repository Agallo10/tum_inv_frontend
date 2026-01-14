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
  ////////////////////////////////////////////////////////////////
  return {
    cargarReportes,
    cargarReportesByEquipos,
    crearReporte,
    descargarPdfReporte,
  };
  ////////////////////////////////////////////////////////////////
};
