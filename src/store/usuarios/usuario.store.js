import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UsuarioService } from "../../services/usuarios/usuario.service";

///////////////////////////////////////////////////////////////
const usuariosApi = (set) => ({
  usuarios: undefined,
  usuarioSeleccionado: undefined,
  isLoading: false,
  error: null,

  ///////////////////////////////////////////////////////////////
  /**
   * Cargar todos los usuarios
   */
  startLoadUsuarios: async () => {
    try {
      set({ isLoading: true, error: null });
      const { ok, datos, errorMessage } = await UsuarioService.cargarUsuarios();
      
      if (!ok) {
        set({ usuarios: undefined, isLoading: false, error: errorMessage });
        return { ok: false, errorMessage };
      }
      
      set({ usuarios: datos, isLoading: false });
      return { ok: true, datos };
    } catch (error) {
      set({ isLoading: false, error: "Error al cargar usuarios" });
      return { ok: false, errorMessage: "Error al cargar usuarios" };
    }
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Crear un nuevo usuario
   */
  crearUsuario: async (payload) => {
    try {
      set({ isLoading: true, error: null });
      const { ok, datos, errorMessage } = await UsuarioService.crearUsuario(payload);
      
      if (!ok) {
        set({ isLoading: false, error: errorMessage });
        return { ok: false, errorMessage };
      }
      
      set({ isLoading: false });
      return { ok: true, datos };
    } catch (error) {
      set({ isLoading: false, error: "Error al crear usuario" });
      return { ok: false, errorMessage: "Error al crear usuario" };
    }
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Actualizar un usuario existente
   */
  actualizarUsuario: async (id, payload) => {
    try {
      set({ isLoading: true, error: null });
      const { ok, datos, errorMessage } = await UsuarioService.actualizarUsuario(id, payload);
      
      if (!ok) {
        set({ isLoading: false, error: errorMessage });
        return { ok: false, errorMessage };
      }
      
      set({ isLoading: false });
      return { ok: true, datos };
    } catch (error) {
      set({ isLoading: false, error: "Error al actualizar usuario" });
      return { ok: false, errorMessage: "Error al actualizar usuario" };
    }
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Eliminar un usuario
   */
  eliminarUsuario: async (id) => {
    try {
      set({ isLoading: true, error: null });
      const { ok, datos, errorMessage } = await UsuarioService.eliminarUsuario(id);
      
      if (!ok) {
        set({ isLoading: false, error: errorMessage });
        return { ok: false, errorMessage };
      }
      
      set({ isLoading: false });
      return { ok: true, datos };
    } catch (error) {
      set({ isLoading: false, error: "Error al eliminar usuario" });
      return { ok: false, errorMessage: "Error al eliminar usuario" };
    }
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Seleccionar un usuario para editar
   */
  setUsuarioSeleccionado: (usuario) => {
    set({ usuarioSeleccionado: usuario });
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Limpiar usuario seleccionado
   */
  clearUsuarioSeleccionado: () => {
    set({ usuarioSeleccionado: undefined });
  },

  ///////////////////////////////////////////////////////////////
  /**
   * Limpiar error
   */
  clearError: () => {
    set({ error: null });
  },
});

///////////////////////////////////////////////////////////////
export const UsuarioStore = create()(
  devtools(persist(usuariosApi, { name: "usuarios-sistema" }))
);
/////////////////////////////////////////////////////////////////
