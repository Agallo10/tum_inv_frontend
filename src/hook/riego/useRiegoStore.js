import { RiegoStore } from "../../store/index";

export const useRiegoStore = () => {
  const crearRiegos = RiegoStore((state) => state.crearRiego)
  const startLoadRiegos= RiegoStore((state) => state.startLoadRiegos)

  // 📦 Cargar todos los riegos por proyecto
  const cargarTodosRiegos = async (uid) => {
    const datos = await startLoadRiegos(uid)
    return datos
  }

  // ✅ Crear un nuevo registro de riego
  const crearRiego = async (payload) => {
    const ok = await crearRiegos(payload)
    return ok
  }

  return {
    crearRiego,
    cargarTodosRiegos,
  }
}
