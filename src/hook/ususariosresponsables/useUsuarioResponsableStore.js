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

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarUsuariosResponsables,
    cargarUsuariosResponsablesByDependencia,
    crearUsuarioResponsable,
  };
  ////////////////////////////////////////////////////////////////
};
