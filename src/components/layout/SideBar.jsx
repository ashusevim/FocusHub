import { NavLink, useNavigate } from "react-router-dom";
import { PanelRightOpen, PanelRightClose, LayoutDashboard, KanbanSquare, Settings, Plus } from "lucide-react"
import { useState } from "react";
import { cn } from "@/lib/utils";

function SideBar() {
    const [opened, setOpened] = useState(true);
    const navigate = useNavigate()

    const navItems = [
        { to:"/dashboard", label: "Dashboard", icon: LayoutDashboard},
        { to:"/boards", label: "My Boards", icon: KanbanSquare},
        { to:"/settings", label: "Settings", icon: Settings},
    ]

    return (
        <>
            <aside className={cn(
                "bg-gray-900 text-gray-100 border-r border-gray-800",
                "transition-all duration-200 ease-in-out",
                "h-[calc(100vh-5rem)]", // full screen height - navbar height
                "flex flex-col",
                opened ? "w-64" : "w-16"
            )}
            >
                <div className="flex items-center justify-center p-4 border-b border-gray-800">
                    <span
                        className={cn("font-semibold", opened ? "block" : "hidden")}
                    >Focushub</span>

                    <button 
                        type="button"
                        className="p-2 rounded focus:outline-none focus:ring-gray-600"    
                        onClick={()=>setOpened((v)=>!v)}
                    >
                        {opened ? <PanelRightClose size={18}/> : <PanelRightOpen size={18}/>}
                    </button>
                </div>

                <nav className="p-2 overflow-y-auto flex-1">
                    <ul className="space-y-2">
                        {navItems.map(({to, label, icon:Icon}) => (
                            <li key={to}>
                                <NavLink
                                    to={to}
                                    title={!opened ? label : undefined}
                                    className={({ isActive })=>(
                                        cn(
                                            "flex items-center gap-3 px-3 py-2 rounded",
                                            "hover:bg-gray-800 transition-colors",
                                            isActive && "bg-gray-800"
                                        )
                                    )}
                                >
                                    <Icon size={18}/>
                                    <span className={cn(opened ? "block" : "hidden")}>{label}</span>
                                </NavLink>
                            </li>
                        ))}

                        <li className="pt-2">
                            <button
                                type="button"
                                title={!opened ? "Create new board" : undefined}
                                className="w-full flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                                onClick={()=>{
                                    navigate('/board');
                                }}
                            >
                                <Plus size={18}/>
                                <span className={cn(opened ? "block" : "hidden")}>
                                    Create new board
                                </span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default SideBar;