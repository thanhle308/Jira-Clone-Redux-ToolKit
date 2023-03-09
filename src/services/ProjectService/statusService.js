import { http } from '../interceptor';

export const getAllStatusService = () => {
   return http.get('api/Status/getAll');
};
