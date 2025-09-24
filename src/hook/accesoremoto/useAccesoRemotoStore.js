import { AccesoRemotoStore } from "../../store/index";

export const useAccesoRemotoStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const createAccesoRemoto = AccesoRemotoStore(
    (state) => state.crearAccesoRemoto
  );
  const getAllAccesosRemotos = AccesoRemotoStore(
    (state) => state.startLoadAllAccesosRemotos
  );
  const getAllAccesosRemotosByEquipos = AccesoRemotoStore(
    (state) => state.startLoadAllAccesosRemotosByEquipos
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarAllAccesosRemotos = async () => {
    const datos = await getAllAccesosRemotos();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarAllAccesosRemotosByEquipos = async (id) => {
    const datos = await getAllAccesosRemotosByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearAccesoRemoto = async (payload) => {
    const ok = await createAccesoRemoto(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarAllAccesosRemotos,
    cargarAllAccesosRemotosByEquipos,
    crearAccesoRemoto,
  };
  ////////////////////////////////////////////////////////////////
};
