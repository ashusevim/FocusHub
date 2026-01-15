function boardReducer(state, action){
    switch(action.type){
        case 'ADD_TASK': {
            // find column, push new tasks, return new state object
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    tags: action.tags
                }
            ]
        }

        case 'MOVE_TASK': {

        }

        // Return a new array with given task excluded
        case 'DELETE_TASK': {
            return state.filter((t)=> t.id !== action.id)
        }

        case 'ADD_COLUMN': {
            
        }
    }
}

export default boardReducer;