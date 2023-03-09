import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  listPriority: [],
}

const priorityReducer = createSlice({
  name: 'priorityReducer',
  initialState,
  reducers: {
    get_list_priority: (state, action) => {
      state.listPriority = action.payload;
   },
  }
});

export const {get_list_priority} = priorityReducer.actions

export default priorityReducer.reducer