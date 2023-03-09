import { http } from '../interceptor';

export const getProjectCategoryService = () => {
   return http.get('api/ProjectCategory');
};
