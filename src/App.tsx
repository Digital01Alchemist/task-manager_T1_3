import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { TaskPage } from './pages/TaskPage';
import { CreateTaskPage } from './pages/CreateTaskPage';

/**
 * Главный компонент приложения
 * Настраивает маршрутизацию и глобальные стили
 * Включает все основные страницы приложения
 */
const App: React.FC = () => (
  <>
    {/* Сброс CSS стилей для кроссбраузерной совместимости */}
    <CssBaseline />
    <HashRouter>
      <Routes>
        {/* Главная страница со списком задач */}
        <Route path="/" element={<HomePage />} />
        {/* Страница создания новой задачи */}
        <Route path="/task/new" element={<CreateTaskPage />} />
        {/* Страница редактирования задачи */}
        <Route path="/task/:id" element={<TaskPage />} />
      </Routes>
    </HashRouter>
  </>
);

export default App;
