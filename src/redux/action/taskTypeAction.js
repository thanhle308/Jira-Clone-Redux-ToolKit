import { getAllTaskTypeService } from '../../services/ProjectService/taskTypeService';
import { get_list_tasktype } from '../reducer/taskTypeReducer';

export const getAllTaskTypeAction = () => {
   return async (dispatch) => {
      try {
         let result = await getAllTaskTypeService();
         await dispatch(get_list_tasktype(result))
      } catch (error) {
         console.log(error);
      }
   };
};
