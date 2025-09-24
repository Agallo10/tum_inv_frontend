import { EquipoStore } from "../../store/index";

export const useEquipoStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const crearEquipos = EquipoStore((state) => state.crearEquipo);
  const startLoadEquipos = EquipoStore((state) => state.startLoadEquipos);
  const statrLoadEquiposByDependencia = EquipoStore(
    (state) => state.startLoadEquiposByDependencia
  );
  const startLoadEquipoHv = EquipoStore((state) => state.startLoadEquipoHv);

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarEquipos = async () => {
    const datos = await startLoadEquipos();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarEquiposByDependencia = async (id) => {
    const datos = await statrLoadEquiposByDependencia(id);
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarEquipoHv = async (id) => {
    const datos = await startLoadEquipoHv(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearEquipo = async (payload) => {
    const ok = await crearEquipos(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  return {
    cargarEquipos,
    cargarEquiposByDependencia,
    crearEquipo,
    cargarEquipoHv,
  };
  ////////////////////////////////////////////////////////////////
};
