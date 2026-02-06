import { createPortal } from "react-dom";
import { useBoard } from "../../context/BoardContext"
import { useContext, useState } from "react";

export default function TaskModal({ task, columnId, onClose }){
    const { dispatch } = useBoard();
    const [title, setTitle] = useState(task.title);
    const [tags, setTags] = useState(task.tags.join(", "));

    const handleSave = () => {
        const updatedTask = {
            ...task,
            title,
            tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag)
        }

        dispatch({
            type: 'UPDATE_TASK',
            payload: {
                columnId,
                taskId: task.id,
                updatedTask
            }
        })

        onClose();
    }

    const handleCancel = () => {
        onClose();
    }

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content flex flex-col w-10 justify-evenly" onClick={(e)=>e.stopPropagation()}>
                <h2 className="text-3xl mb-3 text-foreground">Edit Task</h2>
                <label className="flex items-center mb-2 gap-2 text-foreground">
                    <h2>Title:</h2>
                    <input
                        type="text"
                        value={title}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </label>
                <label className="flex items-center mb-2 gap-2">
                    Tags (comma-separated):
                    <input
                        type="text"
                        value={tags}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                        onChange={(e) => {
                            setTags(e.target.value)
                        }}
                    />
                </label>
                <div className="modal-buttons flex gap-2 mt-7">
                    <button onClick={handleSave} className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90 h-9 px-4 py-2">Save</button>
                    <button onClick={handleCancel} className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">Cancel</button>
                </div>
            </div>
        </div>,
        document.body
    )
}