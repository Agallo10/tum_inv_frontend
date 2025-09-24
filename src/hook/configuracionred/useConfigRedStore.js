import { ConfigRedStore } from "../../store/index";

export const useConfigRedStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createConfigRed = ConfigRedStore((state) => state.crearConfigRed);
  const actualizarConfigRed = ConfigRedStore((state) => state.updateConfigRed);
  const getAllConfigRed = ConfigRedStore(
    (state) => state.startLoadAllConfigRed
  );
  const getAllConfigRedByEquipos = ConfigRedStore(
    (state) => state.startLoadAllConfigRedByEquipos
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarAllConfigRed = async () => {
    const datos = await getAllConfigRed();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarAllConfigRedByEquipos = async (id) => {
    const datos = await getAllConfigRedByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearConfigRed = async (payload) => {
    const ok = await createConfigRed(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const updateConfigRed = async (payload, id) => {
    const ok = await actualizarConfigRed(payload, id);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarAllConfigRed,
    cargarAllConfigRedByEquipos,
    crearConfigRed,
    updateConfigRed,
  };
  ////////////////////////////////////////////////////////////////
};
