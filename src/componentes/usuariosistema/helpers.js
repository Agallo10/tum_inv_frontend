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

  if (!formData.NombreUsuario || formData.NombreUsuario.trim() === "") {
    errors.NombreUsuario = "El Componente es obligatorio.";
  }

  if (!formData.Contrasena || formData.Contrasena.trim() === "") {
    errors.Contrasena = "La Tecnologia es obligatoria.";
  }

  // if (
  //   !formData.EsAdministrador ||
  //   formData.EsAdministrador === null ||
  //   formData.EsAdministrador === undefined
  // ) {
  //   errors.EsAdministrador = "La Capacidad de Licencia es obligatoria.";
  // }
  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    NombreUsuario: formData.NombreUsuario.trim(),
    Contrasena: formData.Contrasena.trim(),
    EsAdministrador: formData.EsAdministrador,
    EquipoID: parseInt(uid),
  };
};

export const opcionesEsAdmin = [
  {
    label: "EsAdministrador",
    options: [
      { value: true, label: "Si" },
      { value: false, label: "No" },
      // { value: "Procesador", label: "Procesador" },
      // { value: "Otro", label: "Otro" },
    ],
  },
];
