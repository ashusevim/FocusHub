function boardReducer(state, action) {
    switch (action.type) {

        case "SET_BOARD": {
            return action.payload
        }

        case 'ADD_TASK': {
            const { columnId, task } = action.payload

            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [task.id]: task
                },
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: [...state.columns[columnId].taskIds, task.id]
                    },
                },
            };
        }

        case 'MOVE_TASK': {
            const { taskId, sourceColumnId, targetColumnId } = action.payload;

            // 1. create new source taskIds (remove task)
            const newSourceTaskIds = state.columns[sourceColumnId].taskIds.filter(id => id !== taskId);

            // 2. create new target taskIds (add task)
            const newTargetTaskIds = [...state.columns[targetColumnId].taskIds, taskId]

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColumnId]: {
                        ...state.columns[sourceColumnId],
                        taskIds: newSourceTaskIds
                    },
                    [targetColumnId]: {
                        ...state.columns[targetColumnId],
                        taskIds: newTargetTaskIds
                    },
                },
            };
        }

        case 'DELETE_TASK': {
            const { taskId, columnId } = action.payload;

            // remove the task from the task object
            const newTasks = { ...state.tasks };
            delete newTasks[taskId];

            return {
                ...state,
                tasks: newTasks,
                columns: {
                    ...state.columns,
                    [columnId]: {
                        ...state.columns[columnId],
                        taskIds: state.columns[columnId].taskIds.filter(id => id !== taskId)
                    },
                },
            };
        }

        case 'UPDATE_TASK': {
            const { taskId, updatedTask } = action.payload;

            return {
                ...state,
                tasks: {
                    [taskId]: updatedTask
                }
            }
        }

        default:
            return state;
    }
}

export default boardReducer;