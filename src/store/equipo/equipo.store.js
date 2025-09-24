import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { EquipoService } from "../../services/equipos/equipo.service";

///////////////////////////////////////////////////////////////
const equipoApi = (set) => ({
  equipos: undefined,
  equipo: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadEquipos: async (uid) => {
    try {
      const { ok, datos } = await EquipoService.cargarEquipos();
      // console.log(datos);
      if (!ok) {
        set({ equipos: undefined });
        return false;
      }
      set({ equipos: datos });
      localStorage.setItem("equipos", datos);
      return datos;
    } catch (error) {
      throw "Equipos no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadEquiposByDependencia: async (id) => {
    try {
      const { ok, datos } = await EquipoService.cargarEquiposByDependencia(id);
      // console.log(datos);
      if (!ok) {
        set({ equipos: undefined });
        return false;
      }
      set({ equipos: datos });
      localStorage.setItem("equipos-dependencia", datos);
      return datos;
    } catch (error) {
      throw "Equipos no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadEquipoHv: async (id) => {
    try {
      const { ok, datos } = await EquipoService.cargarEquipoHv(id);
      // console.log(datos);
      if (!ok) {
        set({ equipo: undefined });
        return false;
      }
      set({ equipo: datos });
      localStorage.setItem("equipo-hv", datos);
      return datos;
    } catch (error) {
      throw "Equipo no cargado";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearEquipo: async (payload) => {
    try {
      console.log("Payload de crearEquipos:", payload);
      const { ok, datos } = await EquipoService.crearEquipo(payload);
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
export const EquipoStore = create()(
  devtools(persist(equipoApi, { name: "equipo" }))
);
/////////////////////////////////////////////////////////////////
