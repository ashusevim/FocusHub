import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
} from "@/components/ui/sidebar"

import {
    User,
    ChevronsUpDown,
    Settings,
    LayoutDashboard,
    KanbanSquare
} from "lucide-react"
import { NavLink } from "react-router-dom"

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Board",
        url: "/board",
        icon: KanbanSquare,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

const username = "Demo username"
const mailId = "demousername@gmail.com"

export default function SideBar() {
    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <NavLink 
                                            to={item.url}
                                            className={({ isActive }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}    
                                        >
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroup>
                    <SidebarMenuButton size="lg" tooltip="Account">
                        <User className="h-4 w-4" />
                        <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium">{username}</span>
                            <span className="text-xs text-muted-foreground">{mailId}</span>
                        </div>
                        <ChevronsUpDown className="ml-auto h-4 w-4 sm:block group-data-[collapsible=icon]:hidden" />
                    </SidebarMenuButton>
                </SidebarGroup>
            </SidebarFooter>
        </Sidebar>
    )
}