export const opcionesResponsable = [
  { value: 'Gustavo Ruene', label: 'Gustavo Ruene' },
  { value: 'Weimar Obando', label: 'Weimar Obando' },
]
// 📅 Utilidad para obtener la fecha en formato YYYY-MM-DD
export const getFechaActual = () => {
  const hoy = new Date()
  const year = hoy.getFullYear()
  const month = String(hoy.getMonth() + 1).padStart(2, '0')
  const day = String(hoy.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// src/components/helpers.js

export const opcionesFitosanitario = [
  { value: 'Trips', label: 'Trips' },
  { value: 'Botrytis', label: 'Botrytis' },
  { value: 'Ácaros', label: 'Ácaros' },
  { value: 'Fusarium', label: 'Fusarium' },
]

export const opcionesFenologico = [
  { value: 'Floración', label: 'Floración' },
  { value: 'Llenado', label: 'Llenado' },
  { value: 'Maduración', label: 'Maduración' },
  { value: 'Cosecha', label: 'Cosecha' },
]

