Project: FocusHub
Goal: Building a "Notion/kanban" productivity board using React concept like Routing, Complex State (Reducers), Context, Side Effects, Refs, Portals, and Performance Optimization.

1. Project Overview & Tech Stack
   - The App: A workspace with multiple "Boards". Each board has columns (e.g., "To Do", "Done") and draggable tasks. It includes a Dashboard for stats and a dark mode toggle.
   - Tech Stack:
     - Build Tool: Vite
     - Framework: React (Functional Components & Hooks only)
     - Routing: React Router v6
     - Styling: Tailwind CSS (recommended for speed) or Plain CSS
     - Icons: lucide-react (optional, for UI icons)

2. Concept Checklist
   As you build, check off these concepts to ensure you are truly revising them.

   - [ ] JSX & Rendering: Conditional rendering, lists (keys), fragments.
   - [ ] Props: Passing data, prop drilling vs. composition.
   - [ ] Events: Handling forms, click events, dragging events.
   - [ ] Basic State: useState for simple toggles (modals/inputs).
   - [ ] Complex State: useReducer for the Kanban board logic.
   - [ ] Context API: Global state for Theme and Authentication.
   - [ ] Side Effects: useEffect for data fetching/localStorage.
   - [ ] Refs: useRef for DOM access (focus input) and storing mutable values without re-renders.
   - [ ] Custom Hooks: Extracting logic (e.g., useLocalStorage).
   - [ ] Performance: React.memo, useCallback, useMemo.
   - [ ] Portals: Rendering Modals outside the root DOM hierarchy.

3. Project Structure
   Set up your folders like this to mimic a professional environment:

   ```plaintext
   src/
   ├── components/
   │   ├── layout/       # Navbar, Sidebar, LayoutWrapper
   │   ├── board/        # Column, TaskCard, BoardHeader
   │   ├── common/       # Button, Input, Modal (Reusable UI)
   │   └── dashboard/    # StatsWidget
   ├── context/          # ThemeContext, BoardContext
   ├── hooks/            # useLocalStorage, useDebounce
   ├── pages/
   │   ├── Dashboard.jsx
   │   ├── BoardPage.jsx
   │   └── Settings.jsx
   ├── reducers/         # boardReducer.js (The brain of the app)
   ├── styles/           # Global styles
   └── App.jsx
   ```

4. Phase 1: Setup & Routing
   - Goal: Establish the skeleton and navigation.
   - Initialize: `npm create vite@latest focus-hub -- --template react`
   - Install Router: `npm install react-router-dom`
   - Setup Routes (App.jsx):
     - Create a Layout component (renders a Navbar and `<Outlet />`).
     - Configure routes:
       - `/` -> Dashboard (Overview of tasks)
       - `/board/:boardId` -> The Kanban Board (Dynamic Route)
       - `/settings` -> Settings Page
       - `*` -> 404 Not Found
   - Concept Spotlight: Outlet allows nested UI. The Navbar stays persistent while the content changes based on the URL. `useParams` will be used later to grab the `:boardId`.

5. Phase 2: Core Components (Props & Layout)
   - Goal: Create the static visual structure of the Kanban board.
   - TaskCard Component:
     - Accepts task object as a prop (`{ id, title, tags }`).
     - Renders a simple card div.
   - Column Component:
     - Accepts title and tasks (array).
     - Maps over tasks and renders TaskCards.
   - BoardPage:
     - Create dummy data (JSON).
     - Render 3 Column components ("Todo", "Doing", "Done").
   - Concept Spotlight: Keys. When mapping tasks to TaskCard, ensure you use `task.id` as the key, not the index. This is crucial for React to track item movements efficiently later.

6. Phase 3: Complex State (The Brain)
   - Goal: Move from dummy data to a working useReducer. This is the most important phase.
   - Why useReducer? Moving a card involves removing it from Column A and adding it to Column B. This depends on the previous state and involves complex nested updates. `useState` is too messy for this.
   - Define Action Types:
     - ADD_TASK
     - DELETE_TASK
     - MOVE_TASK
     - ADD_COLUMN
   - Create `boardReducer.js`:
     ```javascript
     export const boardReducer = (state, action) => {
       switch (action.type) {
         case 'ADD_TASK':
           // Logic: Find the column, push new task, return NEW state object (immutable)
           return { ...state, /* updated logic */ };
         case 'MOVE_TASK':
           // Logic: Filter out from source column, push to target column
           return { ...state, /* updated logic */ };
         default:
           return state;
       }
     };
     ```
   - Integrate Context:
     - Create BoardContext.
     - Wrap your app (or BoardPage) in a provider: `<BoardContext.Provider value={{ state, dispatch }}>`.
     - Now, TaskCard can dispatch (`{ type: 'DELETE_TASK' }`) without passing the function down 3 layers.
   - Concept Spotlight: Immutability. In the reducer, never do `state.columns.push()`. You must return a new copy using spread syntax `[...state.columns]`.

7. Phase 4: Side Effects & Refs
   - Goal: Persistence and DOM manipulation.
   - Data Persistence (useEffect):
     - In your Context Provider, use `useEffect` to save state to `localStorage` whenever state changes.
     - Initialize the reducer state by reading from `localStorage`.
   - Auto-Focus (useRef):
     - When clicking "Add Task", a small input form appears.
     - Use `useRef` to target that input and call `inputRef.current.focus()` immediately upon rendering the form.
   - Click Outside (useRef + useEffect):
     - Create a custom hook `useOnClickOutside(ref, handler)` to close the "Add Task" form if the user clicks away from it.

8. Phase 5: Portals & Modals
   - Goal: Render UI outside the standard DOM hierarchy.
   - The Task Detail Modal:
     - When a TaskCard is clicked, open a Modal to edit details.
     - Use `ReactDOM.createPortal(<ModalContent />, document.body)`.
     - This ensures the Modal floats above everything else, unaffected by the `z-index` or `overflow: hidden` of the Kanban columns.

9. Phase 6: Performance Optimization (Crucial)
   - Goal: Prevent lag.
   - The Problem: Add a `console.log('Task render')` inside TaskCard. Type into the "Add Column" input. You will see every task re-render, even though they didn't change.
   - The Fix (React.memo):
     - Wrap TaskCard in `React.memo(TaskCard)`.
     - Now it only re-renders if its props change.
   - The Fix (useCallback):
     - If you pass a function like `onDelete` to TaskCard, simple memoization won't work (because the function is recreated on every parent render).
     - Wrap the handler in `useCallback` in the parent component.
   - The Fix (useMemo):
     - In the Dashboard, calculate "Total Active Tasks".
     - Wrap this calculation in `useMemo` so it doesn't recalculate unless the `boardState` actually changes.

10. Bonus Challenge: Drag and Drop
    - Goal: The final touch.
    - Implement Drag and Drop manually using HTML5 Drag and Drop API (`onDragStart`, `onDragOver`, `onDrop`).
    - Challenge: Store the `draggedItemId` in a ref (not state) to avoid triggering re-renders while dragging the mouse pixel-by-pixel. Only trigger state update on `onDrop`.
