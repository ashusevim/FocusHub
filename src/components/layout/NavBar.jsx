"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToggleTheme } from "../ui/toggle-theme"

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <div className="flex justify-center w-full py-6 px-4">
            <div className="flex items-center justify-evenly px-6 py-3 bg-white rounded-full shadow-lg w-full max-w-3xl relative z-10">
                <div className="flex items-center justify-center">
                    <motion.div
                        className="w-8 h-8 mr-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        whileHover={{ rotate: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </motion.div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8">
                    {["Board"].map((item) => (
                        <motion.div
                            key={item}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <a href="#" className="text-sm text-gray-900 hover:text-gray-600 transition-colors font-medium">
                                {item}
                            </a>
                        </motion.div>
                    ))}
                </nav>

                <div className="relative flex w-full items-center justify-center mx-4">
			        <div
				        aria-hidden="true"
				        className={cn(
					        'absolute inset-0 -z-10 size-full',
					        'bg-[radial-gradient(color-mix(in_oklab,--theme(--color-foreground/.1)30%,transparent)_2px,transparent_2px)]',
					    'bg-size:12px_12px',
				    )}
			    />
			        <ToggleTheme />
		        </div>

                {/* Desktop CTA Button */}
                <motion.div
                    className="hidden md:block"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-5 py-2 text-sm text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
                    >
                        Get Started
                    </a>
                </motion.div>

                {/* Mobile Menu Button */}
                <motion.button className="md:hidden flex items-center" onClick={toggleMenu} whileTap={{ scale: 0.9 }}>
                    <Menu className="h-6 w-6 text-gray-900" />
                </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-white z-50 pt-24 px-6 md:hidden"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-2"
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <X className="h-6 w-6 text-gray-900" />
                        </motion.button>
                        <div className="flex flex-col space-y-6">
                            {["Home", "Pricing", "Docs", "Projects"].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.1 }}
                                    exit={{ opacity: 0, x: 20 }}
                                >
                                    <a href="#" className="text-base text-gray-900 font-medium" onClick={toggleMenu}>
                                        {item}
                                    </a>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="pt-6"
                            >
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center w-full px-5 py-3 text-base text-white bg-black rounded-full hover:bg-gray-800 transition-colors "
                                    onClick={toggleMenu}
                                >
                                    Get Started
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}