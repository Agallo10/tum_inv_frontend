import { iotApi } from "../../api/iotApi";

export class UsuarioService {
  /**
   * Cargar todos los usuarios del sistema
   */
  static cargarUsuarios = async () => {
    try {
      const resp = await iotApi.get("auth/users");
      // Manejar diferentes estructuras de respuesta
      let datos = resp.data;
      
      // Si viene envuelto en un objeto con propiedad usuarios, users, o data
      if (datos && !Array.isArray(datos)) {
        datos = datos.usuarios || datos.users || datos.data || [];
      }
      
      // Asegurar que siempre sea un array
      if (!Array.isArray(datos)) {
        datos = [];
      }
      
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      return {
        ok: false,
        errorMessage: error.response?.data?.message || "Error al cargar usuarios",
      };
    }
  };

  /**
   * Crear un nuevo usuario
   * @param {Object} payload - Datos del usuario
   * @param {string} payload.nombre - Nombre del usuario
   * @param {string} payload.apellido - Apellido del usuario
   * @param {string} payload.cedula - Cédula del usuario
   * @param {string} payload.email - Email del usuario
   * @param {string} payload.username - Username del usuario
   * @param {string} payload.password - Password del usuario
   * @param {string} payload.rol - Rol del usuario (admin, tecnico, usuario)
   */
  static crearUsuario = async (payload) => {
    try {
      const resp = await iotApi.post("auth/register", payload);
      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      console.error("Error al crear usuario:", error);
      return {
        ok: false,
        errorMessage: error.response?.data?.message || "Error al crear usuario",
      };
    }
  };

  /**
   * Actualizar un usuario existente
   * @param {string} id - ID del usuario
   * @param {Object} payload - Datos a actualizar
   */
  static actualizarUsuario = async (id, payload) => {
    try {
      const resp = await iotApi.put(`auth/users/${id}`, payload);
      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return {
        ok: false,
        errorMessage: error.response?.data?.message || "Error al actualizar usuario",
      };
    }
  };

  /**
   * Eliminar un usuario
   * @param {string} id - ID del usuario
   */
  static eliminarUsuario = async (id) => {
    try {
      const resp = await iotApi.delete(`auth/users/${id}`);
      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      return {
        ok: false,
        errorMessage: error.response?.data?.message || "Error al eliminar usuario",
      };
    }
  };
}
