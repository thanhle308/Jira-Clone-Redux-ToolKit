import { getProjectCategoryService } from '../../services/ProjectService/categoryService';
import { get_all_category_project } from '../reducer/projectCategoryReducer';

export const getProjectCategoryAction = () => {
   return async (dispatch) => {
      try {
         let result = await getProjectCategoryService();
         await dispatch(get_all_category_project(result))
      } catch (error) {
         console.log(error);
      }
   };
};
