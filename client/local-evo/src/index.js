import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RestaurantContextProvider } from "./context/RestaurantContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RestaurantContextProvider>
      <App />
    </RestaurantContextProvider>
  </React.StrictMode>,
);
