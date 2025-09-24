const TodoItem = require('../models/todoItem');

// Create Todo (no date now)
exports.createTodoItem = async (req, res, next) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ message: "Task is required." });
    }

    const todoItem = new TodoItem({ task });
    await todoItem.save();

    res.status(201).json(todoItem);
  } catch (error) {
    next(error);
  }
};

// Get all Todos
exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find();
    res.json(todoItems);
  } catch (error) {
    next(error);
  }
};

// Delete Todo (only by ID)
exports.deleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await TodoItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ _id: id });
    }

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Mark Todo as completed
exports.markCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;

    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todoItem.completed = true;
    await todoItem.save();

    res.json(todoItem);
  } catch (error) {
    next(error);
  }
};

// Edit Todo (update task text)
exports.updateTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const todoItem = await TodoItem.findById(id);
    if (!todoItem) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todoItem.task = task || todoItem.task;
    await todoItem.save();

    res.json(todoItem);
  } catch (error) {
    next(error);
  }
};