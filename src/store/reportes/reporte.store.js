import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ReporteService } from "../../services/reportes/reporte.service";

///////////////////////////////////////////////////////////////
const reporteApi = (set) => ({
  reportes: undefined,
  reportesByequipos: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadReportes: async () => {
    try {
      const { ok, datos } = await ReporteService.cargarReportes();
      // console.log(datos);
      if (!ok) {
        set({ reportes: undefined });
        return false;
      }
      set({ reportes: datos });
      localStorage.setItem("reportes", datos);
      return datos;
    } catch (error) {
      throw "Reportes no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadReportesByEquipos: async (id) => {
    try {
      const { ok, datos } = await ReporteService.cargarReportesByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ reportesByequipos: undefined });
        return false;
      }
      set({ reportesByequipos: datos });
      localStorage.setItem("reportes-equipo", datos);
      return datos;
    } catch (error) {
      throw "Reportes no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearReportes: async (payload) => {
    try {
      console.log("Payload de crearReportes:", payload);
      const { ok, datos } = await ReporteService.crearReporte(payload);
      // console.log('Datos de la labor creada:', datos);
      console.log("Estado de la creación:", ok);
      if (!ok) {
        return ok;
      }
      return ok;
    } catch (error) {
      throw undefined;
    }
  },

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const ReporteStore = create()(
  devtools(persist(reporteApi, { name: "reportes" }))
);
/////////////////////////////////////////////////////////////////
