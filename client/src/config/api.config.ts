export const apiConfig = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000, // request timeout in ms
  headers: {
    "Content-Type": "application/json",
  },
  config: {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  },
};
