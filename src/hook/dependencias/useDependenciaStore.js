import { DependenciaStore } from "../../store/dependencias/dependencia.store";

export const useDependenciaStore = () => {
  const dependencias = DependenciaStore((state) => state.startLoadDependencias);
  const dependenciasBysecretaria = DependenciaStore(
    (state) => state.startLoadDependenciasBySecretaria
  );
  const crearDependencia = DependenciaStore((state) => state.createDependencia);
  const actualizarDependencia = DependenciaStore((state) => state.updateDependencia);
  const eliminarDependencia = DependenciaStore((state) => state.deleteDependencia);

  const idSecretaria = JSON.parse(localStorage.getItem("secretaria-id"));

  const cargarDependencias = async () => {
    try {
      const infoDependencias = await dependencias();
      return infoDependencias;
    } catch (error) {
      console.error("Error al cargar dependencias:", error);
      throw error;
    }
  };

  const cargarDependenciasBySecretaria = async () => {
    try {
      const infoDependenciasBysecretaria =
        await dependenciasBysecretaria(idSecretaria);
      return infoDependenciasBysecretaria;
    } catch (error) {
      console.error("Error al cargar dependencias:", error);
      throw error;
    }
  };

  const cargarDependenciasBySecretariaUid = async (uid) => {
    try {
      const infoDependenciasBysecretaria =
        await dependenciasBysecretaria(uid);
      return infoDependenciasBysecretaria;
    } catch (error) {
      console.error("Error al cargar dependencias:", error);
      throw error;
    }
  };

  return {
    cargarDependencias,
    cargarDependenciasBySecretaria,
    cargarDependenciasBySecretariaUid,
    crearDependencia,
    actualizarDependencia,
    eliminarDependencia,
  };
};
