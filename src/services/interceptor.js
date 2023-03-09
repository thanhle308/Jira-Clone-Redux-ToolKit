import axios from 'axios';
import { ACCESS_TOKEN, Domain, TokenCyber } from '../utils/settings';




export const http = axios.create();
http.interceptors.request.use(
   function (config) {
      config.baseURL = Domain;
      config.headers = {
         TokenCybersoft: TokenCyber,
         Authorization: 'Bearer '+ localStorage.getItem(ACCESS_TOKEN),
      };
      return { ...config };
   },
   function (error) {
      return Promise.reject(error);
   }
);
http.interceptors.response.use(
   function (response) {
      if (response.data.content) {
         return response.data.content;
      }
      return response;
   },
   function (error) {
      if (error.response.data) {
         return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
   }
);
