import { iotApi } from "../../api/iotApi";

export class DashboardService {
  ///////////////////////////////////////////////////////////////////
  static cargarDashboardStats = async () => {
    try {
      const resp = await iotApi.get(`/dashboard/stats`);
      const datos = resp.data;
      return {
        ok: true,
        datos,
      };
    } catch (error) {
      const errorMessage = "No se pudieron cargar las estadísticas del dashboard";
      return {
        ok: false,
        errorMessage,
      };
    }
  };
  ///////////////////////////////////////////////////////////////////
}
