import { iotApi } from "../../api/iotApi";

export class HardwareService {
  static createHardware = async (payload) => {
    // console.log('Payload de createHardware:', payload);

    try {
      const resp = await iotApi.post("/hardware-interno", payload);
      const datos = resp.data;
      console.log("Datos del hardware creado:", datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudo crear el hardware";
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  ///////////////////////////////////////////////////////////////////
  static getAllHardware = async () => {
    try {
      const resp = await iotApi.get(`/hardware-interno`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se cargaron los hardware";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
  static getAllHardwareByEquipos = async (id) => {
    try {
      const resp = await iotApi.get(`/equipos/${id}/hardware-interno`);
      const datos = resp.data;
      //  console.log('Datos de la labor creada:', datos);
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar los hardware";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
