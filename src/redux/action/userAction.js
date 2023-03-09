import {
   getAllUserService,
   signInService,
   signUpService,
   getUserByProjectIdService,
   editUserService,
   deleteUserService,
} from '../../services/ProjectService/userService';
import { ACCESS_TOKEN, USER_LOGIN } from '../../utils/settings';
import { getAllUserReducer, getUserFromProject } from '../reducer/userReducer';
import { history } from '../../App';
import { notifiFunction } from '../../utils/Notification/notification';

export const signUpAction = (accountToSignUp) => {
   return async (dispatch) => {
      try {
         const result = await signUpService(accountToSignUp);
         // console.log('result', result)
         notifiFunction('success', 'Register thành công !');
         history.push('/login');
      } catch (error) {
         console.log(error);
         notifiFunction('error', 'Email đã được sử dụng !');
      }
   };
};

export const signInAction = (accountToSignIn) => {
   return async (dispatch) => {
      try {
         const result = await signInService(accountToSignIn);
         // Lưu vào localStorage khi đăng nhập thành công
         localStorage.setItem(ACCESS_TOKEN, result.accessToken)
         localStorage.setItem(USER_LOGIN, JSON.stringify(result))

         history.push('/');
      } catch (error) {
         console.log(error);
      }
   };
};

export const getAllUserAction = (keyword) => {
   return async (dispatch) => {
      try {
         const result = await getAllUserService(keyword);
         dispatch(getAllUserReducer(result));
         // console.log("data", result)
      } catch (error) {
         console.log(error);
      }
   };
};

export const getUserByProjectIdAction = (id) => {
   console.log('id', id);
   return async (dispatch) => {
      try {
         const result = await getUserByProjectIdService(id);
         console.log("arr",result)   
            await dispatch(getUserFromProject(result))
      } catch (error) {
         console.log(error);
         if (error.statusCode === 404){
            dispatch(getUserFromProject([]));
         }
      }
   };
};

export const editUserAction = (infor) => {
   return async (dispatch) => {
      try {
         const result = await editUserService(infor);
      } catch (error) {
         console.log(error);
      }
   };
};

export const deleteUserAction = (id) => {
   return async (dispatch) => {
      try {
         const result = await deleteUserService(id);
      } catch (error) {
         console.log(error);
      }
   };
};
