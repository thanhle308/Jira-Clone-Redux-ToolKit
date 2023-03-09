import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   allUser: [],
   listUserFromProject: []
};

const userReducer = createSlice({
   name: 'userReducer',
   initialState,
   reducers: {
      getAllUserReducer: (state, action) => {
         state.allUser = action.payload;
      },
      getUserFromProject: (state, action) => {
         state.listUserFromProject = action.payload;
      }
   },
});

export const { getAllUserReducer ,getUserFromProject } = userReducer.actions;

export default userReducer.reducer;
