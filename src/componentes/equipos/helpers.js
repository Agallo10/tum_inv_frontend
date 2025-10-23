// helpers.js
/////////////////////////////////////////////////////////////////////////
// Retorna la fecha actual en formato YYYY-MM-DD
export const getFechaActual = () => {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0");
  const day = String(hoy.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};


// Valida los campos del formulario de equipo
export const validarFormularioEquipo = (formData) => {
  const errors = {};

  if (!formData.TipoDispositivo || formData.TipoDispositivo.trim() === "") {
    errors.TipoDispositivo = "El tipo de dispositivo es obligatoria.";
  }

  if (!formData.PlacaInventario || isNaN(formData.PlacaInventario)) {
    errors.numeroPlantulas = "Debe ingresar un numero valido de placa inventario.";
  }

  if (!formData.Marca || formData.Marca.trim() === "") {
    errors.Marca = "La marca del equipo es obligatoria.";
  }

  if (!formData.Serial || formData.Serial.trim() === "") {
    errors.Serial = "El numero del Serial es obligatorio.";
  }

  if (!formData.Modelo || formData.Modelo.trim() === "") {
    errors.Modelo = "El nombre del Modelo es obligatorio.";
  }

  if (!formData.UsuarioResponsableID || isNaN(formData.UsuarioResponsableID)) {
    errors.UsuarioResponsableID = "El usuario responsable es obligatorio.";
  }
  if (!formData.EstadoEquipoID || isNaN(formData.EstadoEquipoID)) {
    errors.EstadoEquipoID = "El estado del equipo es obligatorio.";
  }

  return errors;
};

// Construye el objeto payload que se enviará al backend
export const construirPayloadEquipo = (formData, uid, fechaDefault) => {
  return {
    // FechaDiligenciamiento: formData.fecha || fechaDefault,
    TipoDispositivo: formData.TipoDispositivo.trim(),
    PlacaInventario: formData.PlacaInventario.trim(),
    Marca: formData.Marca.trim(),
    Serial: formData.Serial.trim(),
    Modelo: formData.Modelo.trim(),
    UsuarioResponsableID: parseInt(formData.UsuarioResponsableID) || 0,
    EstadoEquipoID: parseInt(formData.EstadoEquipoID) || 0,
    ObservacionesGenerales: formData.ObservacionesGenerales.trim()
  };
};

export const opcionesTipoEquipo = [
  {
    label: "TipoDispositivo",
    options: [
      { value: "Todo en Uno", label: "Todo en Uno" },
      { value: "Escritorio", label: "Escritorio" },
      { value: "Portátil", label: "Portátil" },
      { value: "Impresora", label: "Impresora" },
      { value: "Escáner", label: "Escáner" },
      { value: "Otro", label: "Otro" },
    ],
  },
];
