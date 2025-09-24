import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { ConfigRedService } from "../../services/configuracionred/configred.service";

///////////////////////////////////////////////////////////////
const configRedApi = (set) => ({
  allConfigRed: undefined,
  allConfigRedByEq: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadAllConfigRed: async () => {
    try {
      const { ok, datos } = await ConfigRedService.getAllConfigRed();
      // console.log(datos);
      if (!ok) {
        set({ allConfigRed: undefined });
        return false;
      }
      set({ allConfigRed: datos });
      localStorage.setItem("allConfigRed", datos);
      return datos;
    } catch (error) {
      throw "Configuracion de red no cargada";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadAllConfigRedByEquipos: async (id) => {
    try {
      const { ok, datos } = await ConfigRedService.getAllConfigRedByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ allConfigRedByEq: undefined });
        return false;
      }
      set({ allConfigRedByEq: datos });
      localStorage.setItem("allConfigRed-equipo", datos);
      return datos;
    } catch (error) {
      throw "Configuracion de red no cargada";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearConfigRed: async (payload) => {
    try {
      console.log("Payload de createConfigRed:", payload);
      const { ok, datos } = await ConfigRedService.createConfigRed(payload);
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

  updateConfigRed: async (payload, id) => {
    try {
      console.log("Payload de createConfigRed:", payload);
      const { ok, datos } = await ConfigRedService.updateConfigRed(payload, id);
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
export const ConfigRedStore = create()(
  devtools(persist(configRedApi, { name: "configRed" }))
);
/////////////////////////////////////////////////////////////////
