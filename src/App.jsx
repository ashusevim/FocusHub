import "./App.css";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
    return (
        <SidebarProvider>
            <div className="flex flex-col h-screen w-full">
            <NavBar />
                <div className="flex flex-1 overflow-hidden relative">
                    <SideBar />
                    <main className="flex-1 p-2 overflow-auto">
                        <Outlet />
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}

export default App;
