import { getAllPriorityService } from '../../services/ProjectService/priorityService';
import { get_list_priority } from '../reducer/priorityReducer';

export const getAllPriorityAction = () => {
   return async (dispatch) => {
      try {
         let result = await getAllPriorityService();
         await dispatch(get_list_priority(result))
      } catch (error) {
         console.log(error);
      }
   };
};
