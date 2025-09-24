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

  if (!formData.PlacaInventario || formData.PlacaInventario.trim() === "") {
    errors.PlacaInventario = "La placa es obligatoria.";
  }

  if (!formData.Marca || formData.Marca.trim() === "") {
    errors.Marca = "La marca es obligatoria.";
  }

  if (!formData.TipoPeriferico || formData.TipoPeriferico.trim() === "") {
    errors.TipoPeriferico = "El Tipo de periferico es obligatorio.";
  }

  if (!formData.Serial || formData.Serial.trim() === "") {
    errors.Serial = "El numero de Serial es obligatorio.";
  }

  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayload = (formData, uid) => {
  return {
    PlacaInventario: formData.PlacaInventario.trim(),
    Marca: formData.Marca.trim(),
    TipoPeriferico: formData.TipoPeriferico.trim(),
    Serial: formData.Serial.trim(),
    EquipoID: parseInt(uid),
  };
};

export const opcionesTipoPeriferico = [
  {
    label: "TipoPeriferico",
    options: [
      { value: "Teclado", label: "Teclado" },
      { value: "Mouse", label: "Mouse" },
      { value: "Monitor", label: "Monitor" },
      { value: "Otros", label: "Otros" },
    ],
  },
];
