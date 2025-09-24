import { UsuarioSistemaStore } from "../../store/index";

export const useUsuarioSistemaStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createUsuarioSistema = UsuarioSistemaStore(
    (state) => state.crearUsuarioSistema
  );
  const getUsuariosSistema = UsuarioSistemaStore(
    (state) => state.startLoadUsuariosSistema
  );
  const getUsuariosSistemaByEquipos = UsuarioSistemaStore(
    (state) => state.startLoadUsuariosSistemaByEquipos
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarUsuarioaSistema = async () => {
    const datos = await getUsuariosSistema();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarUsuarioaSistemaByEquipos = async (id) => {
    const datos = await getUsuariosSistemaByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearUsuarioSistema = async (payload) => {
    const ok = await createUsuarioSistema(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarUsuarioaSistema,
    cargarUsuarioaSistemaByEquipos,
    crearUsuarioSistema,
  };
  ////////////////////////////////////////////////////////////////
};
