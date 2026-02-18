import { EquipoStore } from "../../store/index";

export const useEquipoStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const crearEquipos = EquipoStore((state) => state.crearEquipo);
  const startLoadEquipos = EquipoStore((state) => state.startLoadEquipos);
  const statrLoadEquiposByDependencia = EquipoStore(
    (state) => state.startLoadEquiposByDependencia
  );
  const startLoadEquipoHv = EquipoStore((state) => state.startLoadEquipoHv);
  const startLoadEstadosEquipos = EquipoStore((state) => state.startLoadEstadosEquipos);
  const startLoadEquiposDetalle = EquipoStore(
    (state) => state.startLoadEquiposDetalle
  );
  const asignarResponsableStore = EquipoStore((state) => state.asignarResponsable);
  const actualizarEquipoStore = EquipoStore((state) => state.actualizarEquipo);
  const eliminarEquipoStore = EquipoStore((state) => state.eliminarEquipo);

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarEquipos = async () => {
    const datos = await startLoadEquipos();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarEquiposDetalle = async () => {
    const datos = await startLoadEquiposDetalle();
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
  const cargarEstadosEquipo = async () => {
    const datos = await startLoadEstadosEquipos();
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearEquipo = async (payload) => {
    const ok = await crearEquipos(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const actualizarEquipo = async (equipoId, payload) => {
    const ok = await actualizarEquipoStore(equipoId, payload);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const asignarResponsable = async (equipoId, usuarioResponsableId) => {
    const ok = await asignarResponsableStore(equipoId, usuarioResponsableId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const eliminarEquipo = async (equipoId) => {
    const ok = await eliminarEquipoStore(equipoId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  return {
    cargarEquipos,
    cargarEquiposByDependencia,
    crearEquipo,
    cargarEquipoHv,
    cargarEstadosEquipo,
    cargarEquiposDetalle,
    actualizarEquipo,
    asignarResponsable,
    eliminarEquipo,
  };
  ////////////////////////////////////////////////////////////////
};
