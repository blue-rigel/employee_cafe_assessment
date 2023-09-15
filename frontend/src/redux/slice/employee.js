import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    edit: {},
    isLoading: false,
};

export const employeeSlice = createSlice({
    name: "EMPLOYEE",
    initialState,
    reducers: {
        getEmployee: (state) => {
            state.isLoading = true;
        },
        setEmployee: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        },
        setEditEmployee: (state, action) => {
            state.edit = action.payload;
        },
        clearEditEmployee: (state) => {
            state.edit = initialState.edit;
        },
        createEmployee: (state) => {
            state.isLoading = true;
        },
        updateEmployee: (state) => {
            state.isLoading = true;
        },
        deleteEmployee: (state) => {
            state.isLoading = true;
        },
    },
});

export const { getEmployee, setEmployee, updateEmployee, deleteEmployee, createEmployee, setEditEmployee, clearEditEmployee } =
    employeeSlice.actions;
export default employeeSlice.reducer;
