import { Link } from "react-router-dom";
import { PanelRightOpen, PanelRightClose } from "lucide-react"

function SideBar() {
    let opened = true;
    return (
        <>
            <aside className="w-64 p-4 bg-gray-900 text-gray-100 h-screen">
                <ul className="space-y-7">
                    <li className="block px-3 py-2 rounded hover:bg-gray-700">
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="block px-3 py-2 rounded hover:bg-gray-700">
                        <Link to="/board/:id">My boards</Link>
                    </li>
                    <li className="block px-3 py-2 rounded hover:bg-gray-700">
                        <button type="button">Create new Board</button>
                    </li>
                    <li className="block px-3 py-2 rounded hover:bg-gray-700">
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
                <div className="relative right-0">
                    {opened ? <PanelRightClose/> : <PanelRightOpen/>}
                </div>
            </aside>
        </>
    )
}

export default SideBar;