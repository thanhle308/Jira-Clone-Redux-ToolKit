import {
   deleteCommentService,
   getAllCommentService,
   insertCommentService,
   updateCommentService,
} from '../../services/ProjectService/commentService';

export const getAllCommentAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await getAllCommentService(id);
      } catch (error) {
         console.log(error);
      }
   };
};

export const insertCommentAction = (data) => {
   return async (dispatch) => {
      try {
         let result = await insertCommentService(data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const updateCommentAction = (id, data) => {
   return async (dispatch) => {
      try {
         let result = await updateCommentService(id, data);
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteCommentAction = (id) => {
   return async (dispatch) => {
      try {
         let result = await deleteCommentService(id);
      } catch (error) {
         console.log(error);
      }
   };
};
