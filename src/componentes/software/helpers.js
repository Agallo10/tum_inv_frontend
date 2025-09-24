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

  if (!formData.Nombre || formData.Nombre.trim() === "") {
    errors.Nombre = "El Nombre es obligatorio.";
  }

  if (!formData.Version || formData.Version.trim() === "") {
    errors.Version = "La Version es obligatoria.";
  }

  if (!formData.TipoLicencia || formData.TipoLicencia.trim() === "") {
    errors.TipoLicencia = "El Tipo de Licencia es obligatorio.";
  }

  if (!formData.Categoria || formData.Categoria.trim() === "") {
    errors.Categoria = "La Categoria de Serial es obligatoria.";
  }

  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    Nombre: formData.Nombre.trim(),
    Version: formData.Version.trim(),
    TipoLicencia: formData.TipoLicencia.trim(),
    Categoria: formData.Categoria.trim(),
    EquipoID: parseInt(uid),
  };
};

export const opcionesCategoria = [
  {
    label: "Categoria",
    options: [
      { value: "Sistema Operativo", label: "Sistema Operativo" },
      { value: "Paquete de Oficina", label: "Paquete de Oficina" },
      { value: "Navegador Web", label: "Navegador Web" },
      { value: "Otro", label: "Otro" },
    ],
  },
];
