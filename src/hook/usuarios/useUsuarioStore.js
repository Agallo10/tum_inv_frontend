import { UsuarioStore } from "../../store/usuarios/usuario.store";
import { useNotificacion } from "../notificaciones/useNotificacion";

/**
 * Hook para manejar usuarios del sistema
 * Solo disponible para usuarios con rol admin
 */
export const useUsuarioStore = () => {
  // Store actions
  const startLoadUsuarios = UsuarioStore((state) => state.startLoadUsuarios);
  const crearUsuarioStore = UsuarioStore((state) => state.crearUsuario);
  const actualizarUsuarioStore = UsuarioStore((state) => state.actualizarUsuario);
  const eliminarUsuarioStore = UsuarioStore((state) => state.eliminarUsuario);
  const setUsuarioSeleccionado = UsuarioStore((state) => state.setUsuarioSeleccionado);
  const clearUsuarioSeleccionado = UsuarioStore((state) => state.clearUsuarioSeleccionado);
  
  // Store state
  const usuarios = UsuarioStore((state) => state.usuarios);
  const usuarioSeleccionado = UsuarioStore((state) => state.usuarioSeleccionado);
  const isLoading = UsuarioStore((state) => state.isLoading);
  const error = UsuarioStore((state) => state.error);

  // Notificaciones
  const { mostrarExito, mostrarError } = useNotificacion();

  /**
   * Cargar todos los usuarios
   */
  const cargarUsuarios = async () => {
    try {
      const result = await startLoadUsuarios();
      // Asegurar que siempre devuelva un array
      if (result.ok && Array.isArray(result.datos)) {
        return result.datos;
      }
      return [];
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      mostrarError("Error al cargar la lista de usuarios");
      return [];
    }
  };

  /**
   * Crear un nuevo usuario
   * @param {Object} payload - Datos del usuario
   */
  const crearUsuario = async (payload) => {
    try {
      const result = await crearUsuarioStore(payload);
      
      if (result.ok) {
        mostrarExito("Usuario creado correctamente", "¡Éxito!");
        return true;
      } else {
        mostrarError(result.errorMessage || "Error al crear el usuario");
        return false;
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      mostrarError("Error inesperado al crear el usuario");
      return false;
    }
  };

  /**
   * Actualizar un usuario existente
   * @param {string} id - ID del usuario
   * @param {Object} payload - Datos a actualizar
   */
  const actualizarUsuario = async (id, payload) => {
    try {
      const result = await actualizarUsuarioStore(id, payload);
      
      if (result.ok) {
        mostrarExito("Usuario actualizado correctamente", "¡Éxito!");
        return true;
      } else {
        mostrarError(result.errorMessage || "Error al actualizar el usuario");
        return false;
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      mostrarError("Error inesperado al actualizar el usuario");
      return false;
    }
  };

  /**
   * Eliminar un usuario
   * @param {string} id - ID del usuario
   */
  const eliminarUsuario = async (id) => {
    try {
      const result = await eliminarUsuarioStore(id);
      
      if (result.ok) {
        mostrarExito("Usuario eliminado correctamente", "¡Éxito!");
        return true;
      } else {
        mostrarError(result.errorMessage || "Error al eliminar el usuario");
        return false;
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      mostrarError("Error inesperado al eliminar el usuario");
      return false;
    }
  };

  return {
    // State
    usuarios,
    usuarioSeleccionado,
    isLoading,
    error,
    // Actions
    cargarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    setUsuarioSeleccionado,
    clearUsuarioSeleccionado,
  };
};
