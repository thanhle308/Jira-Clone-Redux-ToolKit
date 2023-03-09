import { getAllStatusService } from '../../services/ProjectService/statusService';
import { get_list_status } from '../reducer/statusReducer';

export const getAllStatusAction = () => {
   return async (dispatch) => {
      try {
         let result = await getAllStatusService();
         await dispatch(get_list_status(result))
      } catch (error) {
         console.log(error);
      }
   };
};
