import axios from 'axios';
import { getBasePath, Storage } from 'react-jhipster';

import { SERVER_API_URL } from 'app/config/constants';

const TIMEOUT = 1000000; // 10000
const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const token = Storage.local.get('jee-authenticationToken') || Storage.session.get('jee-authenticationToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.timeout = TIMEOUT;
    if (!config.url.startsWith('/')  && !config.url.startsWith('i18n')) {
        config.url = `${SERVER_API_URL}${config.url}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    const status = err.status || err.response.status;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
