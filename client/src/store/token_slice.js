import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
    name: 'token',
    initialState: "",
    reducers: {
        setToken: (state, action) => {
            state = action.payload.token;
        },
        clearToken: (state) => {
            state = null;
        },
    },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
export const token = (state) => state;