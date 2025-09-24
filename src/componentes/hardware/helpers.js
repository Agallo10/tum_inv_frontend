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

  if (!formData.Componente || formData.Componente.trim() === "") {
    errors.Componente = "El Componente es obligatorio.";
  }

  if (!formData.Tecnologia || formData.Tecnologia.trim() === "") {
    errors.Tecnologia = "La Tecnologia es obligatoria.";
  }

  if (!formData.Capacidad || formData.Capacidad.trim() === "") {
    errors.Capacidad = "La Capacidad de Licencia es obligatoria.";
  }
  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    Componente: formData.Componente.trim(),
    Tecnologia: formData.Tecnologia.trim(),
    Capacidad: formData.Capacidad.trim(),
    EquipoID: parseInt(uid),
  };
};

export const opcionesComponente = [
  {
    label: "Componente",
    options: [
      { value: "Disco Duro", label: "Disco Duro" },
      { value: "Memoria RAM", label: "Memoria RAM" },
      { value: "Procesador", label: "Procesador" },
      // { value: "Otro", label: "Otro" },
    ],
  },
];
