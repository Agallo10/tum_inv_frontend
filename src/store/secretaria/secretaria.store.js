import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SecretariaService } from "../../services/secretarias/secretarias.service";

///////////////////////////////////////////////////////////////
const secretariasApi = (set) => ({
  secretarias: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadSecretarias: async () => {
    try {
      const { ok, datos } = await SecretariaService.startLoadSecretaria();
      if (!ok) {
        set({ secretarias: undefined });
        return false;
      }
      set({ secretarias: datos });
      localStorage.setItem("secretarias", datos);
      return datos;
    } catch (error) {
      throw "Secretarias no cargadas";
    }
  },
  ///////////////////////////////////////////////////////////////
  createSecretaria: async (secretaria) => {
    const { ok, datos, errorMessage } = await SecretariaService.createSecretaria(secretaria);
    if (!ok) throw errorMessage || "Error al crear secretaría";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
  updateSecretaria: async (id, secretaria) => {
    const { ok, datos, errorMessage } = await SecretariaService.updateSecretaria(id, secretaria);
    if (!ok) throw errorMessage || "Error al actualizar secretaría";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
  deleteSecretaria: async (id) => {
    const { ok, datos, errorMessage } = await SecretariaService.deleteSecretaria(id);
    if (!ok) throw errorMessage || "Error al eliminar secretaría";
    return datos;
  },
  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const SecretariaStore = create()(
  devtools(persist(secretariasApi, { name: "secretarias" }))
);
/////////////////////////////////////////////////////////////////
