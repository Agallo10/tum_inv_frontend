import { iotApi } from "../../api/iotApi";

export class UsuarioResponsableService {
  static crearUsuarioResponsable = async (payload) => {
    // console.log('Payload de crearLabores:', payload);

    try {
      const resp = await iotApi.post("/usuarios-responsables", payload);
      const datos = resp.data;
      console.log("Datos del usuario responsable creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el usuario responsable";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static cargarUsuarioResponsables = async () => {
    try {
      const resp = await iotApi.get(`/usuarios-responsables`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los usuarios";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static cargarUsuarioResponsablesByDependencia = async (id) => {
    try {
      const resp = await iotApi.get(`/usuarios-responsables/${id}/dependencia`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los usuarios";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  static actualizarUsuarioResponsable = async (usuarioId, payload) => {
    try {
      const resp = await iotApi.put(`/usuarios-responsables/${usuarioId}`, payload);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo actualizar el usuario responsable" };
    }
  };

  static asignarDependencia = async (usuarioId, dependenciaId) => {
    try {
      const resp = await iotApi.patch(`/usuarios-responsables/${usuarioId}/asignar-dependencia`, {
        DependenciaID: dependenciaId,
      });
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: "No se pudo asignar la dependencia" };
    }
  };
}
