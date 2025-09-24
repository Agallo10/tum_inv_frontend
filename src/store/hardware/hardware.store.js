import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { HardwareService } from "../../services/hardware/hardware.service";

///////////////////////////////////////////////////////////////
const hardwareApi = (set) => ({
  allHardware: undefined,
  allHardwareByEq: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadAllHardware: async () => {
    try {
      const { ok, datos } = await HardwareService.getAllHardware();
      // console.log(datos);
      if (!ok) {
        set({ allHardware: undefined });
        return false;
      }
      set({ allHardware: datos });
      localStorage.setItem("allHardware", datos);
      return datos;
    } catch (error) {
      throw "Hardware no cargado";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadAllHardwareByEquipos: async (id) => {
    try {
      const { ok, datos } = await HardwareService.getAllHardwareByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ allHardwareByEq: undefined });
        return false;
      }
      set({ allHardwareByEq: datos });
      localStorage.setItem("allHardware-equipo", datos);
      return datos;
    } catch (error) {
      throw "Hardware no cargado";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearHardware: async (payload) => {
    try {
      console.log("Payload de crearHardware:", payload);
      const { ok, datos } = await HardwareService.createHardware(payload);
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
export const HardwareStore = create()(
  devtools(persist(hardwareApi, { name: "hardware" }))
);
/////////////////////////////////////////////////////////////////
