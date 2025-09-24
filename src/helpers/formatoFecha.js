import { DateTime } from "luxon";
export const formatDate = (date) => {
  if (!date) return null;

  // Verificar si date es una cadena, y si lo es, convertirla en un objeto Date
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }

  // Verificar si date es una instancia válida de Date
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };
  //////////////////////////////////////////////////////////////////////////////
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

  
/////////////////////////////////////////////////////////////////////
export const capitalize = (str) =>
  str.length ? str.charAt(0).toUpperCase() + str.slice(1) : "";
/////////////////////////////////////////////////////////////////////
export const formatoFecha = (date) => {
  console.log(date);

  if (date) {
      const formattedDate = formatDate(date);
      let [year, month, day] = formattedDate.split('-');

      // Sumar 1 al mes
      month = (parseInt(month, 10) + 1).toString().padStart(2, '0');

      // Ajustar el año si el mes es superior a 12
      if (parseInt(month, 10) > 12) {
          month = '01';
          year = (parseInt(year, 10) + 1).toString();
      }

      // Convertir a string para setStartYearMonth
          year = year.toString();
          month = month.toString();
          day = day.toString();

      return({ year, month, day });
  } else {
      const currentDate = new Date();
      return({
          year: currentDate.getFullYear().toString(),
          month: (currentDate.getMonth() + 1).toString().padStart(2, '0'), // Sumando 1 ya que getMonth() devuelve 0-11
          day: currentDate.getDate().toString().padStart(2, '0')
      });
  }
};
/*********************************************************************************************************/
export const isDateObjectValid = (dateObj) => {
  return dateObj.year && dateObj.month && dateObj.day;
};
/*********************************************************************************************************/1

export const formatoFechaconsumos = (date) => {
  if (!date) return null;

  // Convertir la fecha a un string en formato ISO y tomar solo la parte de la fecha
  const formattedDate = date.toISOString().split('T')[0];
  console.log(formattedDate);

  return formattedDate;

}