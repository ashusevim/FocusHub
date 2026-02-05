import { useBoard } from "@/context/BoardContext";
import UiButton from "../UI/UiButton";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function TaskCard({ task, columnId }) {
    const { dispatch } = useBoard();

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
        <Card size="sm" className="mx-auto w-full max-w-sm">
            <CardHeader>
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>
                    {task.tags.map((tag, index) => {
                        <span
                            key={index} className="border bg-amber-100"
                        >{tag}</span>;
                    })}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    The card component supports a size prop that can be set to
                    &quot;sm&quot; for a more compact appearance.
                </p>
            </CardContent>
            <CardFooter className={"gap-2"}>
                <Button 
                    variant="default"   
                    size="default" 
                    onClick={handleDeleteTask}
                >
                    Delete
                </Button>
                <Button 
                    variant="default"   
                    size="default" 
                    onClick={handleMoveTask}
                >
                    Move
                </Button>
            </CardFooter>
        </Card>
    )
}


// function TaskCard({ task, columnId }) {
//     const { dispatch } = useBoard()

//     const handleMoveTask = () => {
//         let targetColumnId = prompt("Enter a columnID (todo, inprogress, done):");
//         if (targetColumnId) {
//             dispatch({
//                 type: 'MOVE_TASK',
//                 taskId: task.id,
//                 sourceColumnId: columnId,
//                 targetColumnId: targetColumnId
//             })
//         }
//         else{
//             console.log("Invalid target column ID");
//         }
//     }

//     const handleDeleteTask = () => {
//         dispatch({
//             type: 'DELETE_TASK',
//             taskId: task.id,
//             columnId: columnId
//         })
//     }

//     return (
//         <div className="border-2 rounded-xl p-5 space-y-3">

//             <div className="space-x-1.5 pt-2">
//                 {task.tags.map((tag, index) => {
//                     <span
//                         key={index} className="border bg-amber-100"
//                     >{tag}</span>;
//                 })}
//             </div>

//             <div className="flex gap-2 pt-4">
//                 <UiButton
//                     text={"Delete"}
//                     onClick={handleDeleteTask}
//                 />
//                 <UiButton
//                     text={"Move"}
//                     onClick={handleMoveTask}
//                 />
//             </div>
//         </div>
//     );
// }
// export default TaskCard;