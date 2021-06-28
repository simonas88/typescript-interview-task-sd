import { logoutAndReload } from './authentication';
import { getToken } from './tokenStore';

type RequestFn = (url: string, config?: RequestInit) => Promise<Response>

const authorizedFetch: RequestFn = async (url, config = {}) => {
  const response = await fetch(
    url,
    {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );

  if (response.status === 401) {
    logoutAndReload();
  }

  return response;
};

export default authorizedFetch;
