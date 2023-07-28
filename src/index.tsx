import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";
import MarvelService from "./services/MarvelService";
import "./style/style.scss";
import { CharacterResponse } from "./services/ResponseInterfaces";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
