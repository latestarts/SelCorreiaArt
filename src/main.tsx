import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { theme as antdTheme } from "antd";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./index.css";
import "./styles/theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AppWithTheme = () => {
  const { isDark } = useTheme();

  const antTheme = {
    algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#ad5d34",
      colorInfo: "#ad5d34",
      colorSuccess: "#2f7d59",
      colorText: isDark ? "#f7efe8" : "#231915",
      colorTextSecondary: isDark ? "#c9b9ae" : "#6e5b53",
      colorBorder: isDark ? "rgba(255, 241, 226, 0.16)" : "rgba(77, 53, 42, 0.14)",
      colorBgContainer: isDark ? "rgba(38, 31, 28, 0.96)" : "rgba(255, 252, 247, 0.96)",
      borderRadius: 18,
      fontFamily: '"Manrope", "Segoe UI", sans-serif',
    },
    components: {
      Button: {
        controlHeight: 44,
        fontWeight: 800,
        defaultShadow: "none",
        primaryShadow: "none",
        borderRadius: 999,
      },
      Card: {
        borderRadiusLG: 26,
      },
      Pagination: {
        itemActiveBg: "#ad5d34",
        itemBg: isDark ? "rgba(38, 31, 28, 0.92)" : "rgba(255, 252, 247, 0.92)",
        itemLinkBg: isDark ? "rgba(38, 31, 28, 0.92)" : "rgba(255, 252, 247, 0.92)",
        colorPrimary: "#fff",
      },
      Drawer: {
        colorBgElevated: isDark ? "rgba(32, 26, 24, 0.98)" : "rgba(255, 252, 247, 0.98)",
      },
    },
  };

  return (
    <ConfigProvider theme={antTheme}>
      <App />
    </ConfigProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ThemeProvider>
          <AppWithTheme />
        </ThemeProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
