import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
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

export const task = model('Task', taskSchema);
