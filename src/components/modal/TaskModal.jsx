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
            <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                <h2>Edit Task</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </label>
                <label>
                    Tags (comma-separated):
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </label>
                <div className="modal-buttons">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>,
        document.body
    )
}