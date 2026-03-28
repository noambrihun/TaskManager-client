const RENDER_API = "https://taskmanager-server-mv1u.onrender.com";

// Dev: "" so requests go to /api and Vite proxies to localhost:3000
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ??
  (import.meta.env.DEV ? "" : RENDER_API);
