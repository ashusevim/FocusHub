const initialState = {
    columns: {
        "todo": { id: "todo", title: "To Do", taskIds: [1, 2] },
        "inprogress": { id: "inprogress", title: "In Progress", taskIds: [3] },
        "done": { id: "done", title: "Done", taskIds: [] }
    },
    tasks: {
        1: { id: 1, title: "Building kanban board", tags: ["Building", "Kanban"] },
        2: { id: 2, title: "Learn Docker", tags: ["Docker", "Learning", "containerization"] },
        3: { id: 3, title: "Preparing for exam", tags: ["Exam"] },
        4: { id: 4, title: "Apply for an internship", tags: ["Internship"] }
    }
}

export default initialState