const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {   // ✅ fixed typo: was "createAt"
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('TodoItem', todoItemSchema);