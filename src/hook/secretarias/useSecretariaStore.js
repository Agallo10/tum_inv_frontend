import { SecretariaStore } from "../../store/secretaria/secretaria.store";

export const useSecretariaStore = () => {
  //SE CARGAN LAS SECRETARIAS
  const secretarias = SecretariaStore((state) => state.startLoadSecretarias);

  // const user = JSON.parse(localStorage.getItem("autenticacion"));

  const cargarSecretarias = async () => {
    try {
      const infoSecretarias = await secretarias();

      // const tarjetasecretarias = tarjetaSecretaria(infoSecretarias);

      return infoSecretarias;
    } catch (error) {
      console.error("Error al cargar secretarias:", error);
      throw error; // Opcionalmente volver a lanzar el error para un manejo adicional
    }
  };

  ////////////////////////////////////////////////////////////////
  // const tarjetaSecretaria = (secretarias) => {
  //   // Función interna para construir la tarjeta

  //   const construirTarjeta = (secretarias) => {
  //     // console.log(secretarias);

  //     secretarias.map((secretaria) => {
  //       console.log(secretaria);
  //       // return {
  //       //   id: secretaria.ID ? secretaria.ID : "NA",
  //       //   nombre: secretaria.Nombre ? secretaria.Nombre : "NA",
  //       //   secretario: secretaria.Secretario ? secretaria.Secretario : "NA",
  //       //   descripcion: secretaria.Descripcion ? secretaria.Descripcion : "NA",
  //       //   ubicacion: secretaria.Ubicacion ? secretaria.Ubicacion : "NA",
  //       //   // img: imgSrc,
  //       // };
  //     });
  //     // Determina la imagen según el nombre del operador
  //     //   let imgSrc = "";
  //     //   switch (operador ? operador.nombre : "") {
  //     //     case "weimagro":
  //     //       imgSrc = weimagro;
  //     //       break;

  //     //     default:
  //     //       imgSrc = weimagro;
  //     //   }
  //   };

  //   let tarjeta = construirTarjeta(secretarias);

  //   return tarjeta;
  // };

  return cargarSecretarias;
};
