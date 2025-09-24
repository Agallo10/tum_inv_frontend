import {
    cilAlarm,
    cilReportSlash,
  } from '@coreui/icons'

  export const consumo=[
           
    {                       
        id: "Industrial",
        label:"Industrial",
        value:"0",
        color:"#244BD5",
    },
    {                       
        id: "Comercial",
        label:"Comercial",
        value:"0",
        color:"#1C077A",            
    },

    {                       
        id: "Residencial",
        label:"Residencial",
        value:"0",
        color:"#808491",            
    },   
];
/********************************************************/  
//////////////////////////////////////////////////////////////  
export const valida_alarmas= (inputData,t) => {
  //  console.log(inputData);
    return inputData.map(item => {
        let icon, colorClass;

        // Definir el icono y el color basado en el id
        switch (item.id) {
            case 'Con Alarma':
                icon = cilAlarm; // Reemplaza con el icono correcto
                colorClass = 'danger-gradient';
                break;
            case 'Sin Alarma':
                icon = cilReportSlash; // Reemplaza con el icono correcto
                colorClass = 'success-gradient';
                break;
            default:
                icon = 'cilUnknown'; // Reemplaza con un icono por defecto si es necesario
                colorClass = 'default-gradient';
        }

        return {
            title: `${t(item.id)}`,
            icon: icon,
            percent: parseFloat(item.label), // Convierte el porcentaje a número
            value: parseFloat(item.value),
            color: colorClass,
            key:colorClass,
        };
    }); 
}

//////////////////////////////////////////////////////////////  
  export const consumototalcategorias = (proyectoData) => {
    //console.log(proyectoData);
    const total = proyectoData[0].y;
    //console.log(total);
  
    const Industrial = proyectoData.find((m) => m.x === "INDUSTRIAL")
      ? proyectoData.find((m) => m.x === "INDUSTRIAL")
      : 0;
    const Comercial = proyectoData.find((m) => m.x === "COMERCIAL")
      ? proyectoData.find((m) => m.x === "COMERCIAL")
      : 0;
    const Residencial = proyectoData.find((m) => m.x === "RESIDENCIAL")
      ? proyectoData.find((m) => m.x === "RESIDENCIAL")
      : 0;
  
    //console.log(Industrial);
    let porIndustrial = ((Industrial.y * 100) / total).toFixed(1);
    let porComercial = ((Comercial.y * 100) / total).toFixed(1);
    let porResidencial = ((Residencial.y * 100) / total).toFixed(1);
  
    //console.log(porIndustrial);
  
    if (isNaN(porIndustrial)) porIndustrial = 0;
    if (isNaN(porComercial)) porComercial = 0;
    if (isNaN(porResidencial)) porResidencial = 0;
  
    consumo[0].label = "Industrial: "+porIndustrial + "%";
    consumo[0].value = porIndustrial;
    consumo[1].label = "Comercial: "+porComercial + "%";
    consumo[1].value = porComercial;
    consumo[2].label = "Residencial: "+porResidencial + "%";
    consumo[2].value = porResidencial;
    //console.log(consumo);
    return { consumo };
  };
  //////////////////////////////////////////////////////////////  
  export const obtenerValoresConsumoProyecto =(consumoData)=>{
    // Convertir los valores a formato numérico
    const dispositivosConValoresNumericos = consumoData.map(categoria => ({
        ...categoria,
        value: Number(categoria.value)
    }));

    // Extraer los valores por id
    const industrial = dispositivosConValoresNumericos.find(d => d.id === 'Industrial')?.value || 0;
    const comercial = dispositivosConValoresNumericos.find(d => d.id === 'Comercial')?.value || 0;
    const residencial = dispositivosConValoresNumericos.find(d => d.id === 'Residencial')?.value || 0;

    // Retornar los valores extraídos
    return { industrial, comercial, residencial };
  }