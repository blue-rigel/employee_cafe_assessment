import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import {
    setEmployee,
    getEmployee as getEmployeeAction,
} from "../slice/employee";
import { getCafe } from "../slice/cafe";

function* getEmployee(action) {
    try {
        const response = yield axios.get(
            `${process.env.REACT_APP_SERVER_URL}/employees${action.payload ? "?cafe=" + action.payload : ""
            }`,
        );
        yield put(setEmployee(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

function* deleteEmployee(action) {
    try {
        yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/employee`, {
            data: { id: action.payload },
        });
        yield put(getEmployeeAction());
        yield put(getCafe()); // Update employee count
    } catch (error) {
        console.log(error);
    }
}

function* createEmployee(action) {
    try {
        yield axios.post(`${process.env.REACT_APP_SERVER_URL}/employee`, {
            ...action.payload,
        });
    } catch (error) {
        console.log(error);
    }
}

function* updateCafe(action) {
    try {
        yield axios.put(`${process.env.REACT_APP_SERVER_URL}/employee`, {
            ...action.payload,
        });
    } catch (error) {
        console.log(error);
    }
}

export function* watchEmployeeActions() {
    yield all([
        takeLatest("EMPLOYEE/createEmployee", createEmployee),
        takeLatest("EMPLOYEE/updateEmployee", updateCafe),
        takeLatest("EMPLOYEE/getEmployee", getEmployee),
        takeLatest("EMPLOYEE/deleteEmployee", deleteEmployee),
    ]);
}
