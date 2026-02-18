import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SinAsignarService } from "../../services/sinasignar/sinasignar.service";

const sinAsignarApi = (set) => ({
  equiposSinSecretaria: [],
  usuariosSinSecretaria: [],

  startLoadSinSecretaria: async () => {
    try {
      const { ok, datos } = await SinAsignarService.cargarSinSecretaria();
      if (!ok) {
        set({ equiposSinSecretaria: [], usuariosSinSecretaria: [] });
        return { equipos: [], usuarios: [] };
      }
      set({
        equiposSinSecretaria: datos.equipos || [],
        usuariosSinSecretaria: datos.usuarios || [],
      });
      return datos;
    } catch (error) {
      console.error("Error cargando datos sin secretaría:", error);
      set({ equiposSinSecretaria: [], usuariosSinSecretaria: [] });
      return { equipos: [], usuarios: [] };
    }
  },
});

export const SinAsignarStore = create()(
  devtools(sinAsignarApi, { name: "sinAsignar" })
);
