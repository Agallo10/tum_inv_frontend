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
        await DependenciaService.startLoadDependenciasBySecretaria(idSecretaria);
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
  createDependencia: async (dependencia) => {
    const { ok, datos, errorMessage } = await DependenciaService.createDependencia(dependencia);
    if (!ok) throw errorMessage || "Error al crear dependencia";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
  updateDependencia: async (id, dependencia) => {
    const { ok, datos, errorMessage } = await DependenciaService.updateDependencia(id, dependencia);
    if (!ok) throw errorMessage || "Error al actualizar dependencia";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
  deleteDependencia: async (id) => {
    const { ok, datos, errorMessage } = await DependenciaService.deleteDependencia(id);
    if (!ok) throw errorMessage || "Error al eliminar dependencia";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const DependenciaStore = create()(
  devtools(persist(dependenciasApi, { name: "dependencias" }))
);
/////////////////////////////////////////////////////////////////
