import { DependenciaStore } from "../../store/dependencias/dependencia.store";

export const useDependenciaStore = () => {
  //Cargan las dependencias
  const dependencias = DependenciaStore((state) => state.startLoadDependencias);
  const dependenciasBysecretaria = DependenciaStore(
    (state) => state.startLoadDependenciasBySecretaria
  );

  const idSecretaria = JSON.parse(localStorage.getItem("secretaria-id"));

  const cargarDependencias = async () => {
    try {
      const infoDependencias = await dependencias();

      return infoDependencias;
    } catch (error) {
      console.error("Error al cargar dependencias:", error);
      throw error; // Opcionalmente volver a lanzar el error para un manejo adicional
    }
  };

  const cargarDependenciasBySecretaria = async () => {
    try {
      const infoDependenciasBysecretaria =
        await dependenciasBysecretaria(idSecretaria);

      return infoDependenciasBysecretaria;
    } catch (error) {
      console.error("Error al cargar dependencias:", error);
      throw error; // Opcionalmente volver a lanzar el error para un manejo adicional
    }
  };

  return { cargarDependencias, cargarDependenciasBySecretaria };
};
