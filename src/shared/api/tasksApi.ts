import type { Task } from '@entities/task/model/types';

const API_URL = 'http://localhost:4000/tasks';

// Получить все задачи
export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Ошибка загрузки задач');
  return res.json();
}

// Получить задачу по id
export async function fetchTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Задача не найдена');
  return res.json();
}

// Создать задачу
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Ошибка создания задачи');
  return res.json();
}

// Обновить задачу
export async function updateTask(id: string, updates: Partial<Task>): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Ошибка обновления задачи');
  return res.json();
}

// Удалить задачу
export async function deleteTask(id: string): Promise<Task> {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Ошибка удаления задачи');
  return res.json();
} 