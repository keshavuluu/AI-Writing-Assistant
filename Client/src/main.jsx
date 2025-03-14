import React from "react";
import ReactDOM from "react-dom/client";
import img from "./images/ai.png";
import "./index.css";

import { PrivyProvider } from "@privy-io/react-auth";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cm87nvd78032yo3ztx2pgpvux"
      config={{
        loginMethods: ["email", "wallet", "google", "discord","github"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: img,
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <App/>
    </PrivyProvider>
  </React.StrictMode>
);