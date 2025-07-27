import React from 'react';
import type { Task } from '@entities/task/model/types';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Box,
  Tooltip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { deleteTask } from '../store/taskSlice';

/**
 * Пропсы для компонента TaskItem
 */
interface TaskItemProps {
  /** Задача для отображения */
  task: Task;
}

/**
 * Определяет цвет для различных типов меток (категория, статус, приоритет)
 * @param type - Тип метки ('category', 'status', 'priority')
 * @param value - Значение метки
 * @returns Цвет для Material-UI компонента
 */
const getColor = (type: string, value: string) => {
  if (type === 'category') {
    switch (value) {
      case 'Bug':
        return 'error';
      case 'Feature':
        return 'primary';
      case 'Documentation':
        return 'info';
      case 'Refactor':
        return 'secondary';
      case 'Test':
        return 'success';
      default:
        return 'default';
    }
  }
  if (type === 'status') {
    switch (value) {
      case 'To Do':
        return 'default';
      case 'In Progress':
        return 'warning';
      case 'Done':
        return 'success';
      default:
        return 'default';
    }
  }
  if (type === 'priority') {
    switch (value) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  }
  return 'default';
};

/**
 * Форматирует дату в относительный формат для лучшего UX
 * Показывает "Только что", "2 ч. назад", "3 дн. назад" или полную дату
 * @param dateString - ISO строка даты
 * @returns Отформатированная строка времени
 */
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      return 'Только что';
    }
    return `${diffInHours} ч. назад`;
  } else if (diffInHours < 168) {
    // 7 дней
    const days = Math.floor(diffInHours / 24);
    return `${days} дн. назад`;
  } else {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
};

/**
 * Определяет цвет для отображения времени в зависимости от свежести задачи
 * @param dateString - ISO строка даты
 * @returns Цвет для Material-UI компонента
 */
const getTimeColor = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 24) return 'success';
  if (diffInHours < 168) return 'warning';
  return 'text.secondary';
};

/**
 * Карточка задачи с полной информацией и интерактивными элементами
 * Отображает заголовок, описание, метки, время создания и кнопки действий
 */
export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  /**
   * Обработчик удаления задачи с подтверждением
   * @param e - Событие клика
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      dispatch(deleteTask(task.id));
    }
  };

  /**
   * Обработчик перехода к редактированию задачи
   */
  const handleEdit = () => {
    navigate(`/task/${task.id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
        },
      }}
      onClick={handleEdit}
    >
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              flex: 1,
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            {task.title}
          </Typography>
          <Tooltip title="Удалить задачу">
            <IconButton
              size="small"
              color="error"
              onClick={handleDelete}
              sx={{ ml: 1, flexShrink: 0 }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flex: 1,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.4,
            }}
          >
            {task.description}
          </Typography>
        )}

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
          <Chip
            label={task.category}
            color={getColor('category', task.category)}
            size="small"
            variant="outlined"
          />
          <Chip
            label={task.status}
            color={getColor('status', task.status)}
            size="small"
          />
          <Chip
            label={task.priority}
            color={getColor('priority', task.priority)}
            size="small"
            variant="outlined"
          />
        </Stack>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TimeIcon
              sx={{ fontSize: 16, color: getTimeColor(task.createdAt) }}
            />
            <Typography
              variant="caption"
              color={getTimeColor(task.createdAt)}
              sx={{ fontWeight: 500 }}
            >
              {formatDate(task.createdAt)}
            </Typography>
          </Box>
          <Tooltip title="Редактировать задачу">
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={e => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              Изменить
            </Button>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};
