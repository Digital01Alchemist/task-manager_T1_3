import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

/**
 * Основной Redux store приложения
 * Настроен с Redux Toolkit для оптимальной производительности
 * Включает автоматическую настройку DevTools в режиме разработки
 */
export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

/**
 * Тип корневого состояния приложения
 * Автоматически выводится из store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Тип диспатча приложения
 * Включает все типы действий из всех reducers
 */
export type AppDispatch = typeof store.dispatch;
