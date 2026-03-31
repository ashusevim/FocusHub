import "./App.css";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function App() {
    const { pathname } = useLocation();
    const { isAuthenticated } = useAuth();

    const isAuthPage = pathname === "/" || pathname === "/login" || pathname === "/register";

    // Logged in user visiting login/register -> go the dashboard
    if(isAuthenticated && isAuthPage){
        return <Navigate to="/dashboard" replace />;
    }

    if(!isAuthenticated && !isAuthPage){
        return <Navigate to="/login" replace />;    
    }

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
