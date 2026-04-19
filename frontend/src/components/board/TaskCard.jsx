import { useBoard } from "@/context/BoardContext";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import TaskModal from "../modal/TaskModal";

export default function TaskCard({ task, columnId }) {
    const { moveTask, deleteTask } = useBoard()
    const [isOpen, setIsOpen] = useState(false);

    const handleMoveTask = async () => {
        let targetColumnId = prompt("Enter a column (todo, inprogress, done):");
        
        if(!targetColumnId){
            return
        }

        try {
            await moveTask({
                taskId: task.id,
                sourceColumnId: columnId,
                targetColumnId,
            });
        } catch (error) {
            alert(error.message || "Failed to move task")
        }
    }

    const handleDeleteTask = async () => {
        try {
            await deleteTask({ taskId: task.id })
        } catch (error) {
            alert(error.message || "Failed to delete task")
        }
    }

    return (
        <>
            <Card size="sm" className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription className="flex gap-1 flex-wrap">
                        {(task.tags || []).map((tag, index) => (
                            <span key={index} className="border bg-amber-100 px-1 rounded text-xs">
                                {tag}
                            </span>
                        ))}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{task.description || "No description"}</p>
                </CardContent>
                <CardFooter className="gap-2">
                    <Button onClick={handleDeleteTask}>Delete</Button>
                    <Button onClick={handleMoveTask}>Move</Button>
                    <Button onClick={() => setIsOpen(true)}>Edit</Button>
                </CardFooter>
            </Card>
            {isOpen && <TaskModal task={task} columnId={columnId} onClose={() => setIsOpen(false)} />}
        </>
    );
}