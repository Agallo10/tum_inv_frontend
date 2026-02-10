import { DashboardService } from "../../services/dashboard/dashboard.service";

export const useDashboardStore = () => {
  const cargarDashboardStats = async () => {
    const result = await DashboardService.cargarDashboardStats();
    if (result.ok) {
      return result.datos;
    }
    console.error("Error cargando stats del dashboard:", result.errorMessage);
    return null;
  };

  return {
    cargarDashboardStats,
  };
};
