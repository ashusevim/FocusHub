import { createContext, useContext } from "react";
import boardReducer from "@/reducers/boardReducer";
import initialBoardState from "@/state/InitialBoardState";
import { useReducer } from "react";

// 1. create context
// it like a channel to whom will get the data who subscribed to it
// it is empty by default
const BoardContext = createContext()

// 2. create provider component
export function BoardProvider({ children }) {
    const [boardState, dispatch] = useReducer(boardReducer, initialBoardState);

    // Any child can access boardState or call dispatch
    return (
        <BoardContext.Provider value={{ boardState, dispatch }}>
            {children}
        </BoardContext.Provider>
    )
}

// 3. custom hook for easy access
export function useBoard(){
    return useContext(BoardContext);
}