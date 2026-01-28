import axios from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL, VITE_API_CONT, VITE_DOWNLINK_URL } = getEnvVariables();
//////////////////////////////////////////////
export const iotApi = axios.create({
  baseURL: VITE_API_URL,
});

// Flag para evitar múltiples intentos de refresh simultáneos
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

//////////////////////////////////////////////
// Request interceptor - agrega el token a todas las peticiones
iotApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

//////////////////////////////////////////////
// Response interceptor - maneja errores 401 y renueva el token
iotApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error no es 401 o ya se intentó renovar, rechazar
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Si es la petición de refresh token la que falló, hacer logout
    if (originalRequest.url?.includes('/auth/refresh')) {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("autenticacion");
      window.location.href = '/#/login';
      return Promise.reject(error);
    }

    // Si ya se está renovando el token, encolar la petición
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return iotApi(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      isRefreshing = false;
      localStorage.removeItem("token");
      localStorage.removeItem("autenticacion");
      window.location.href = '/#/login';
      return Promise.reject(error);
    }

    try {
      // Llamar al endpoint de refresh
      const response = await axios.post(`${VITE_API_URL}/auth/refresh`, {
        refresh_token: refreshToken,
      });

      const { token, refresh_token, expires_at, usuario } = response.data;

      // Guardar nuevos tokens en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      if (expires_at) {
        localStorage.setItem("expires_at", expires_at);
      }

      // Actualizar el store de Zustand
      const autenticacionData = localStorage.getItem("autenticacion");
      if (autenticacionData) {
        try {
          const parsed = JSON.parse(autenticacionData);
          parsed.state = {
            ...parsed.state,
            status: "authenticated",
            token: token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
            user: usuario,
          };
          localStorage.setItem("autenticacion", JSON.stringify(parsed));
        } catch (e) {
          console.error("Error actualizando store:", e);
        }
      }

      // Procesar cola de peticiones pendientes
      processQueue(null, token);

      // Reintentar la petición original con el nuevo token
      originalRequest.headers["Authorization"] = `Bearer ${token}`;
      return iotApi(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      
      // Limpiar todo y redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("autenticacion");
      window.location.href = '/#/login';
      
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);
