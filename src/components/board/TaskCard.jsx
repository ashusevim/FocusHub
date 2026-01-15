function TaskCard({ task }) {
	return (
		<>
			<div className="border-2 rounded-xl p-5 space-y-3">
				<h2 className="font-bold border-b-2 ">{task.title}</h2>

				<div className="space-x-1.5 pt-2">
					<span className=" rounded-4xl bg-black-100 px-3 py-1 text-sm font-medium text-blue-700">
						{task.tags.map((tag)=>(
                            <span className="space-x-1">{tag}</span>
                        ))}
					</span>
				</div>
			</div>
		</>
	);
}

export default TaskCard;
