import { UsuarioResponsableStore } from "../../store/index";

export const useUsuarioResponsableStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const crearUsuariosResponsables = UsuarioResponsableStore(
    (state) => state.crearUsuarioResponsable
  );
  const startLoadUsuarioResponsables = UsuarioResponsableStore(
    (state) => state.startLoadUsuarioResponsables
  );
  const startLoadUsuariosResponsablesByDependencia = UsuarioResponsableStore(
    (state) => state.startLoadUsuariosResponsablesByDependencia
  );
  const asignarDependenciaStore = UsuarioResponsableStore(
    (state) => state.asignarDependencia
  );
  const actualizarUsuarioResponsableStore = UsuarioResponsableStore(
    (state) => state.actualizarUsuarioResponsable
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarUsuariosResponsables = async () => {
    const datos = await startLoadUsuarioResponsables();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarUsuariosResponsablesByDependencia = async (id) => {
    const datos = await startLoadUsuariosResponsablesByDependencia(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearUsuarioResponsable = async (payload) => {
    const ok = await crearUsuariosResponsables(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const actualizarUsuarioResponsable = async (usuarioId, payload) => {
    const ok = await actualizarUsuarioResponsableStore(usuarioId, payload);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const asignarDependencia = async (usuarioId, dependenciaId) => {
    const ok = await asignarDependenciaStore(usuarioId, dependenciaId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarUsuariosResponsables,
    cargarUsuariosResponsablesByDependencia,
    crearUsuarioResponsable,
    actualizarUsuarioResponsable,
    asignarDependencia,
  };
  ////////////////////////////////////////////////////////////////
};
