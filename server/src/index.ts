import express, { Request, Response } from 'express';
import cors from 'cors';

/**
 * Интерфейс задачи
 * @typedef {Object} Task
 * @property {string} id - Уникальный идентификатор задачи
 * @property {string} title - Название задачи
 * @property {string} description - Описание задачи
 * @property {string} category - Категория задачи
 * @property {string} status - Статус задачи
 * @property {string} priority - Приоритет задачи
 * @property {string} createdAt - Дата создания (ISO-строка)
 */
interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  createdAt: string;
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Хранилище задач в памяти
let tasks: Task[] = [];

/**
 * Получить все задачи, с возможностью поиска по названию и/или дате создания
 * GET /tasks?title=...&date=...
 */
app.get('/tasks', (req: Request, res: Response) => {
  const { title, date } = req.query;
  let result = tasks;
  if (title) {
    result = result.filter((task) =>
      task.title.toLowerCase().includes(String(title).toLowerCase())
    );
  }
  if (date) {
    result = result.filter((task) => task.createdAt.startsWith(String(date)));
  }
  res.json(result);
});

/**
 * Получить задачу по id
 * GET /tasks/:id
 */
app.get('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

/**
 * Создать новую задачу
 * POST /tasks
 */
app.post('/tasks', (req: Request, res: Response) => {
  const { title, description, category, status, priority } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const now = new Date().toISOString();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description: description || '',
    category: category || 'Feature',
    status: status || 'To Do',
    priority: priority || 'Medium',
    createdAt: now,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * Обновить задачу по id
 * PATCH /tasks/:id
 */
app.patch('/tasks/:id', (req: Request, res: Response) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, description, category, status, priority } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (category !== undefined) task.category = category;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  res.json(task);
});

/**
 * Удалить задачу по id
 * DELETE /tasks/:id
 */
app.delete('/tasks/:id', (req: Request, res: Response) => {
  const idx = tasks.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });
  const deleted = tasks.splice(idx, 1)[0];
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 