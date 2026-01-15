import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Columns from "./components/board/Columns";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";

function App() {
	const todo = [
		{
            id: 1,
			title: "Building kanban board",
			tags: ["Building", "Software Development", "Kanban"]
		},
		{
            id: 2,
			title: "Learn Docker",
			tags: ["Docker", "Learning", "containerization"]
		}
	]

    const inprogress = [
        {
            id: 1,
            title: "Preparing for exam",
            tags: ["Exam Preparation", ""]
        }
    ]

    const done = [
        {
            id: 1,
            title: "Apply for an internship",
            tags: ["Internship", "Job", "Application"]
        }
    ]
	return (
		<>
			<NavBar />
			<Outlet />
            <div className="flex flex-row space-x-1 p-1 h-screen">
                <div>
                    <SideBar/>
                </div>
                <div className="flex flex-1 space-x-2">
                    <Columns title={"To do"} tasks={todo} />
                    <Columns title={"In Progress"} tasks={inprogress}/>
                    <Columns title={"Done"} tasks={done}/>
                </div>
            </div>
		</>
	);
}

export default App;
