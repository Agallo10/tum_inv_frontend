// helpers.js
export const opcionesRiego = [
  {
    label: 'Riego',
    options: [
      { value: 'Microasperción', label: 'Microasperción' },
      { value: 'Goteo', label: 'Goteo' },
    ],
  }
]
export const calcularAguaTotal = (numeroPlantas, tiempoRiego, descargaDifusor) => {
  const plantas = parseFloat(numeroPlantas)
  const tiempo = parseFloat(tiempoRiego)
  const descarga = parseFloat(descargaDifusor)

  if (isNaN(plantas) || isNaN(tiempo) || isNaN(descarga)) return ''

  return (plantas * tiempo * descarga).toFixed(2)
}
export const getFechaActual = () => {
  const hoy = new Date()
  return hoy.toISOString().split('T')[0]
}

// 🧪 Validación de formulario
export const validarFormularioRiego = (formData) => {
  const errors = {}

  if (!formData.numeroPlantas || isNaN(formData.numeroPlantas) || formData.numeroPlantas <= 0) {
    errors.numeroPlantas = 'Número de plantas debe ser mayor que cero'
  }

  if (!formData.aguaTotalLitros || isNaN(formData.aguaTotalLitros) || formData.aguaTotalLitros <= 0) {
    errors.aguaTotalLitros = 'Agua total debe ser mayor que cero'
  }

  if (!formData.sistema || formData.sistema.trim() === '') {
    errors.sistema = 'El sistema es obligatorio'
  }

  return errors
}

// 📦 Construcción del payload
export const construirPayloadRiego = (formData, uid, fechaHoy) => {
  return {
    fecha: formData.fecha || fechaHoy,
    lote: Number(formData.lote) || 0,
    sistema: formData.sistema.trim(),
    numeroPlantas: Number(formData.numeroPlantas),
    requerimientoArbol: Number(formData.requerimientoArbol) || 0,
    tiempoRiego: Number(formData.tiempoRiego) || 0,
    descargaDifusor: Number(formData.descargaDifusor) || 0,
    aguaTotalLitros: Number(formData.aguaTotalLitros),
    observaciones: formData.observaciones?.trim() || '',
    uid,
  }
}
