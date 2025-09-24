import { useState, useEffect } from 'react';
import { timeFormat, timeParse, timeMonth, format } from 'd3';
import crossfilter from 'crossfilter2';
import data from './ndx.json'; // Importación directa

export const dateFormatSpecifier = '%m/%d/%Y';
export const dateFormat = timeFormat(dateFormatSpecifier);
export const dateFormatParser = timeParse(dateFormatSpecifier);
export const numberFormat = format('.2f');

export const useDatosState = () => {
  const [ndx, setNdx] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasNDX, setHasNDX] = useState(false);

  useEffect(() => {
    if (hasNDX) return;

    // El archivo ya está importado, no es necesario usar json() de D3
    try {
      // Procesa los datos importados
      const processedData = data.map(d => {
        // console.log(d);
        d.dd = dateFormatParser(d.date);
        d.month = timeMonth(d.dd);
        d.close = +d.close;
        d.open = +d.open;
        return d;
      });

      const ndxInstance = crossfilter(processedData);
      // console.log(ndxInstance);
      setNdx(ndxInstance);
      setLoading(false);
      setHasNDX(true);
    } catch (error) {
      console.error("Error al procesar el archivo JSON:", error);
      setLoading(false);
    }
  }, [hasNDX]);

  return { ndx, loading, hasNDX };
};
