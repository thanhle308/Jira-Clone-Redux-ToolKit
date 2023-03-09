import { http } from '../interceptor';

export const getAllTaskTypeService = () => {
   return http.get('api/TaskType/getAll');
};
