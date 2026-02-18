import { iotApi } from "../../api/iotApi";

export class DependenciaService {
  static startLoadDependencias = async () => {
    try {
      const resp = await iotApi.get("dependencias");
      const datos = resp.data;
      return { ok: true, datos };
    } catch (error) {
      return { ok: false, errorMessage: error.message };
    }
  };

  static startLoadDependenciasBySecretaria = async (idSecretaria) => {
    try {
      const resp = await iotApi.get(`secretarias/${idSecretaria}/dependencias`);
      const datos = resp.data;
      return { ok: true, datos };
    } catch (error) {
      return { ok: false, errorMessage: error.message };
    }
  };

  static createDependencia = async (dependencia) => {
    try {
      const resp = await iotApi.post("dependencias", dependencia);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };

  static updateDependencia = async (id, dependencia) => {
    try {
      const resp = await iotApi.put(`dependencias/${id}`, dependencia);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };

  static deleteDependencia = async (id) => {
    try {
      const resp = await iotApi.delete(`dependencias/${id}`);
      return { ok: true, datos: resp.data };
    } catch (error) {
      return { ok: false, errorMessage: error.response?.data?.error || error.message };
    }
  };
}
