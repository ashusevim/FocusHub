import Columns from "@/components/board/Columns";
import { useBoard } from "@/context/BoardContext";

export default function BoardPage() {
    const {boardState, dispatch} = useBoard();

    return (
        <div className="flex flex-1 space-x-2">
            {Object.values(boardState.columns).map((col) => {
                // [1, 2] => [{id:1...}, {id:2...}]
                // maps IDs to real task objects
                const columnTasks = col.taskIds.map((taskId)=>boardState.tasks[taskId]);

                return (
                    <Columns key={col.id} columnId={col.id} title={col.title} tasks={columnTasks} />
                );
            })}
        </div>
    )
}
