// helpers.js

/////////////////////////////////////////////////////////////////////////
// Retorna la fecha actual en formato YYYY-MM-DD
// export const getFechaActual = () => {
//   const hoy = new Date();
//   const year = hoy.getFullYear();
//   const month = String(hoy.getMonth() + 1).padStart(2, "0");
//   const day = String(hoy.getDate()).padStart(2, "0");
//   return `${year}-${month}-${day}`;
// };

// Valida los campos del formulario de usuarios
export const validarFormulario = (formData) => {
  const errors = {};

  if (!formData.DireccionIP || formData.DireccionIP.trim() === "") {
    errors.DireccionIP = "La DireccionIP es obligatoria.";
  }

  if (!formData.AsignacionIP || formData.AsignacionIP.trim() === "") {
    errors.AsignacionIP = "La Asignacion IP es obligatoria.";
  }

  if (!formData.Conectividad || formData.Conectividad.trim() === "") {
    errors.Conectividad = "La Conectividad es obligatoria.";
  }

  if (!formData.NombreDispositivo || formData.NombreDispositivo.trim() === "") {
    errors.NombreDispositivo = "El Nombre de Dispositivo es obligatorio.";
  }
  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    DireccionIP: formData.DireccionIP.trim(),
    AsignacionIP: formData.AsignacionIP.trim(),
    NombreDispositivo: formData.NombreDispositivo.trim(),
    Conectividad: formData.Conectividad.trim(),
    EquipoID: parseInt(uid),
  };
};

export const opcionesAsignacionIp = [
  {
    label: "Componente",
    options: [
      { value: "Manual", label: "Manual" },
      { value: "Automatica", label: "Automatica" },
      { value: "Dinamica", label: "Dinamica" },
      // { value: "Otro", label: "Otro" },
    ],
  },
];
