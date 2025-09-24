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
      // console.log(datos);
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

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const SecretariaStore = create()(
  devtools(persist(secretariasApi, { name: "secretarias" }))
);
/////////////////////////////////////////////////////////////////
