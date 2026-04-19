import TaskCard from "./TaskCard";
import { Button } from "../ui/button";
import { useBoard } from "@/context/BoardContext";
import { Plus } from "lucide-react";
import { useState } from "react";
import {
    getTaskDragPayload,
    isValidBoardColumn
} from "./dndPayload"

function Columns({ title, tasks, columnId }) {
    const { addTask, moveTask } = useBoard()
    const [isDraggingOver, setIsDraggingOver] = useState(false)

    const handleAddTask = async () => {
        const taskTitle = prompt("Enter task title: ");
        if (!taskTitle || !taskTitle.trim()) return;

        const rawTags = prompt("Enter tags (comma separated):") || ""
        const tags = rawTags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)

        const description = prompt("Enter description:") || ""

        try {
            await addTask({
                columnId,
                title: titleTitle.trim(),
                tags,
                description: description.trim()
            })
        } catch (error) {
            alert(error.message || "Failed to add task");
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = "move"
    }

    const handleDragEnter = (e) => {
        e.preventDefault()
        setIsDraggingOver(true)
    }

    const handleDragLeave = (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
            setIsDraggingOver(false)
        }
    }

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDraggingOver(false)

        const payload = getTaskDragPayload(e.dataTransfer)
        if (!payload) return;

        const { taskId, sourceColumnId } = payload

        if (!isValidBoardColumn(sourceColumnId) || !isValidBoardColumn(columnId)) return

        if (sourceColumnId === columnId) return;

        try {
            await moveTask({
                taskId,
                sourceColumnId,
                targetColumnId: columnId
            })
        } catch (error) {
            alert(error.message || "Failed to move task")
        }
    }

    return (
        <div
            className={[
                "space-y-2 border-2 rounded-3xl flex flex-col p-10 min-h-80 transition-colors",
                isDraggingOver ? "border-blue-500 bg-blue-50/40" : "border-border",
            ].join(" ")}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div>
                <h2 className="font-bold text-xl">{title}</h2>
                <span>Tasks: {tasks.length}</span>
            </div>

            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <div key={task.id}>
                        <TaskCard columnId={columnId} task={task} />
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                className="w-full justify-start text-gray-500 hover:text-black hover:bg-gray-100"
                onClick={handleAddTask}
            >
                <Plus size={16} className="mr-2" />
                Add task
            </Button>
        </div>
    );
}  

export default Columns;
