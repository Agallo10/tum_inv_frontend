import { iotApi } from "../../api/iotApi";

export class DependenciaService {
  static startLoadDependencias = async () => {
    try {
      const resp = await iotApi.get("dependencias");

      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      return {
        ok: false,
        errorMessage,
      };
    }
  };

  static startLoadDependenciasBySecretaria = async (idSecretaria) => {
    try {
      const resp = await iotApi.get(`secretarias/${idSecretaria}/dependencias`);

      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      return {
        ok: false,
        errorMessage,
      };
    }
  };
}
