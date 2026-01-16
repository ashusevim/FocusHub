import React from "react";
import ReactDOM from "react-dom/client"
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"
import Dashboard from "../src/pages/Dashboard.jsx";
import BoardPage from "../src/pages/BoardPage.jsx";
import Settings from "../src/pages/Settings.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "board", element: <BoardPage /> },
            { path: "settings", element: <Settings /> },
            { index: true, element: <BoardPage/> } // default route
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
