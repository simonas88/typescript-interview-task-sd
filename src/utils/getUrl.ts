import { API } from '../constants';

type GetUrl = (endpoint: API, params?: Record<string, string | number>) => string

const getUrl: GetUrl = (endpoint, params = {}) => {
  const url = new URL(`${process.env.API_URL}/${endpoint}`);

  Object
    .keys(params)
    .forEach(key => url.searchParams.append(key, params[key] + ''));

  return url.toString();
};

export default getUrl;
