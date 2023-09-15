import axios from "axios";
import { all, put, takeLatest } from "redux-saga/effects";
import { setCafe, getCafe as getCafeAction } from "../slice/cafe";

function* getCafe(action) {
    try {
        const response = yield axios.get(
            `${process.env.REACT_APP_SERVER_URL}/cafes${action.payload ? "?location=" + action.payload : ""
            }`,
        );
        yield put(setCafe(response.data.data));
    } catch (error) {
        console.log(error);
    }
}

function* deleteCafe(action) {
    try {
        yield axios.delete(`${process.env.REACT_APP_SERVER_URL}/cafe`, {
            data: { id: action.payload },
        });
        yield put(getCafeAction());
    } catch (error) {
        console.log(error);
    }
}

function* createCafe(action) {
    try {
        yield axios.post(`${process.env.REACT_APP_SERVER_URL}/cafe`, {
            name: action.payload.name,
            description: action.payload.description,
            location: action.payload.location,
        });
    } catch (error) {
        console.log(error);
    }
}

function* updateCafe(action) {
    try {
        yield axios.put(`${process.env.REACT_APP_SERVER_URL}/cafe`, {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            location: action.payload.location,
        });
    } catch (error) {
        console.log(error);
    }
}

export function* watchCafeActions() {
    yield all([
        takeLatest("CAFE/createCafe", createCafe),
        takeLatest("CAFE/updateCafe", updateCafe),
        takeLatest("CAFE/getCafe", getCafe),
        takeLatest("CAFE/deleteCafe", deleteCafe),
    ]);
}
