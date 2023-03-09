import { http } from '../interceptor';

export const getAllPriorityService = () => {
   return http.get('api/Priority/getAll?id=0');
};

