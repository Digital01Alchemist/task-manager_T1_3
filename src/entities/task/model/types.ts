/** Категории задач */
export type TaskCategory =
  | 'Bug'
  | 'Feature'
  | 'Documentation'
  | 'Refactor'
  | 'Test';

/** Статусы выполнения задач */
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';

/** Уровни приоритета задач */
export type TaskPriority = 'Low' | 'Medium' | 'High';

/**
 * Интерфейс задачи
 * Содержит все необходимые поля для управления задачей
 */
export interface Task {
  /** Уникальный идентификатор задачи */
  id: string;
  /** Заголовок задачи (обязательное поле) */
  title: string;
  /** Описание задачи (опциональное) */
  description?: string;
  /** Категория задачи */
  category: TaskCategory;
  /** Текущий статус выполнения */
  status: TaskStatus;
  /** Приоритет задачи */
  priority: TaskPriority;
  /** Дата создания задачи в ISO формате */
  createdAt: string;
}
