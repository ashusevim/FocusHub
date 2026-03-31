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
    const { dispatch } = useBoard();
    const [isOpen, setIsOpen] = useState(false);

    const handleMoveTask = () => {
        let targetColumnId = prompt("Enter a column (todo, inprogress, done):");
        if (targetColumnId) {
            dispatch({
                type: 'MOVE_TASK',
                taskId: task.id,
                sourceColumnId: columnId,
                targetColumnId: targetColumnId
            })
        }
        else {
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

    const handleEdit = () => {
        setIsOpen(true);
    }

    const handleModalClose = () => {
        setIsOpen(false);
    }

    return (
        <>
            <Card size="sm" className="mx-auto w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription className={"flex gap-1"}>
                        {task.tags.map((tag, index) => (
                            <span
                                key={index} className="border bg-amber-100 px-1 rounded text-xs"
                            >{tag}</span>
                        ))}
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
                    <Button
                        variant="default"
                        size="default"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                </CardFooter>
            </Card>
            {isOpen && <TaskModal task={task} columnId={columnId} onClose={handleModalClose} />}
        </>
    )
}