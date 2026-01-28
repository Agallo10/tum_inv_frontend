export const getEnvVariables = () => {
  // En producción (Vercel), usar la URL del backend en Railway
  // En desarrollo, usar localhost
  let apiUrl;
  
  if (import.meta.env.VITE_API_URL) {
    // Usar la URL configurada en variables de entorno (producción)
    apiUrl = import.meta.env.VITE_API_URL;
  } else if (window.location.hostname === "localhost") {
    // Desarrollo local
    const port = import.meta.env.VITE_LOCAL_PORT || "8080";
    apiUrl = `http://localhost:${port}/api`;
  } else {
    // Fallback: mismo origen
    apiUrl = `${window.location.protocol}//${window.location.hostname}/api`;
  }

  return {
    VITE_API_CONT: import.meta.env.VITE_API_CONT,
    VITE_API_URL: apiUrl,
  };
};
