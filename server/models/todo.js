const { Schema, model, ObjectId } = require('mongoose')

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please fill in todo name']
    },
    description: {
        type: String
    },
    isDone: {
        type: Boolean,
        default: false
    },
    due_date: {
        type: Date
    },
    project_id: { type: ObjectId, ref: 'Project' },
    user_id: { type: ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = model('Todo', todoSchema)