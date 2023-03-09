import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   listStatus: [],
};

const statusReducer = createSlice({
   name: 'statusReducer',
   initialState,
   reducers: {
      get_list_status: (state, action) => {
         state.listStatus = action.payload;
      },
   },
});

export const {get_list_status} = statusReducer.actions;

export default statusReducer.reducer;
