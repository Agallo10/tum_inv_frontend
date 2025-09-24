import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { logoBase64 } from '../../assets/brand/weimagro' 
//import logoBase64 from '../../assets/logos/Weimagro.png';
// ¡ESTA LÍNEA ES CLAVE!
pdfMake.vfs = pdfFonts.vfs

// 📦 Opciones predefinidas para el selector de labores
export const opcionesLabores = [
  {
    label: 'Siembra',
    options: [
      { value: 'Preparación de Suelo', label: 'Preparación de Suelo' },
      { value: 'Ahoyado', label: 'Ahoyado' },
      { value: 'Aplicación de Enmiendas', label: 'Aplicación de Enmiendas' },
      { value: 'Desinfección', label: 'Desinfección' },
      { value: 'Plantado', label: 'Plantado' },
    ],
  },
  {
    label: 'Limpieza y Plateo',
    options: [
      { value: 'Plateo', label: 'Plateo' },
      { value: 'Mecánica', label: 'Mecánica' },
      { value: 'Química', label: 'Química' },
    ],
  },
  {
    label: 'Fertilización',
    options: [
      { value: 'Granulada', label: 'Granulada' },
      { value: 'Foliar', label: 'Foliar' },
      { value: 'Drench', label: 'Drench' },
    ],
  },
  {
    label: 'Poda',
    options: [
      { value: 'Formación', label: 'Formación' },
      { value: 'Producción', label: 'Producción' },
      { value: 'Sanitaria', label: 'Sanitaria' },
      { value: 'Renovación', label: 'Renovación' },
    ],
  },
  {
    label: 'Sanidad Vegetal',
    options: [
      { value: 'Monitoreo y Censo', label: 'Monitoreo y Censo' },
      { value: 'Aplicación Foliar', label: 'Aplicación Foliar' },
      { value: 'Aplicación en Drench', label: 'Aplicación en Drench' },
      { value: 'Tratamiento', label: 'Tratamiento' },
      { value: 'Trampeo', label: 'Trampeo' },
    ],
  },
  {
    label: 'Cosecha',
    options: [
      { value: 'Recolección', label: 'Recolección' },
      { value: 'Clasificación', label: 'Clasificación' },
      { value: 'Transporte', label: 'Transporte' },
    ],
  },
  {
    label: 'Riego',
    options: [
      { value: 'Aplicación de Riego', label: 'Aplicación de Riego' },
    ],
  },
]

// ✅ Opciones de insumos corregidas
export const opcionesInsumos = [
  {
    label: 'Insumos',
    options: [
      { value: 'Semilla', label: 'Semilla' },
      { value: 'Productos Fito Sanitarios', label: 'Productos Fito Sanitarios' },
      { value: 'Fertilizantes', label: 'Fertilizantes' },
      { value: 'Equipos', label: 'Equipos' },
    ],
  },
  {
    label: 'Herramientas',
    options: [
      { value: 'Herramientas Personales', label: 'Herramientas Personales' },
      { value: 'Ahoyado', label: 'Ahoyado' },
    ],
  },
  {
    label: 'Equipos Obra',
    options: [
      { value: 'Mecánicos', label: 'Mecánicos' },
      { value: 'Motorizados', label: 'Motorizados' },
    ],
  },
]

// 📅 Utilidad para obtener la fecha actual en formato YYYY-MM-DD
export const getFechaActual = () => {
  const hoy = new Date()
  const year = hoy.getFullYear()
  const month = String(hoy.getMonth() + 1).padStart(2, '0')
  const day = String(hoy.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 💰 Cálculo del costo total
export const calcularCostoTotal = (nJornales, costoJornales, costoMateriales) => {
  return (
    (parseFloat(costoJornales) || 0) * (parseFloat(nJornales) || 0) +
    (parseFloat(costoMateriales) || 0)
  )
}

// ✅ Valida los campos del formulario
export const validarFormulario = (formData) => {
  const errors = {}

  if (!formData.labores || formData.labores.length === 0) {
    errors.labores = 'Debe seleccionar al menos una labor.'
  }

  if (!formData.nJornales || isNaN(formData.nJornales)) {
    errors.nJornales = 'Número de jornales es requerido.'
  }

  if (!formData.costoJornales || isNaN(formData.costoJornales)) {
    errors.costoJornales = 'Costo por jornal es requerido.'
  }

  return errors
}

// 📦 Crea el payload para guardar datos
export const construirPayload = (formData, costoTotal, uid, fechaDefault) => {
  
  return {
    fecha: formData.fecha || fechaDefault,
    laborRealizada: formData.labores?.map((l) => l.value).join(', ') || 'ninguna',
    numeroJornales: Number(formData.nJornales) || 0,
    costoJornales: Number(formData.costoJornales) || 0,
    insumosYMateriales: [
      {
        nombre: formData.insumo?.trim() === '' ? 'ninguno' : formData.insumo,
        costo:
          formData.costoMateriales?.trim() === ''
            ? 0
            : Number(formData.costoMateriales),
      },
    ],
    costoTotal,
    observaciones:
      formData.observaciones?.trim() === '' ? 'ninguna' : formData.observaciones,
    uid,
  }
}

export const generarPDFLabores = ({ columns, data, totalCostos, titulo = 'Reporte de Labores Diarias' }) => {
  const visibleCols = columns.filter((col) => col.visible)
  const headerRow = visibleCols.map((col) => col.label)
  const bodyRows = data.map((row) => visibleCols.map((col) => row[col.key] || ''))

  const docDefinition = {
    content: [
      {
        table: {
          widths: ['25%', '50%', '25%'],
          body: [
            [
              { image: logoBase64, width: 100, alignment: 'left', border: [false, false, false, false] },
              { text: titulo.toUpperCase(), style: 'header', alignment: 'center', border: [false, false, false, false] },
              {
                layout: 'noBorders',
                table: {
                  body: [
                    ['Código', 'RE F 01'],
                    ['Fecha elaboración', new Date().toLocaleDateString()],
                    ['Versión', '01'],
                    ['Página', '1 de 1'],
                  ],
                  layout: 'lightHorizontalLines',
                },
              },
            ],
          ],
        },
        // layout: 'noBorders',
      },
      { text: '\n\n' },
      {
        table: {
          headerRows: 1,
          widths: Array(visibleCols.length).fill('*'),
          body: [headerRow, ...bodyRows],
        },
      },
      {
        text: `\nCosto total de actividades: $${totalCostos.toLocaleString()}`,
        style: 'total',
      },
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 5, 0, 5] },
      subheader: { fontSize: 12, margin: [0, 0, 0, 10] },
      total: { fontSize: 14, bold: true, margin: [0, 20, 0, 0] },
    },
    defaultStyle: {
      fontSize: 10,
    },
    pageOrientation: 'landscape',
  }

  pdfMake.createPdf(docDefinition).open()
}
