// External Modules
const express = require('express');
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // ✅ Load .env file

// Core Module
const path = require('path');

// Local
const rootDir = require('./utils/pathUtils');
const todoItemRouter = require('./routes/todoItemRouter');

const app = express();

// Middleware
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/todo', todoItemRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Page Not Found' });
});

// ✅ Use .env values
const port = process.env.PORT || 3000;
const dbURL = process.env.MONGO_URI;

// MongoDB Connection
mongoose
  .connect(dbURL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err);
  });