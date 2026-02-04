export const getEnvVariables = () => {
  // Prioridad:
  // 1. VITE_API_URL (producción - configurada en Vercel/Railway)
  // 2. Desarrollo local (localhost con puerto configurable)
  // 3. Fallback: mismo origen
  
  let apiUrl = import.meta.env.VITE_API_URL;
  
  if (!apiUrl) {
    if (typeof window !== 'undefined' && window.location.hostname === "localhost") {
      // Desarrollo local
      const port = import.meta.env.VITE_LOCAL_PORT || "8080";
      apiUrl = `http://localhost:${port}/api`;
    } else if (typeof window !== 'undefined') {
      // Fallback: mismo origen
      apiUrl = `${window.location.protocol}//${window.location.hostname}/api`;
    }
  }

  return {
    VITE_API_CONT: import.meta.env.VITE_API_CONT,
    VITE_API_URL: apiUrl,
  };
};
