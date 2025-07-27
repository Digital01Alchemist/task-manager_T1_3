import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TaskList } from '../components/TaskList';
import { FilterBar } from '../components/FilterBar';
import { useAppSelector } from '../store/hooks';
import type {
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '@entities/task/model/types';

/**
 * Главная страница приложения
 * Отображает список задач с фильтрацией и счетчиками
 * Показывает адаптивные состояния для пустых списков
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks } = useAppSelector(state => state.tasks);

  // Состояние фильтров
  const [status, setStatus] = useState<TaskStatus | ''>('');
  const [category, setCategory] = useState<TaskCategory | ''>('');
  const [priority, setPriority] = useState<TaskPriority | ''>('');

  /**
   * Фильтрует задачи на основе выбранных фильтров
   * Применяет фильтры по статусу, категории и приоритету одновременно
   */
  const filteredTasks = tasks.filter(task => {
    return (
      (status === '' || task.status === status) &&
      (category === '' || task.category === category) &&
      (priority === '' || task.priority === priority)
    );
  });

  return (
    <Container
      maxWidth={false}
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        // Принудительно используем всю ширину на десктопе
        '@media (min-width: 1200px)': {
          maxWidth: '1400px',
        },
        '@media (min-width: 1600px)': {
          maxWidth: '1600px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Менеджер задач
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Всего задач:
            </Typography>
            <Chip
              label={tasks.length}
              size="small"
              color="primary"
              variant="outlined"
            />
            {filteredTasks.length !== tasks.length && (
              <>
                <Typography variant="body2" color="text.secondary">
                  Показано:
                </Typography>
                <Chip
                  label={filteredTasks.length}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </>
            )}
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/task/new')}
          sx={{
            px: 3,
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Создать задачу
        </Button>
      </Box>

      {/* Показываем фильтры только если есть задачи */}
      {tasks.length > 0 && (
        <FilterBar
          status={status}
          setStatus={setStatus}
          category={category}
          setCategory={setCategory}
          priority={priority}
          setPriority={setPriority}
        />
      )}

      {/* Состояние: есть задачи, но фильтры не дают результатов */}
      {filteredTasks.length === 0 && tasks.length > 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Задачи не найдены
          </Typography>
          <Typography variant="body2">
            Попробуйте изменить фильтры или создать новую задачу
          </Typography>
        </Box>
      ) : (
        <TaskList tasks={filteredTasks} />
      )}

      {/* Состояние: нет задач вообще */}
      {tasks.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            color: 'text.secondary',
          }}
        >
          <Typography variant="h6" gutterBottom>
            У вас пока нет задач
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Создайте первую задачу, чтобы начать работу
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/task/new')}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Создать первую задачу
          </Button>
        </Box>
      )}
    </Container>
  );
};
