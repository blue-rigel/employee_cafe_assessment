import React from "react";
import ReactDOM from "react-dom/client";
import Pages from "./routes";
import "./style/index.scss";
import { store } from "./redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Pages />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
