// External Modules
const express = require('express');
const todoItemRouter = express.Router();

// Local Module
const todoItemController = require('../controllers/todoItemController');

// Routes
todoItemRouter.post("/", todoItemController.createTodoItem);
todoItemRouter.get("/", todoItemController.getTodoItems);
todoItemRouter.put("/:id/completed", todoItemController.markCompleted);
todoItemRouter.put("/:id", todoItemController.updateTodoItem); 
todoItemRouter.delete("/:id", todoItemController.deleteTodoItem);

module.exports = todoItemRouter;