import "./App.css";
import { Outlet } from "react-router-dom";
import Columns from "./components/board/Columns";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import { useReducer } from "react";
import boardReducer from "./reducers/boardReducer"

const initialState = {
    columns: {
        "todo": { id: "todo", title: "To Do", taskIds: [1, 2] },
        "inprogress": { id: "inprogress", title: "In Progress", taskIds: [3] },
        "done": { id: "done", title: "Done", taskIds }
    },
    tasks: {
        1: { id: 1, title: "Building kanban board", tags: ["Building", "Kanban"] },
        2: { id: 2, title: "Learn Docker", tags: ["Docker", "Learning", "containerization"] },
        3: { id: 1, title: "Preparing for exam", tags: ["Exam"] },
        4: { id: 1, title: "Apply for an internship", tags: ["Internship"] }
    }
}


function App() {
    const [boardState, dispatch] = useReducer(boardReducer, initialState);
    return (
        <>
            <NavBar />
            <Outlet />
            <div className="flex flex-row space-x-1 p-1 h-screen">
                <div>
                    <SideBar />
                </div>
                <div className="flex flex-1 space-x-2">
                    <Columns title={"To do"} tasks={todo} />
                    <Columns title={"In Progress"} tasks={inprogress} />
                    <Columns title={"Done"} tasks={done} />
                </div>
            </div>
        </>
    );
}

export default App;
