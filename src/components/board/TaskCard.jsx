import { useBoard } from "@/context/BoardContext";
import UiButton from "../UI/UiButton";

function TaskCard({ task, columnId }) {
    const { dispatch } = useBoard()

    const handleMoveTask = () => {
        let targetColumnId = prompt("Enter a columnID (todo, inprogress, done):");
        if (targetColumnId) {
            dispatch({
                type: 'MOVE_TASK',
                taskId: task.id,
                sourceColumnId: columnId,
                targetColumnId: targetColumnId
            })
        }
        else{
            console.log("Invalid target column ID");
        }
    }

    const handleDeleteTask = () => {
        dispatch({
            type: 'DELETE_TASK',
            taskId: task.id,
            columnId: columnId
        })
    }

    return (
        <div className="border-2 rounded-xl p-5 space-y-3">
            <h2 className="font-bold border-b-2 ">{task.title}</h2>

            <div className="space-x-1.5 pt-2">
                {task.tags.map((tag, index) => {
                    <span
                        key={index} className="border bg-amber-100"
                    >{tag}</span>;
                })}
            </div>

            <div className="flex gap-2 pt-4">
                <UiButton
                    text={"Delete"}
                    onClick={handleDeleteTask}
                />
                <UiButton
                    text={"Move"}
                    onClick={handleMoveTask}
                />
            </div>
        </div>
    );
}
export default TaskCard;