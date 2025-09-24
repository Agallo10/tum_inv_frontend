export const getEnvVariables = () => {
  //import.meta.env
  let port = "";
  if (window.location.hostname === "localhost") {
    port = `:${import.meta.env.VITE_LOCAL_PORT}`;
  }
  const apiUrl = `${window.location.protocol}//${window.location.hostname}${port}/api`;
  // const downlinkUrl = `${import.meta.env.VITE_DOWNLINK_SERVER}`;
  return {
    VITE_API_CONT: import.meta.env.VITE_API_CONT,
    VITE_API_URL: apiUrl,
    // VITE_DOWNLINK_URL:downlinkUrl,
    // VITE_API_SIGN_KEY:import.meta.env.VITE_API_SIGN_KEY,
    // VITE_USER_KEY:import.meta.env.VITE_USER_KEY,
  };
};
