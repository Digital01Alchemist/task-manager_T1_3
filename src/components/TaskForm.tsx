import React, { useState, useEffect } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import type {
  Task,
  TaskCategory,
  TaskStatus,
  TaskPriority,
} from '@entities/task/model/types';

/**
 * Пропсы для компонента TaskForm
 */
interface TaskFormProps {
  /** Функция обратного вызова при отправке формы */
  onSubmit: (taskData: Omit<Task, 'id' | 'createdAt'>) => void;
  /** Функция обратного вызова при отмене */
  onCancel: () => void;
  /** Начальные значения для формы (для редактирования) */
  initialValues?: Partial<Task>;
}

/**
 * Универсальная форма для создания и редактирования задач
 * Поддерживает валидацию и обработку всех полей задачи
 */
export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
}) => {
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    category: (initialValues?.category as TaskCategory) || 'Feature',
    status: (initialValues?.status as TaskStatus) || 'To Do',
    priority: (initialValues?.priority as TaskPriority) || 'Medium',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        description: initialValues.description || '',
        category: (initialValues.category as TaskCategory) || 'Feature',
        status: (initialValues.status as TaskStatus) || 'To Do',
        priority: (initialValues.priority as TaskPriority) || 'Medium',
      });
    }
  }, [initialValues]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Заголовок обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          fullWidth
          label="Заголовок задачи"
          value={formData.title}
          onChange={e => handleChange('title', e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          required
        />

        <TextField
          fullWidth
          label="Описание"
          value={formData.description}
          onChange={e => handleChange('description', e.target.value)}
          multiline
          rows={4}
        />

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Категория</InputLabel>
            <Select
              value={formData.category}
              label="Категория"
              onChange={e => handleChange('category', e.target.value)}
              required
            >
              <MenuItem value="Bug">Bug</MenuItem>
              <MenuItem value="Feature">Feature</MenuItem>
              <MenuItem value="Documentation">Documentation</MenuItem>
              <MenuItem value="Refactor">Refactor</MenuItem>
              <MenuItem value="Test">Test</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Статус</InputLabel>
            <Select
              value={formData.status}
              label="Статус"
              onChange={e => handleChange('status', e.target.value)}
              required
            >
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 200, flex: 1 }}>
            <InputLabel>Приоритет</InputLabel>
            <Select
              value={formData.priority}
              label="Приоритет"
              onChange={e => handleChange('priority', e.target.value)}
              required
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
