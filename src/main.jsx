import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import store from "./Store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  // <StrictMode> {/* Comment this out temporarily */}
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
