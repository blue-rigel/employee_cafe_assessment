import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    edit: {
        name: "",
        description: "",
        location: "",
    },
    isLoading: false,
};

export const cafeSlice = createSlice({
    name: "CAFE",
    initialState,
    reducers: {
        getCafe: (state) => {
            state.isLoading = true;
        },
        setCafe: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        setEditCafe: (state, action) => {
            state.edit = action.payload;
        },
        clearEditCafe: (state) => {
            state.edit = initialState.edit;
        },
        createCafe: (state) => {
            state.isLoading = true;
        },
        updateCafe: (state) => {
            state.isLoading = true;
        },
        deleteCafe: (state) => {
            state.isLoading = true;
        },
    },
});

export const { getCafe, setCafe, updateCafe, deleteCafe, setEditCafe, createCafe, clearEditCafe } = cafeSlice.actions;
export default cafeSlice.reducer;
