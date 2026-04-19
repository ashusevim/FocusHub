import { createPortal } from "react-dom";
import { useBoard } from "../../context/BoardContext"
import { useState } from "react";

export default function TaskModal({ task, columnId, onClose }){
    const { dispatch } = useBoard();
    const [title, setTitle] = useState(task.title);
    const [tags, setTags] = useState(task.tags.join(", "));
    const [description, setDescription] = useState(task.description || "")

    const handleSave = async () => {
        
        try {
            await updateTask({
                taskId: task.id,
                title: title.trim(),
                tags: tags.split(",").map((tag)=>tag.trim()).filter(Boolean),
                description: description.trim()
            })

            onClose();
        } catch (error) {
            alert(error.message || "Failed to update task")
        }
    }

    const handleCancel = () => onClose();

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content flex flex-col w-10 justify-evenly" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-3xl mb-3 text-foreground">Edit Task</h2>

                <label className="flex items-center mb-2 gap-2 text-foreground">
                    <h2>Title:</h2>
                    <input
                        type="text"
                        value={title}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label className="flex items-center mb-2 gap-2">
                    Tags (comma-separated):
                    <input
                        type="text"
                        value={tags}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5"
                        onChange={(e) => setTags(e.target.value)}
                    />
                </label>

                <label className="flex items-center mb-2 gap-2">
                    Description:
                    <input
                        type="text"
                        value={description}
                        className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <div className="modal-buttons flex gap-2 mt-7">
                    <button onClick={handleSave} className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-primary-foreground h-9 px-4 py-2">
                        Save
                    </button>
                    <button onClick={handleCancel} className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-input bg-background h-9 px-4 py-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}