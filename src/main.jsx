import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import BoardPage from "../pages/BoardPage.jsx";
import Settings from "../pages/Settings.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />}/>
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/board" element={<BoardPage />} />
			<Route path="/settings" element={<Settings />} />
			<Route path="*" element={ <Error/>} />
		</Routes>
	</BrowserRouter>,
);
