import { NotificacionStore } from "../../store/notificaciones/notificacion.store";

/**
 * Hook para manejar notificaciones/toasts en la aplicación
 * 
 * Uso:
 * const { mostrarExito, mostrarError, mostrarAdvertencia, mostrarInfo } = useNotificacion();
 * 
 * // Mostrar notificación de éxito
 * mostrarExito("El reporte se creó correctamente");
 * 
 * // Mostrar notificación de error
 * mostrarError("No se pudo crear el reporte");
 * 
 * // Mostrar notificación de advertencia
 * mostrarAdvertencia("Complete todos los campos requeridos");
 * 
 * // Mostrar notificación informativa
 * mostrarInfo("Cargando datos...");
 */
export const useNotificacion = () => {
  const toasts = NotificacionStore((state) => state.toasts);
  const addToast = NotificacionStore((state) => state.addToast);
  const removeToast = NotificacionStore((state) => state.removeToast);
  const clearToasts = NotificacionStore((state) => state.clearToasts);
  const mostrarExito = NotificacionStore((state) => state.mostrarExito);
  const mostrarError = NotificacionStore((state) => state.mostrarError);
  const mostrarAdvertencia = NotificacionStore((state) => state.mostrarAdvertencia);
  const mostrarInfo = NotificacionStore((state) => state.mostrarInfo);

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    mostrarExito,
    mostrarError,
    mostrarAdvertencia,
    mostrarInfo,
  };
};
