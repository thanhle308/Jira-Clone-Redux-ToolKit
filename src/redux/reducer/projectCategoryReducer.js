import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   arrProjectCategory: [],
};

const projectCategoryReducer = createSlice({
   name: 'projectCategoryReducer',
   initialState,
   reducers: {
      get_all_category_project : (state , action) => {
            state.arrProjectCategory = action.payload;
      }
   },
});

export const {get_all_category_project} = projectCategoryReducer.actions;

export default projectCategoryReducer.reducer;
