import { configureStore } from "@reduxjs/toolkit";
import { reducer as formReducer } from "redux-form";
import createSagaMiddleware from "@redux-saga/core";
import cafeReducer from "./slice/cafe";
import employeeReducer from "./slice/employee";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        form: formReducer,
        cafe: cafeReducer,
        employee: employeeReducer,
    },
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
