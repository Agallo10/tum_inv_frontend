import { HardwareStore } from "../../store/index";

export const useHardwareStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createHardware = HardwareStore((state) => state.crearHardware);
  const getAllHardware = HardwareStore((state) => state.startLoadAllHardware);
  const getAllHardwareByEquipos = HardwareStore(
    (state) => state.startLoadAllHardwareByEquipos
  );
  const actualizarHardwareStore = HardwareStore(
    (state) => state.actualizarHardware
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarAllHardware = async () => {
    const datos = await getAllHardware();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarAllHardwareByEquipos = async (id) => {
    const datos = await getAllHardwareByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearHardware = async (payload) => {
    const ok = await createHardware(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const actualizarHardware = async (id, payload) => {
    const ok = await actualizarHardwareStore(id, payload);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  return {
    cargarAllHardware,
    cargarAllHardwareByEquipos,
    crearHardware,
    actualizarHardware,
  };
  ////////////////////////////////////////////////////////////////
};
