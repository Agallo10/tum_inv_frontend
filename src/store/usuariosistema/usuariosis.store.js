import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UsuarioSistemaService } from "../../services/usuariosistema/usuariosis.service";

///////////////////////////////////////////////////////////////
const usuarioSistemaApi = (set) => ({
  usuariosSistema: undefined,
  usuariosSistemaByEq: undefined,
  ///////////////////////////////////////////////////////////////
  startLoadUsuariosSistema: async () => {
    try {
      const { ok, datos } = await UsuarioSistemaService.getAllUsuariosSistema();
      // console.log(datos);
      if (!ok) {
        set({ usuariosSistema: undefined });
        return false;
      }
      set({ usuariosSistema: datos });
      localStorage.setItem("usuariosSistema", datos);
      return datos;
    } catch (error) {
      throw "usuarios no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  startLoadUsuariosSistemaByEquipos: async (id) => {
    try {
      const { ok, datos } =
        await UsuarioSistemaService.getAllUsuariosSistemaByEquipos(id);
      // console.log(datos);
      if (!ok) {
        set({ usuariosSistemaByEq: undefined });
        return false;
      }
      set({ usuariosSistemaByEq: datos });
      localStorage.setItem("usuariosSistema-equipo", datos);
      return datos;
    } catch (error) {
      throw "usuarios no cargados";
    }
  },
  ///////////////////////////////////////////////////////////////
  crearUsuarioSistema: async (payload) => {
    try {
      console.log("Payload de createUsuarioSistema:", payload);
      const { ok, datos } =
        await UsuarioSistemaService.createUsuarioSistema(payload);
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
export const UsuarioSistemaStore = create()(
  devtools(persist(usuarioSistemaApi, { name: "usuarioSistema" }))
);
/////////////////////////////////////////////////////////////////
