import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Columns from "../pages/components/board/Columns";

function App() {
	const tasks = [
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
	return (
		<>
			{/* <Navbar />*/}
			{/* <Outlet />*/}

			<Columns title={"To do"} tasks={tasks} />

			{/* <TaskCard task={task}/>*/}
		</>
	);
}

export default App;
