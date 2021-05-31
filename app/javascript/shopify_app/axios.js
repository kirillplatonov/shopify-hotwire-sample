import axios from 'axios';
import { retrieveToken } from './shopify_app';

const instance = axios.create();

// Intercept all requests on this axios instance
instance.interceptors.request.use(async config => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]') || { content: '' };
  config.headers["X-CSRF-Token"] = csrfToken.content;

  window.sessionToken = await retrieveToken();
  config.headers["Authorization"] = `Bearer ${window.sessionToken}`;

  return config;
});

export default instance;
