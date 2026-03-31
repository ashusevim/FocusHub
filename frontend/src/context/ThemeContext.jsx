import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "system";
        }
        return "system";
    });

    useEffect(() => {

        // grabs the <html> element, where  the theme class will be applied
        const root = document.documentElement;

        const applyTheme = (resolvedTheme) => {
            // to ensure a clean slate
            root.classList.remove("light", "dark");
            // apply the resolved theme
            root.classList.add(resolvedTheme);
        }

        // Save preference for all modes, including "system".
        localStorage.setItem("theme", theme);

        if (theme === "system") {
            
            // checks user's system preference for dark mode
            // mql = media query list
            // creates a media query list for dark mode
            const mql = window.matchMedia("(prefers-color-scheme: dark)");
            
            // apply the resolved theme 
            applyTheme(mql.matches ? "dark" : "light");
        
            const handler = (e) => {
                applyTheme(e.matches ? "dark" : "light")
            }
            
            // subscribe to changes so if the user toggles their os theme
            mql.addEventListener("change", handler);

            return () => {
                // unsubscribe to changes when the component unmounts or "theme" changes
                mql.removeEventListener("change", handler)
            }

        }
        else{
            // handling explicit themes & apply the resolved theme 
            applyTheme(theme)
        }

    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(){
    const context = useContext(ThemeContext);

    if(!context){
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
