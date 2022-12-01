import axios from 'axios';

const createAPI = (
  baseURL = `${process.env.REACT_APP_SHARELY}/`,
  config = {}
) => {
  const axiosInstance = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...config,
  });

  // setup axios.intercept
  return axiosInstance;
};

const api = createAPI();

export default api;
