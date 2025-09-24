import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UsuarioResponsableService } from "../../services/usuariosresponsables/usuariores.service";

///////////////////////////////////////////////////////////////
const usuarioResponsableApi = (set) => ({
  usuarios: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadUsuarioResponsables: async (uid) => {
    try {
      const { ok, datos } =
        await UsuarioResponsableService.cargarUsuarioResponsables();
      // console.log(datos);
      if (!ok) {
        set({ usuarios: undefined });
        return false;
      }
      set({ usuarios: datos });
      localStorage.setItem("usuarios-responsables", datos);
      return datos;
    } catch (error) {
      throw "UsuarioResponsables no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadUsuariosResponsablesByDependencia: async (id) => {
    try {
      const { ok, datos } =
        await UsuarioResponsableService.cargarUsuarioResponsablesByDependencia(
          id
        );
      // console.log(datos);
      if (!ok) {
        set({ usuarios: undefined });
        return false;
      }
      set({ usuarios: datos });
      localStorage.setItem("usuarios-res-dependencia", datos);
      return datos;
    } catch (error) {
      throw "UsuarioResponsables no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearUsuarioResponsable: async (payload) => {
    try {
      console.log("Payload de crearUsuarioResponsables:", payload);
      const { ok, datos } =
        await UsuarioResponsableService.crearUsuarioResponsable(payload);
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
export const UsuarioResponsableStore = create()(
  devtools(persist(usuarioResponsableApi, { name: "usuarioResponsable" }))
);
/////////////////////////////////////////////////////////////////
