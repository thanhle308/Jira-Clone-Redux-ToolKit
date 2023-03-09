import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const loadingReducer = createSlice({
   name: 'loadingReducer',
   initialState,
   reducers: {
    displayLoading : (state , action) => {
        state.isLoading = true;
    },
    hideLoading : (state, action) => {
        state.isLoading = false;
    }
   }
});

export const {displayLoading , hideLoading} = loadingReducer.actions;

export default loadingReducer.reducer;
