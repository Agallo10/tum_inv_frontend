import React from "react";
import {
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import {
  cilCheckCircle,
  cilWarning,
  cilXCircle,
  cilInfo,
} from "@coreui/icons";
import { useNotificacion } from "../../hook/notificaciones/useNotificacion";

/**
 * Componente global para mostrar notificaciones Toast
 * Debe ser incluido en el layout principal (DefaultLayout.js)
 */
const ToastNotification = () => {
  const { toasts, removeToast } = useNotificacion();

  // Mapeo de tipos a colores e íconos
  const tipoConfig = {
    success: {
      color: "success",
      icon: cilCheckCircle,
      bgClass: "bg-success",
    },
    danger: {
      color: "danger",
      icon: cilXCircle,
      bgClass: "bg-danger",
    },
    warning: {
      color: "warning",
      icon: cilWarning,
      bgClass: "bg-warning",
    },
    info: {
      color: "info",
      icon: cilInfo,
      bgClass: "bg-info",
    },
  };

  return (
    <CToaster
      className="position-fixed p-3"
      placement="top-end"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => {
        const config = tipoConfig[toast.tipo] || tipoConfig.info;

        return (
          <CToast
            key={toast.id}
            visible={toast.visible}
            color={config.color}
            className="text-white align-items-center border-0"
            onClose={() => removeToast(toast.id)}
          >
            <div className="d-flex">
              <CToastBody className="d-flex align-items-center gap-2">
                <CIcon
                  icon={config.icon}
                  className="flex-shrink-0"
                  width={20}
                  height={20}
                />
                <div>
                  {toast.titulo && (
                    <strong className="me-2">{toast.titulo}</strong>
                  )}
                  <span>{toast.mensaje}</span>
                </div>
              </CToastBody>
              <CToastClose className="me-2 m-auto" white />
            </div>
          </CToast>
        );
      })}
    </CToaster>
  );
};

export default ToastNotification;
