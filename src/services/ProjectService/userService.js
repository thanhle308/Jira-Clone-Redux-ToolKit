import { http } from '../interceptor';

export const getAllUserService = (keyword) => {
   return http.get(`api/Users/getUser?keyword=${keyword}`);
};

export const getUserByProjectIdService = (id) => {
   return http.get(`api/Users/getUserByProjectId?idProject=${id}`);
};

export const signUpService = (accountToSignUp) => {
   return http.post('api/Users/signup', accountToSignUp);
};

export const signInService = (accountToSignIn) => {
   return http.post('api/Users/signin', accountToSignIn);
};

export const editUserService = (data) => {
   return http.put('api/Users/editUser', data);
};

export const deleteUserService = (id) => {
   return http.delete(`api/Users/deleteUser?id=${id}`);
};
