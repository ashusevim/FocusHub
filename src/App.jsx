import "./App.css";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
    const pathname = useLocation();

    const isAuthPage = pathname.pathname == "/" || pathname.pathname == "/login" || pathname.pathname == "/register";

    // we are on an auth page, we don't want to show the sidebar or navbar
    if(isAuthPage){
        return (
            <main className="min-h-screen p-4">
                <Outlet />
            </main>
        );

    }

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
