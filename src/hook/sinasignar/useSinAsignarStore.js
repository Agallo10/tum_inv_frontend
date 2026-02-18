import { SinAsignarStore } from "../../store/sinasignar/sinasignar.store";

export const useSinAsignarStore = () => {
  const startLoadSinSecretaria = SinAsignarStore(
    (state) => state.startLoadSinSecretaria
  );

  const cargarSinSecretaria = async () => {
    const datos = await startLoadSinSecretaria();
    return datos;
  };

  return {
    cargarSinSecretaria,
  };
};
