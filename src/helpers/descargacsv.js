import { ExportToCsv } from "export-to-csv"; // Importa la librería para exportar a CSV

export const exportToCsv = (data) => {
  // console.log(data);
  if (!data || data.length === 0) {
    console.warn("No hay datos para exportar."); // Muestra una advertencia si no hay datos
    return; // Termina la función si `data` está vacío
  }

  // Extrae las claves del primer objeto de `data` para usarlas como encabezados
  const headers = Object.keys(data[0]); 

  const csvOptions = {
    fieldSeparator: ";", // Define el separador de columnas en el CSV
    quoteStrings: '"', // Encierra las cadenas de texto entre comillas dobles
    decimalSeparator: ".", // Usa el punto como separador decimal en números
    showLabels: true, // Muestra los encabezados en el CSV
    title: "Csv", // Título del archivo CSV
    useBom: true, // Añade BOM para evitar problemas con caracteres especiales
    useKeysAsHeaders: false, // No usa las claves del objeto como encabezados (se definen en `headers`)
    headers, // Usa las claves extraídas como encabezados del CSV
  };

  const csvExporter = new ExportToCsv(csvOptions); // Crea una instancia de ExportToCsv con las opciones definidas
  csvExporter.generateCsv(data); // Genera y descarga el archivo CSV con los datos proporcionados
};