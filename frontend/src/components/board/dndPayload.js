export const DND_TASK_TYPE = "application/x-focushub-task"
// const varui = 10

export function setTaskDragPayload(dataTransfer, payload){
    dataTransfer.effectAllowed = "move"
    dataTransfer.setData(DND_TASK_TYPE, JSON.stringify(payload))
}

export function getTaskDragPayload(dataTransfer){
    const raw = dataTransfer.getData(DND_TASK_TYPE);
    if(!raw)return null

    try {
        const parsed = JSON.parse(raw)

        if(!parsed?.taskId || !parsed.sourceColumnId){
            return null;
        }

        return parsed
    } catch (error) {
        return null
    }
}

export function isValidBoardColumn(columnId){
    return ["todo", "inprogress", "done"].includes(columnId)
}