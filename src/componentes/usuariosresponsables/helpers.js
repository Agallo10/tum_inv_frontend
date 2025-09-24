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
export const validarFormularioUsuarios = (formData) => {
  const errors = {};

  if (!formData.NombresApellidos || formData.NombresApellidos.trim() === "") {
    errors.NombresApellidos = "El tipo de nombre completo es obligatorio.";
  }

  if (!formData.Cedula || formData.Cedula.trim() === "") {
    errors.Cedula = "La Cedula es obligatoria.";
  }

  if (!formData.CorreoPersonal || formData.CorreoPersonal.trim() === "") {
    errors.CorreoPersonal = "El correo personal es obligatorio.";
  }

  if (!formData.TipoVinculacion || formData.TipoVinculacion.trim() === "") {
    errors.TipoVinculacion = "El Tipo de vinculacion es obligatorio.";
  }

  if (!formData.Celular || formData.Celular.trim() === "") {
    errors.Celular = "El numero de Celular es obligatorio.";
  }

  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayloadUsuario = (formData, uid) => {
  return {
    NombresApellidos: formData.NombresApellidos.trim(),
    Cedula: formData.Cedula.trim(),
    CorreoPersonal: formData.CorreoPersonal.trim(),
    TipoVinculacion: formData.TipoVinculacion.trim(),
    Celular: formData.Celular.trim(),
    DependenciaID: parseInt(uid),
  };
};

export const opcionesTipoVinculacion = [
  {
    label: "TipoDispositivo",
    options: [
      { value: "Planta", label: "Planta" },
      { value: "Contratista", label: "Contratista" },
      { value: "Otro", label: "Otro" },
    ],
  },
];
