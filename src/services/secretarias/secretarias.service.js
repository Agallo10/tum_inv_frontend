import { iotApi } from "../../api/iotApi";

export class SecretariaService {
  static startLoadSecretaria = async () => {
    try {
      const resp = await iotApi.get("secretarias");

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
