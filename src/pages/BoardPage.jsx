import initialBoardState from "@/state/InitialBoardState";
import { useReducer } from "react";
import boardReducer from "../reducers/boardReducer"
import Columns from "@/components/board/Columns";

export default function BoardPage() {
    const [boardState, dispatch] = useReducer(boardState, initialBoardState)

    return (
        <div className="flex flex-1 space-x-2">
            {Object.values(boardState.columns).map((col) => {
                // [1, 2] => [{id:1...}, {id:2...}]
                // maps IDs to real task objects
                const columnTasks = col.taskIds.map((taskId) => boardState.tasks[taskId]);

                return (
                    <Columns key={col.id} title={col.title} tasks={columnTasks} />
                );
            })}

            <button
                onClick={() => dispatch({
                    type: 'MOVE_TASK',
                    taskId: 2,
                    sourceColumnId: "todo",
                    targetColumnId: "done"
                })}>
                Move task 1
            </button>
        </div>
    )
}
