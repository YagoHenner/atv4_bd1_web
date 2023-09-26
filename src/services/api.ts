import axios from 'axios';

export function setupAPIClient(ctx = undefined) {
  const api = axios.create({
    baseURL: `${import.meta.env.API_HOST}`,
  });

  return api;
}

const api = setupAPIClient();

export default api;
