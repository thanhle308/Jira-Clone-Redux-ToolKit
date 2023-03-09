import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import projectReducer from './reducer/projectReducer';
import commentReducer from './reducer/commentReducer';
import priorityReducer from './reducer/priorityReducer';
import projectCategoryReducer from './reducer/projectCategoryReducer';
import taskTypeReducer from './reducer/taskTypeReducer';
import statusReducer from './reducer/statusReducer';
import loadingReducer from './reducer/loadingReducer';
import drawerHOCReducer from './reducer/drawerHOCReducer';
import taskModalReducer from './reducer/taskModalReducer';


export const store = configureStore({
   reducer: {
      userReducer,
      projectReducer,
      commentReducer,
      priorityReducer,
      projectCategoryReducer,
      taskTypeReducer,
      statusReducer,
      loadingReducer,
      drawerHOCReducer,
      taskModalReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});
