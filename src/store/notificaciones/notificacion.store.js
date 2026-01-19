import { create } from "zustand";
import { devtools } from "zustand/middleware";

///////////////////////////////////////////////////////////////
// Store para manejar notificaciones/toasts globales
///////////////////////////////////////////////////////////////

const notificacionApi = (set, get) => ({
  toasts: [],

  ///////////////////////////////////////////////////////////////
  // Agregar una nueva notificación
  addToast: ({ tipo = "info", titulo = "", mensaje = "", duracion = 5000 }) => {
    const id = Date.now();
    const nuevoToast = {
      id,
      tipo, // 'success' | 'danger' | 'warning' | 'info'
      titulo,
      mensaje,
      duracion,
      visible: true,
    };

    set((state) => ({
      toasts: [...state.toasts, nuevoToast],
    }));

    // Auto-ocultar después de la duración especificada
    if (duracion > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duracion);
    }

    return id;
  },

  ///////////////////////////////////////////////////////////////
  // Remover una notificación por ID
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  ///////////////////////////////////////////////////////////////
  // Limpiar todas las notificaciones
  clearToasts: () => {
    set({ toasts: [] });
  },

  ///////////////////////////////////////////////////////////////
  // Métodos de conveniencia para diferentes tipos de notificaciones
  ///////////////////////////////////////////////////////////////

  mostrarExito: (mensaje, titulo = "¡Éxito!") => {
    return get().addToast({
      tipo: "success",
      titulo,
      mensaje,
      duracion: 4000,
    });
  },

  mostrarError: (mensaje, titulo = "Error") => {
    return get().addToast({
      tipo: "danger",
      titulo,
      mensaje,
      duracion: 6000,
    });
  },

  mostrarAdvertencia: (mensaje, titulo = "Advertencia") => {
    return get().addToast({
      tipo: "warning",
      titulo,
      mensaje,
      duracion: 5000,
    });
  },

  mostrarInfo: (mensaje, titulo = "Información") => {
    return get().addToast({
      tipo: "info",
      titulo,
      mensaje,
      duracion: 4000,
    });
  },
});

///////////////////////////////////////////////////////////////
export const NotificacionStore = create()(
  devtools(notificacionApi, { name: "notificaciones" })
);
/////////////////////////////////////////////////////////////////
