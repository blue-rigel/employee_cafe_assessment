import { all, fork } from "redux-saga/effects";
import { watchCafeActions } from "./cafe";
import { watchEmployeeActions } from "./employee";

const rootSaga = function* () {
    yield all([fork(watchCafeActions), fork(watchEmployeeActions)]);
};

export default rootSaga;
