import { createContext, useCallback, useContext, useEffect } from "react";
import initialBoardState from "@/state/InitialBoardState";
import { useReducer } from "react";
import boardReducer from "@/reducers/boardReducer";
import { useAuth } from "./AuthContext";

// 1. create context
// it like a channel to whom will get the data who subscribed to it
// it is empty by default
const BoardContext = createContext()

const API_BASE = "http://localhost:3000"

export function BoardProvider({ children }) {
    const [boardState, dispatch] = useReducer(boardReducer, initialBoardState);
    const { token, isAuthenticated } = useAuth()

    const authHeaders = useCallback(() => {
        return {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }, [token])

    const loadBoard = useCallback(async () => {
        if(!token)return;

        const response = await fetch(`${API_BASE}/board`, {
            method: "GET",
            headers: authHeaders(),
        })

        const data = await response.json()
        if(!response.ok){
            throw new Error(data?.message || "Failed to load board")
        }

        dispatch({
            type: "SET_BOARD",
            payload: data.board || initialBoardState
        })
    }, [token, authHeaders])

    const addTask = useCallback(
        async ({ columnId, title, tags = [],  description = "" }) => {
            const response = await fetch(`${API_BASE}/tasks`, {
                method: "POST",
                headers: authHeaders(),
                body: JSON.stringify({
                    columnId,
                    title,
                    tags,
                    description
                })
            });

            const data = await response.json()
            if(!response.ok){
                throw new Error(data?.message || "Failed to create task.")
            }

            dispatch({
                type: "ADD_TASK",
                payload: {
                    columnId: data.columnId,
                    task: data.task,
                },
            });
        },
        [authHeaders]
    )

    const updateTask = useCallback(
        async ({ taskId, title, tags, description }) => {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`,  {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({ title, tags, description }),
            });

            const data = await response.json()
            if(!response.ok){
                throw new Error(data?.message || "Failed to update task")
            }

            dispatch({
                type: "UPDATE_TASK",
                payload: {
                    taskId,
                    updateTask: data.task
                }
            })
        },
        [authHeaders]
    );

    const moveTask = useCallback(
        async ({ taskId, sourceColumnId, targetColumnId }) => {
            const response = await fetch(`${API_BASE}/tasks/${taskId}/move`, {
                method: "PATCH",
                headers: authHeaders(),
                body: JSON.stringify({ targetColumnId,  })
            })

            const data = await response.json()
            if(!response.ok){
                throw new Error(data?.message || "Failed to move task")
            }

            dispatch({
                type: "MOVE_TASK",
                payload: {
                    taskId,
                    sourceColumnId,
                    targetColumnId: data.columnId
                }
            });
        },
        [authHeaders]
    )

    const deleteTask = useCallback(
        async ({ taskId }) => {
            const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
                method: "DELETE",
                headers: authHeaders(),
            })

            const data = await response.json()
            if(!response.ok){
                throw new Error(data?.message || "Failed to delete task")
            }

            dispatch({
                type: "DELETE_TASK",
                payload: {
                    taskId: data.taskId,
                    columnId: data.columnId,
                },
            });
        },
        [authHeaders]
    );

    useEffect(() => {
        if(!isAuthenticated || !token){
            dispatch({
                type: "SET_BOARD",
                payload: initialBoardState
            })
            return;
        }

        loadBoard().catch(() => {
            dispatch({ type: "SET_BOARD", payload: initialBoardState })
        })
    }, [isAuthenticated, token, loadBoard]);

    // Any child can access boardState or call dispatch
    return (
        <BoardContext.Provider 
            value={{ 
                boardState, 
                dispatch,
                loadBoard,
                addTask,
                updateTask,
                moveTask,
                deleteTask 
            }}
        >
            {children}
        </BoardContext.Provider>
    );
}

// 3. custom hook for easy access
export function useBoard(){
    return useContext(BoardContext);
}
