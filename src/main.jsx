import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import "./assets/scss/app.scss";
import AuthProvider from "./helpers/authContext.jsx";
import CommonProvider from "./helpers/CommonContext.jsx";
import PackageProvider from "./helpers/PackagesContext.jsx";
import CartProvider from "./helpers/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <PackageProvider>
          <CommonProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CommonProvider>
        </PackageProvider>
      </AuthProvider>
    </HashRouter>
  </StrictMode>
);
