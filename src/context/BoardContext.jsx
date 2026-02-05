import { createContext, useContext, useEffect } from "react";
import initialBoardState from "@/state/InitialBoardState";
import { useReducer } from "react";
import boardReducer from "@/reducers/boardReducer";

// 1. create context
// it like a channel to whom will get the data who subscribed to it
// it is empty by default
const BoardContext = createContext()

// load from the localStorage or fall back to the initialBoardState
const loadState = () => {
    try{
        const localData = localStorage.getItem("boardState");
        return localData ? JSON.parse(localData) : initialBoardState;
    }   
    catch{
        return initialBoardState;
    }
}

export function BoardProvider({ children }) {
    // our initialization function does not require external input to calculate the starting state
    const [boardState, dispatch] = useReducer(boardReducer, undefined, loadState);

    // Side-Effect: save to localStorage whenever board state changes
    useEffect(() => {
        localStorage.setItem("boardState", JSON.stringify(boardState));
    }, [boardState])

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