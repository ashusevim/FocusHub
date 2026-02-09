import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	numberOftasks: {
		type: Number,
		default: 0,
	},
	tags: {
		type: [String],
	},
	description: {
		type: String,
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task"
		}
	]
}, { timestamps: true })

export const column = mongoose.model('Column', columnSchema);
