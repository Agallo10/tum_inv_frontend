import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SoftwareService } from "../../services/software/software.service";

///////////////////////////////////////////////////////////////
const softwareApi = (set) => ({
  allSoftware: undefined,
  allSoftwareByEq: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadAllSoftware: async () => {
    try {
      const { ok, datos } = await SoftwareService.getAllSoftware();
      // console.log(datos);
      if (!ok) {
        set({ allSoftware: undefined });
        return false;
      }
      set({ allSoftware: datos });
      localStorage.setItem("allSoftware", datos);
      return datos;
    } catch (error) {
      throw "Software no cargado";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadAllSoftwareByEquipos: async (id) => {
    try {
      const { ok, datos } = await SoftwareService.getAllSoftwareByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ allSoftwareByEq: undefined });
        return false;
      }
      set({ allSoftwareByEq: datos });
      localStorage.setItem("allSoftware-equipo", datos);
      return datos;
    } catch (error) {
      throw "Software no cargado";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearSoftware: async (payload) => {
    try {
      console.log("Payload de crearSoftware:", payload);
      const { ok, datos } = await SoftwareService.createSoftware(payload);
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
export const SoftwareStore = create()(
  devtools(persist(softwareApi, { name: "software" }))
);
/////////////////////////////////////////////////////////////////
