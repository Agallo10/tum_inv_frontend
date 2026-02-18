import { iotApi } from "../../api/iotApi";

export class SinAsignarService {
  static cargarSinSecretaria = async () => {
    try {
      const resp = await iotApi.get("/dashboard/sin-secretaria");
      const datos = resp.data;
      return { ok: true, datos };
    } catch (error) {
      const errorMessage = "No se pudieron cargar los datos sin secretaría";
      return { ok: false, errorMessage };
    }
  };
}
