import { http } from '../interceptor';

export const getAllCommentService = (id) => {
   return http.get(`api/Comment/getAll?id=${id}`);
};

export const insertCommentService = (data) => {
   return http.post(`api/Comment/insertComment`, data);
};

export const updateCommentService = (id, data) => {
   return http.put(`api/Comment/updateComment?id=${id}&contentComment=${data}`);
};

export const deleteCommentService = (id) => {
   return http.delete(`api/Comment/deleteComment?idComment=${id}`);
};
