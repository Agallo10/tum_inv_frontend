import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { PerifericoService } from "../../services/perifericos/periferico.service";

///////////////////////////////////////////////////////////////
const perifericoApi = (set) => ({
  perifericos: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadPerifericos: async () => {
    try {
      const { ok, datos } = await PerifericoService.cargarPerifericos();
      // console.log(datos);
      if (!ok) {
        set({ perifericos: undefined });
        return false;
      }
      set({ perifericos: datos });
      localStorage.setItem("perifericos", datos);
      return datos;
    } catch (error) {
      throw "Perifericos no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadPerifericosByEquipos: async (id) => {
    try {
      const { ok, datos } =
        await PerifericoService.cargarPerifericosByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ perifericos: undefined });
        return false;
      }
      set({ perifericos: datos });
      localStorage.setItem("perifericos-equipo", datos);
      return datos;
    } catch (error) {
      throw "Perifericos no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearPerifericos: async (payload) => {
    try {
      console.log("Payload de crearPerifericos:", payload);
      const { ok, datos } = await PerifericoService.crearPeriferico(payload);
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
  actualizarPeriferico: async (id, payload) => {
    const { ok, errorMessage } = await PerifericoService.actualizarPeriferico(id, payload);
    if (!ok) throw errorMessage || "Error al actualizar periférico";
    return ok;
  },
  ///////////////////////////////////////////////////////////////
  startLoadPerifericosSinEquipo: async () => {
    try {
      const { ok, datos } = await PerifericoService.cargarPerifericosSinEquipo();
      if (!ok) return [];
      return datos || [];
    } catch (error) {
      console.error("Error cargando periféricos sin equipo:", error);
      return [];
    }
  },
  ///////////////////////////////////////////////////////////////
  asignarEquipo: async (perifericoId, equipoId) => {
    const { ok, errorMessage } = await PerifericoService.asignarEquipo(perifericoId, equipoId);
    if (!ok) throw errorMessage || "Error al asignar equipo";
    return ok;
  },
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const PerifericoStore = create()(
  devtools(persist(perifericoApi, { name: "periferico" }))
);
/////////////////////////////////////////////////////////////////
