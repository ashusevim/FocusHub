import mongooes from 'mongoose';

const taskSchema = new mongooes.Schema({
	title: {
		type: String,
		required: true,
	},
	tags: {
		type: [String],
	},
	description: {
		type: String,
	}
}, { timestamps: true })

export const task = mongooes.model('Task', taskSchema);
