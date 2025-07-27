import React from 'react';
import { Box } from '@mui/material';
import { TaskItem } from './TaskItem';
import type { Task } from '@entities/task/model/types';

/**
 * Пропсы для компонента TaskList
 */
interface TaskListProps {
  /** Массив задач для отображения */
  tasks: Task[];
}

/**
 * Компонент для отображения списка задач в адаптивной сетке
 * Автоматически сортирует задачи по дате создания (новые сверху)
 * Использует CSS Grid для адаптивного отображения
 */
export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  // Сортируем задачи по дате создания (новые сверху)
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <Box
      sx={{
        display: 'grid',
        // Принудительно используем десктопную сетку
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: 4,
        mt: 3,
        // Более четкие breakpoints
        '@media (max-width: 768px)': {
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
        },
        '@media (max-width: 480px)': {
          gridTemplateColumns: '1fr',
          gap: 2,
        },
        // Минимальная ширина контейнера для десктопа
        minWidth: '100%',
        width: '100%',
      }}
    >
      {sortedTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
};
