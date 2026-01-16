function boardReducer(state, action){
    switch(action.type){
        case 'ADD_TASK': {

            const newTask = {
                id: action.id,
                title: action.title,
                tags: action.tags || []
            }

            // 1. Add task to task object
            // 2. Add task Id to specific column's taskIds array
            const columnId = action.columnId // know which column!

            // find column, push new tasks, return new state object
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [newTask.id]: newTask
                },
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: [...state.columns[columnId].taskIds, newTask.id]
                    }
                }
            };
        }

        case 'MOVE_TASK': {
            const { taskId, sourceColumnId, targetColumnId } = action;
            // filter out from the source column and push to target column
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColumnId]: {
                        ...state.columns[sourceColumnId],
                        taskIds: state.columns[sourceColumnId].taskIds.filter(id=>id !== taskId)
                    },
                    [targetColumnId]: {
                        ...state.columns[targetColumnId],
                        taskIds: [...state.columns[targetColumnId].taskIds,  taskId]
                    }
                }
            }
        }

        // Return a new array with given task excluded
        case 'DELETE_TASK': {
            const { taskId, columnId } = action;

            // remove the task from the task object
            const newTasks = {...state.tasks};
            delete newTasks[taskId];

            return {
                ...state,
                tasks: newTasks,
                columns: {
                    ...state.columns[columnId],
                    [columnId]: {
                        ...state.columns[columnId],
                        // filter out the taskId from the column
                        taskIds: state.columns[columnId].taskIds.filter(id=>id!==taskId)
                    }
                }
            }
        }
        default:
            return state;
    }
}

export default boardReducer;