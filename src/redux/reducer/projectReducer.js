import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   projectList: [],
   projectEdit: {
      "id": 0,
      "projectName": "string",
      "creator": 0,
      "description": "string",
      "categoryId": 3
   },
   projectDetail: {}
   
};

const projectReducer = createSlice({
   name: 'projectReducer',
   initialState,
   reducers: {
      get_list_project: (state, action) => {
         state.projectList = action.payload;
      },
      edit_project: (state, action) => {
         state.projectEdit = action.payload;
      },
      get_project_detail: (state, action) => {
         state.projectDetail = action.payload;
      },
   },
});

export const { get_list_project, edit_project, get_project_detail } = projectReducer.actions;

export default projectReducer.reducer;
