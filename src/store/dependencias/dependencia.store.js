import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DependenciaService } from "../../services/dependencias/dependencias.services";

///////////////////////////////////////////////////////////////
const dependenciasApi = (set) => ({
  dependencias: undefined,
  dependenciasBySecretaria: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadDependencias: async () => {
    try {
      const { ok, datos } = await DependenciaService.startLoadDependencias();
      // console.log(datos);
      if (!ok) {
        set({ dependencias: undefined });
        return false;
      }
      set({ dependencias: datos });
      localStorage.setItem("dependencias", datos);
      return datos;
    } catch (error) {
      throw "Dependencias no cargadas";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadDependenciasBySecretaria: async (idSecretaria) => {
    try {
      const { ok, datos } =
        await DependenciaService.startLoadDependenciasBySecretaria(
          idSecretaria
        );
      // console.log(datos);
      if (!ok) {
        set({ dependenciasBySecretaria: undefined });
        return false;
      }
      set({ dependenciasBySecretaria: datos });
      localStorage.setItem("dependenciasBySecretaria", datos);
      return datos;
    } catch (error) {
      throw "Dependencias por secretaria no cargadas";
    }
  },
  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const DependenciaStore = create()(
  devtools(persist(dependenciasApi, { name: "dependencias" }))
);
/////////////////////////////////////////////////////////////////
