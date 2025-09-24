import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.vfs

// Asegúrate de tener pdfMake importado correctamente

import { logoBase64 } from '../../assets/brand/weimagro' 
import { DateTime } from "luxon";
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

export const plagasKeys = [
  { key: 'trips', label: 'Trips' },
  { key: 'moscaOvario', label: 'Mosca del Ovario' },
  { key: 'acaros', label: 'Ácaros' },
  { key: 'otrosInsectos', label: 'Otros Insectos' },
  { key: 'botrytis', label: 'Botrytis' },
  { key: 'phomosis', label: 'Phomosis' },
  { key: 'roña', label: 'Roña' },
  { key: 'otrosHongos', label: 'Otros Hongos' },
  { key: 'fusarium', label: 'Fusarium oxysporum' },
]

export const lugares = [
  { key: 'Fr', label: 'Fruto' },
  { key: 'B', label: 'Brote' },
  { key: 'H', label: 'Hoja' },
  { key: 'Fl', label: 'Flor' },
  { key: 'T', label: 'Tallo' },
  { key: 'R', label: 'Ramas' },
]

/////////////////////////////////////////////////////////////////////////////////////

export const AHtiempo = (tiempo) => {
  if (!tiempo) {
    return {
      diaDeLaSemana: '',
      mesdelDia: '',
      formattedTime: '',
      formattedDate: '',
    }
  }

  const dt = DateTime.fromISO(tiempo, { zone: 'utc' }) // <-- esto evita el desfase

  if (!dt.isValid) {
    return {
      diaDeLaSemana: '',
      mesdelDia: '',
      formattedTime: '',
      formattedDate: '',
    }
  }

  return {
    diaDeLaSemana: capitalize(dt.setLocale('es').weekdayLong),
    mesdelDia: capitalize(dt.setLocale('es').monthLong),
    formattedTime: dt.toFormat('HH:mm:ss'),
    formattedDate: dt.toFormat('yyyy-MM-dd'), // Puedes cambiar a 'dd/MM/yyyy' si lo prefieres
  }
}


const fallbackTiempo = () => ({
  diaDeLaSemana: '',
  mesdelDia: '',
  formattedTime: '',
  formattedDate: '',
});

/////////////////////////////////////////////////////////////////////////////////////
export const capitalize = (str) =>
    str.length ? str.charAt(0).toUpperCase() + str.slice(1) : "";
/////////////////////////////////////////////////////////////////////////////////////
// Utilidad: construir tabla de plagas por registro
const safeText = (val) =>
  typeof val === 'string' ? val : val?.toString?.() ?? ''

const plagas = [
  { key: 'trips', label: 'Trips' },
  { key: 'moscaOvario', label: 'Mosca del Ovario' },
  { key: 'acaros', label: 'Ácaros' },
  { key: 'otrosInsectos', label: 'Otros Insectos' },
  { key: 'botrytis', label: 'Botrytis' },
  { key: 'phomosis', label: 'Phomosis' },
  { key: 'roña', label: 'Roña' },
  { key: 'otrosHongos', label: 'Otros Hongos' },
  { key: 'fusarium', label: 'Fusarium oxysporum' },
]


const buildPlagaData = (registro) => {
  const data = {}
  plagas.forEach(({ key }) => {
    data[key] = Array.from({ length: 15 }, (_, i) => {
      return registro?.registro?.[i + 1]?.[key] ?? '0'
    })
  })
  return data
}

export const generarPDFPlagas = ({ registros = [], titulo = 'Reporte de Plagas' }) => {
  if (!Array.isArray(registros) || registros.length === 0) {
    console.warn('⚠️ No hay registros para exportar.')
    return
  }

  const contenido = []

  registros.forEach((registro) => {
    const plagaData = registro.plagaData || buildPlagaData(registro)
    const fecha = safeText(registro.fecha)
    const fechaIntervencion = safeText(registro.fechaIntervencion)
    const observaciones = safeText(registro.observaciones)
    const responsable = safeText(registro.responsable)
    const columnasNumeros = Array.from({ length: 15 }, (_, i) => `${i + 1}`)

    // Encabezado de tabla
    const cabecera = ['Plaga', ...columnasNumeros]
    const cuerpo = [cabecera]

    // Ahora usamos `key` para obtener los datos y `label` para mostrar
    plagas.forEach(({ key, label }) => {
      const valores = plagaData[key] || Array(15).fill('0')
      cuerpo.push([label, ...valores])
    })

    contenido.push(
      {
        text: `\n📅 Fecha: ${fecha}  | 🧑 Responsable: ${responsable}`,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      {
        text: `🛠️ Fecha de Intervención: ${fechaIntervencion}\n📝 Observaciones: ${observaciones}`,
        margin: [0, 0, 0, 10],
      },
      {
        table: {
          headerRows: 1,
          widths: ['20%', ...Array(15).fill('*')],
          body: cuerpo,
        },
        layout: 'lightHorizontalLines',
      }
    )
  })

  const docDefinition = {
    content: [
      {
        table: {
          widths: ['25%', '50%', '25%'],
          body: [
            [
              { image: logoBase64, width: 100, border: [false, false, false, false] },
              {
                text: titulo.toUpperCase(),
                style: 'header',
                alignment: 'center',
                border: [false, false, false, false],
              },
              {
                layout: 'noBorders',
                table: {
                  body: [
                    ['Código', 'RE F 01'],
                    ['Fecha elaboración', new Date().toLocaleDateString()],
                    ['Versión', '01'],
                    ['Página', '1 de 1'],
                  ],
                },
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
      ...contenido,
    ],
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 5, 0, 5] },
    },
    defaultStyle: {
      fontSize: 10,
    },
    pageOrientation: 'landscape',
  }

  pdfMake.createPdf(docDefinition).open()
}