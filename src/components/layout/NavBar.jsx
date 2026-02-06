"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { ToggleTheme } from "../ui/toggle-theme"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { SidebarTrigger } from "../ui/sidebar"
import { useLocation } from "react-router-dom"

const routeLabels = {
    "/": "Board",
    "/dashboard": "Dashboard",
    "/board": "Board",
    "/settings": "Settings"
}

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    const toggleMenu = () => setIsOpen(!isOpen)

    const currentLabel = routeLabels[location.pathname] || "Page"

    return (
        <div className="flex justify-center w-full py-2 px-4 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex items-center justify-between px-2 sm:px-6 py-2 w-full relative">
                <div className="flex items-center gap-2 sm:gap-3">

                    <SidebarTrigger className="-ml-1 shrink-0" />

                    <div className="h-5 w-px bg-border hidden md:block" />

                    <div className="w-8 h-8 shrink-0 hidden sm:block">
                        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <title>FocusHub Logo - Focused Flow</title>
                            <defs>
                                <linearGradient id="focusGrad" x1="0" y1="0" x2="100" y2="100">
                                    <stop offset="0%" stopColor="#4F46E5" />
                                    <stop offset="100%" stopColor="#7C3AED" />
                                </linearGradient>
                            </defs>

                            <rect x="10" y="20" width="20" height="60" rx="4" fill="#E5E7EB" />
                            <rect x="14" y="28" width="12" height="8" rx="2" fill="#9CA3AF" />
                            <rect x="14" y="40" width="12" height="8" rx="2" fill="#9CA3AF" />

                            <rect x="70" y="20" width="20" height="60" rx="4" fill="#E5E7EB" />
                            <rect x="74" y="28" width="12" height="8" rx="2" fill="#9CA3AF" />
                            <rect x="74" y="40" width="12" height="8" rx="2" fill="#9CA3AF" />

                            <rect x="35" y="10" width="30" height="80" rx="6" fill="url(#focusGrad)" filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))" />
                            <rect x="40" y="35" width="20" height="20" rx="4" fill="white" />
                            <circle cx="50" cy="45" r="6" stroke="url(#focusGrad)" strokeWidth="2.5" />
                            <circle cx="50" cy="45" r="2.5" fill="url(#focusGrad)" />
                        </svg>
                    </div>

                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">FocusHub</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* Desktop CTA Button */}
                <div className="flex items-center gap-2 md:gap-3">
                    <ToggleTheme />

                    <a
                        href="#"
                        className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors border rounded-full hover:bg-accent"
                    >
                        Account
                    </a>

                    {/* mobile menu button */}
                    <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border md:hidden"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-background z-50 pt-20 px-6 md:hidden"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="absolute top-4 right-4 p-2"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            aria-label="Close menu"
                        >
                            <X className="h-6 w-6" />
                        </motion.button>
                        <div className="flex flex-col space-y-6">
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Navigation</span>
                            <a href="/dashboard" className="text-lg font-medium" onClick={toggleMenu}>Dashboard</a>
                            <a href="/board" className="text-lg font-medium" onClick={toggleMenu}>Board</a>
                            <a href="/settings" className="text-lg font-medium" onClick={toggleMenu}>Settings</a>
                            <div className="pt-4 border-t">
                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Preferences</span>
                                <div className="mt-3">
                                    <ToggleTheme />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}