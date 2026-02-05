import TaskCard from "./TaskCard";
import { Button } from "../ui/button";
import { useBoard } from "@/context/BoardContext";
import { Plus } from "lucide-react";

// title: name of the column (e.g., "To Do", "Done")
// tasks: An array of task objects belongs to this column
function Columns({ title, tasks, columnId }) {
    const { dispatch } = useBoard()

    const handleAddTask = () => {
        const title = prompt("Enter task title: ");
        if(!title)return;

        dispatch({
            type: "ADD_TASK",
            columnId: columnId,
            id: Date.now(), // simple unique id
            title: title,
            tags: ["New"]  // default tag
        })
    }

    return (
		<div className="space-y-2 border-2 rounded-3xl flex flex-col p-10">
            <div>
                <h2 className="font-bold text-xl">{title}</h2>
			    <span>Tasks: {tasks.length}</span>
            </div>
			
            {/* list of tasks */}
            <div className="flex flex-col gap-3">
			    {tasks.map((task) => (
                    <div key={task.id}>
					    <TaskCard key={task.id} columnId={columnId} task={task}/>
				    </div>
			    ))}
            </div>

            <Button
                variant="ghost"
                className="w-full justify-start text-gray-500 hover:text-black hover:bg-gray-100"
                onClick={handleAddTask}
            >
                <Plus size={16} className="mr-2"/>
                Add task
            </Button>
		</div>
	);
}

export default Columns;
