import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"
import Dashboard from "../src/pages/Dashboard.jsx";
import BoardPage from "../src/pages/BoardPage.jsx";
import Settings from "../src/pages/Settings.jsx";
import { BoardProvider } from "@/context/BoardContext.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path : "login",  element: <LoginPage /> },
            
            { path: "dashboard", element: <Dashboard /> },
            { path: "board", element: <BoardPage /> },
            { path: "settings", element: <Settings /> },
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <BoardProvider>
                <RouterProvider router={router} />
            </BoardProvider>
        </ThemeProvider>
    </React.StrictMode>
);
