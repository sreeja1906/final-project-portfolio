const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// 1️⃣ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// 2️⃣ Create Todo schema & model
const todoSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false }
});

const Todo = mongoose.model("Todo", todoSchema);

// 3️⃣ Routes

// GET all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST new todo
app.post('/todos', async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

// PUT (update a todo)
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
