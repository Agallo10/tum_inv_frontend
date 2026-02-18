import { SecretariaStore } from "../../store/secretaria/secretaria.store";

export const useSecretariaStore = () => {
  const secretarias = SecretariaStore((state) => state.startLoadSecretarias);
  const crearSecretaria = SecretariaStore((state) => state.createSecretaria);
  const actualizarSecretaria = SecretariaStore((state) => state.updateSecretaria);
  const eliminarSecretaria = SecretariaStore((state) => state.deleteSecretaria);

  const cargarSecretarias = async () => {
    try {
      const infoSecretarias = await secretarias();
      return infoSecretarias;
    } catch (error) {
      console.error("Error al cargar secretarias:", error);
      throw error;
    }
  };

  return { cargarSecretarias, crearSecretaria, actualizarSecretaria, eliminarSecretaria };
};
