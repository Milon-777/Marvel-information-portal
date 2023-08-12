import ReactDOM from "react-dom/client";

import App from "./components/app/App";

import "./style/style.scss";

let root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
