import { CircleUserRound, Search, Sun, Moon, Bell, BellRing} from "lucide-react";
import { useState } from "react";  

function NavBar() {
    const [theme, SetTheme] = useState(false);
    const [AnyNotifications, SetAnyNotifications] = useState(false);
    const themeOptions =  ["dark", "light"]

    const toggleTheme = () => {
        SetTheme(!theme)
    }

	return (
		<>
            <nav className="h-20 flex items-center px-1 justify-evenly bg-amber-400 select-none">
                <div className="float-left flex items-center space-x-1 cursor-pointer">
                    <img src="logo.svg" alt="logo" className="h-10 w-auto object-contain"/>
                    <span className="font-bold text-xl">Focushub</span>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex border-2 rounded-xl items-center py-1 px-2 bg-white border-gray-700">
                        <Search className="cursor-pointer h-6 w-5" color="black"/>
                        <input type="text" name="search" id="search" maxLength={20} className="rounded-xl px-1"/>
                    </div>
                    <div onClick={toggleTheme} className="cursor-pointer flex items-center">
                        {theme == false ? <Sun /> : <Moon />}
                    </div>
                    <div>
                        {AnyNotifications ? <BellRing/> : <Bell/>}
                    </div>
                </div>


                <div>
                    <CircleUserRound className="cursor-pointer"/>
                </div>
            </nav>
		</>
	)
}

export default NavBar;