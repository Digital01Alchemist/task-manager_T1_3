import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import { TaskForm } from '../components/TaskForm';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { updateTask } from '../store/taskSlice';
import type { Task } from '@entities/task/model/types';

/**
 * Страница редактирования задачи
 * Загружает задачу по ID из URL и отображает форму редактирования
 * Показывает ошибку, если задача не найдена
 */
export const TaskPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector(state => state.tasks);

  // Находим задачу по ID из URL
  const task = tasks.find(t => t.id === id);

  // Если задача не найдена, показываем ошибку
  if (!task) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" color="error">
          Задача не найдена
        </Typography>
      </Container>
    );
  }

  /**
   * Обработчик обновления задачи
   * Сохраняет изменения и возвращается на главную страницу
   * @param taskData - Обновленные данные задачи (без id и createdAt)
   */
  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const updatedTask: Task = {
      ...taskData,
      id: task.id,
      createdAt: task.createdAt,
    };
    dispatch(updateTask(updatedTask));
    navigate('/');
  };

  /**
   * Обработчик отмены редактирования
   * Возвращает пользователя на главную страницу
   */
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Редактировать задачу
      </Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialValues={task}
        />
      </Paper>
    </Container>
  );
};
