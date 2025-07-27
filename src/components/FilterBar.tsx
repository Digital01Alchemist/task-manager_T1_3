import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { FilterList as FilterIcon } from '@mui/icons-material';
import type {
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '@entities/task/model/types';

/**
 * Пропсы для компонента FilterBar
 */
interface FilterBarProps {
  /** Текущий выбранный статус */
  status: TaskStatus | '';
  /** Функция для изменения статуса */
  setStatus: (status: TaskStatus | '') => void;
  /** Текущая выбранная категория */
  category: TaskCategory | '';
  /** Функция для изменения категории */
  setCategory: (category: TaskCategory | '') => void;
  /** Текущий выбранный приоритет */
  priority: TaskPriority | '';
  /** Функция для изменения приоритета */
  setPriority: (priority: TaskPriority | '') => void;
}

/**
 * Компонент панели фильтров для задач
 * Позволяет фильтровать задачи по статусу, категории и приоритету
 * Отображается в виде карточки с тремя выпадающими списками
 */
export const FilterBar: React.FC<FilterBarProps> = ({
  status,
  setStatus,
  category,
  setCategory,
  priority,
  setPriority,
}) => (
  <Paper sx={{ p: 2, mb: 3, borderRadius: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <FilterIcon color="action" />
      <Typography variant="subtitle2" color="text.secondary">
        Фильтры
      </Typography>
    </Box>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Статус</InputLabel>
        <Select
          value={status}
          label="Статус"
          onChange={e => setStatus(e.target.value as TaskStatus | '')}
        >
          <MenuItem value="">Все статусы</MenuItem>
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={category}
          label="Категория"
          onChange={e => setCategory(e.target.value as TaskCategory | '')}
        >
          <MenuItem value="">Все категории</MenuItem>
          <MenuItem value="Bug">Bug</MenuItem>
          <MenuItem value="Feature">Feature</MenuItem>
          <MenuItem value="Documentation">Documentation</MenuItem>
          <MenuItem value="Refactor">Refactor</MenuItem>
          <MenuItem value="Test">Test</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Приоритет</InputLabel>
        <Select
          value={priority}
          label="Приоритет"
          onChange={e => setPriority(e.target.value as TaskPriority | '')}
        >
          <MenuItem value="">Все приоритеты</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>
    </Box>
  </Paper>
);
