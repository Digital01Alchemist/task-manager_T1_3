import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@entities/task/model/types';
import * as tasksApi from '../shared/api/tasksApi';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await tasksApi.fetchTasks();
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const createTask = createAsyncThunk('tasks/create', async (task: Omit<Task, 'id'>, { rejectWithValue }) => {
  try {
    return await tasksApi.createTask(task);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue }) => {
  try {
    return await tasksApi.updateTask(id, updates);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: string, { rejectWithValue }) => {
  try {
    return await tasksApi.deleteTask(id);
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // createTask
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // updateTask
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.tasks[idx] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
