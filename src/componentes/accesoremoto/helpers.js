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

  if (!formData.Usuario || formData.Usuario.trim() === "") {
    errors.Usuario = "El Usuario es obligatorio.";
  }

  if (!formData.Contrasena || formData.Contrasena.trim() === "") {
    errors.Contrasena = "La Contraseña es obligatoria.";
  }

  if (!formData.IDConexion || formData.IDConexion.trim() === "") {
    errors.IDConexion = "El id de Conexion es obligatorio.";
  }

  if (!formData.Plataforma || formData.Plataforma.trim() === "") {
    errors.Plataforma = "La Plataforma es obligatoria.";
  }

  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    Usuario: formData.Usuario.trim(),
    Contrasena: formData.Contrasena.trim(),
    IDConexion: formData.IDConexion.trim(),
    Plataforma: formData.Plataforma.trim(),
    EquipoID: parseInt(uid),
  };
};

export const opcionesPlataforma = [
  {
    label: "Plataforma",
    options: [
      { value: "AnyDesk", label: "AnyDesk" },
      { value: "Remoto", label: "Escritorio Remoto" },
      // { value: "Team vu", label: "Navegador Web" },
      // { value: "Otro", label: "Otro" },
    ],
  },
];
