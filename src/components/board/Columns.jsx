import TaskCard from "./TaskCard";

// title: name of the column (e.g., "To Do", "Done")
// tasks: An array of task objects belongs to this column
function Columns({ title, tasks }) {
	return (
		<div className="space-y-2 border-2 rounded-3xl flex flex-col p-10">
            <div>
                <h2 className="font-bold">{title}</h2>
			    <span>Tasks: {tasks.length}</span>
            </div>
			{/* list of tasks */}
			{tasks.map((task) => (
				<div key={task.id}>
					<TaskCard key={task.id} task={task}/>
				</div>
			))}
		</div>
	);
}

export default Columns;
