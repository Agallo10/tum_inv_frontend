import { HardwareStore } from "../../store/index";

export const useHardwareStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createHardware = HardwareStore((state) => state.crearHardware);
  const getAllHardware = HardwareStore((state) => state.startLoadAllHardware);
  const getAllHardwareByEquipos = HardwareStore(
    (state) => state.startLoadAllHardwareByEquipos
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

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarAllHardware,
    cargarAllHardwareByEquipos,
    crearHardware,
  };
  ////////////////////////////////////////////////////////////////
};
