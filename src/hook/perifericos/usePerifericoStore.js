import { PerifericoStore } from "../../store/index";

export const usePerifericoStore = () => {
  //SE CARGAN LOS PROYECTOS, OPERADORES, ADMINISTRADORES DE OPERADORES

  const crearPerifericos = PerifericoStore((state) => state.crearPerifericos);
  const startLoadPerifericos = PerifericoStore(
    (state) => state.startLoadPerifericos
  );
  const startLoadPerifericosByEquipos = PerifericoStore(
    (state) => state.startLoadPerifericosByEquipos
  );
  const actualizarPerifericoStore = PerifericoStore(
    (state) => state.actualizarPeriferico
  );
  const startLoadPerifericosSinEquipo = PerifericoStore(
    (state) => state.startLoadPerifericosSinEquipo
  );
  const asignarEquipoStore = PerifericoStore(
    (state) => state.asignarEquipo
  );

  /////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  const cargarPerifericos = async () => {
    const datos = await startLoadPerifericos();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const cargarPerifericosByEquipos = async (id) => {
    const datos = await startLoadPerifericosByEquipos(id);
    return datos;
  };

  ////////////////////////////////////////////////////////////////
  const crearPeriferico = async (payload) => {
    const ok = await crearPerifericos(payload);
    // console.log('Estado de la creación:', ok);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const actualizarPeriferico = async (id, payload) => {
    const ok = await actualizarPerifericoStore(id, payload);
    return ok;
  };
  ////////////////////////////////////////////////////////////////
  const cargarPerifericosSinEquipo = async () => {
    const datos = await startLoadPerifericosSinEquipo();
    return datos;
  };
  ////////////////////////////////////////////////////////////////
  const asignarEquipo = async (perifericoId, equipoId) => {
    const ok = await asignarEquipoStore(perifericoId, equipoId);
    return ok;
  };
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  return {
    cargarPerifericos,
    cargarPerifericosByEquipos,
    crearPeriferico,
    actualizarPeriferico,
    cargarPerifericosSinEquipo,
    asignarEquipo,
  };
  ////////////////////////////////////////////////////////////////
};
