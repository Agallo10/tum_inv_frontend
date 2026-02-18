import { iotApi } from "../../api/iotApi";

export class SecretariaService {
  static startLoadSecretaria = async () => {
    try {
      const resp = await iotApi.get("secretarias");
      const datos = resp.data;
      return { ok: true, datos };
    } catch (error) {
      return { ok: false, errorMessage: error.message };
    }
  };

  static createSecretaria = async (secretaria) => {
    try {
      const resp = await iotApi.post("secretarias", secretaria);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };

  static updateSecretaria = async (id, secretaria) => {
    try {
      const resp = await iotApi.put(`secretarias/${id}`, secretaria);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };

  static deleteSecretaria = async (id) => {
    try {
      const resp = await iotApi.delete(`secretarias/${id}`);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };
}
