import "./App.css";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <>
            <NavBar />
            <div className="flex flex-row space-x-1 p-1 h-[calc(100hv-5rem)]">
                <SideBar />
                <main className="flex-1 p-2 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default App;
