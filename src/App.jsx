import "./App.css";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
    return (
        <SidebarProvider>
            <SideBar />
            <SidebarInset>
            <NavBar />
                <main className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default App;
