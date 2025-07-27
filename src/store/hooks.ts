import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

/**
 * Типизированный хук для диспатча действий
 * Обеспечивает полную типизацию для TypeScript
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Типизированный хук для селектора состояния
 * Обеспечивает полную типизацию для TypeScript
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
