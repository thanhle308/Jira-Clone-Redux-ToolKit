import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   listTaskTypes: [],
};

const taskTypeReducer = createSlice({
   name: 'taskTypeReducer',
   initialState,
   reducers: {
      get_list_tasktype: (state, action) => {
         state.listTaskTypes = action.payload;
      },
   },
});

export const {get_list_tasktype} = taskTypeReducer.actions;

export default taskTypeReducer.reducer;
