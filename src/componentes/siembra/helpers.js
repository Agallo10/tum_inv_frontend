// helpers.js
export const opcionesCultivo = [
  {
    label: 'Variedad',
    options: [
      { value: 'Aguacate Hass', label: 'Aguacate Hass' },
    ],
  }
]
////////////////////////////////////////////////////
export const opcionesVariedad = [
  {
    label: 'Patrón',
    options: [
      { value: 'Criollo Antillano', label: 'Criollo Antillano' },
    ],
  }
]

/////////////////////////////////////////////////////////////////////////
// Retorna la fecha actual en formato YYYY-MM-DD
export const getFechaActual = () => {
  const hoy = new Date()
  const year = hoy.getFullYear()
  const month = String(hoy.getMonth() + 1).padStart(2, '0')
  const day = String(hoy.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Valida los campos del formulario de siembra
export const validarFormularioSiembra = (formData) => {
  const errors = {}

  if (!formData.variedad || formData.variedad.trim() === '') {
    errors.variedad = 'La variedad es obligatoria.'
  }

  if (!formData.numeroPlantulas || isNaN(formData.numeroPlantulas)) {
    errors.numeroPlantulas = 'Debe ingresar un número válido de plántulas.'
  }

  if (!formData.operario || formData.operario.trim() === '') {
    errors.operario = 'El nombre del operario es obligatorio.'
  }

  return errors
}

// Construye el objeto payload que se enviará al backend
export const construirPayloadSiembra = (formData, uid, fechaDefault) => {
  return {
    fechaSiembra: formData.fecha || fechaDefault,
    lote: parseInt(formData.lote) || 1,
    variedad: formData.variedad.trim(),
    patron: formData.patron.trim(),
    proveedorMaterial: formData.proveedorMaterial.trim(),
    numeroPlantulasSembradas: parseInt(formData.numeroPlantulas) || 0,
    numeroSiembraNueva: parseInt(formData.siembraNueva) || 0,
    numeroResiembra: parseInt(formData.resiembra) || 0,
    distanciaSiembra: {
      calle: parseFloat(formData.distanciaCalle) || 0,
      plantas: parseFloat(formData.distanciaPlanta) || 0,
    },
    operarioEncargado: formData.operario.trim(),
    uid,
  }
}
export const opcionesOperario = [
  { value: '', label: 'Seleccione' },
  { value: 'Gustavo Ruene', label: 'Gustavo Ruene' },
  { value: 'Weimar Obando', label: 'Weimar Obando' },
]