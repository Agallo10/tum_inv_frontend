import { create } from "zustand";
import { AuthService } from "../../services/auth/auth.service";
import { devtools, persist } from "zustand/middleware";

///////////////////////////////////////////////////////////////
const storeApi = (set, get) => ({
  status: "unauthorized",
  token: undefined,
  refreshToken: undefined,
  expiresAt: undefined,
  rol: undefined,
  user: undefined,

  loginUser: async ({ username, password }) => {
    try {
      const { usuario, token, refresh_token, expires_at } = await AuthService.login({
        username,
        password,
      });
      if (!usuario) {
        set({ status: "unauthorized", token: undefined, refreshToken: undefined, user: undefined });
        return false;
      }
      set({ 
        status: "authenticated", 
        token: token, 
        refreshToken: refresh_token,
        expiresAt: expires_at,
        user: usuario 
      });
      localStorage.setItem("token", token);
      localStorage.setItem("refresh_token", refresh_token);
      if (expires_at) {
        localStorage.setItem("expires_at", expires_at);
      }
      return true;
    } catch (error) {
      set({ status: "unauthorized", token: undefined, refreshToken: undefined, user: undefined });
      return false;
    }
  },
  ///////////////////////////////////////////////////////////////
  refreshTokenAction: async () => {
    try {
      const currentRefreshToken = get().refreshToken || localStorage.getItem("refresh_token");
      
      if (!currentRefreshToken) {
        get().logout();
        return false;
      }

      const result = await AuthService.refreshToken(currentRefreshToken);
      
      if (!result.ok) {
        get().logout();
        return false;
      }

      set({ 
        status: "authenticated", 
        token: result.token, 
        refreshToken: result.refresh_token,
        expiresAt: result.expires_at,
        user: result.usuario 
      });
      localStorage.setItem("token", result.token);
      localStorage.setItem("refresh_token", result.refresh_token);
      if (result.expires_at) {
        localStorage.setItem("expires_at", result.expires_at);
      }
      return true;
    } catch (error) {
      console.error("Error al renovar token:", error);
      get().logout();
      return false;
    }
  },
  ///////////////////////////////////////////////////////////////
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("autenticacion");
    set({ 
      status: "unauthorized", 
      token: undefined, 
      refreshToken: undefined,
      expiresAt: undefined,
      user: undefined 
    });
  },
  ///////////////////////////////////////////////////////////////
  // Verificar si el token está por expirar (5 minutos antes)
  isTokenExpiringSoon: () => {
    const expiresAt = get().expiresAt || localStorage.getItem("expires_at");
    if (!expiresAt) return false;
    
    const expirationTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    return (expirationTime - now) < fiveMinutes;
  },
  ///////////////////////////////////////////////////////////////
});
///////////////////////////////////////////////////////////////
export const AuthStore = create()(
  devtools(persist(storeApi, { name: "autenticacion" }))
);
/////////////////////////////////////////////////////////////////
