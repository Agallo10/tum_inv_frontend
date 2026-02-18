import { SoftwareStore } from "../../store/index";

export const useSoftwareStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createSoftware = SoftwareStore((state) => state.crearSoftware);
  const getAllSoftware = SoftwareStore((state) => state.startLoadAllSoftware);
  const getAllSoftwareByEquipos = SoftwareStore(
    (state) => state.startLoadAllSoftwareByEquipos
  );
  const actualizarSoftwareStore = SoftwareStore(
    (state) => state.actualizarSoftware
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarAllSoftware = async () => {
    const datos = await getAllSoftware();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarAllSoftwareByEquipos = async (id) => {
    const datos = await getAllSoftwareByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearSoftware = async (payload) => {
    const ok = await createSoftware(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const actualizarSoftware = async (id, payload) => {
    const ok = await actualizarSoftwareStore(id, payload);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  return {
    cargarAllSoftware,
    cargarAllSoftwareByEquipos,
    crearSoftware,
    actualizarSoftware,
  };
  ////////////////////////////////////////////////////////////////
};
