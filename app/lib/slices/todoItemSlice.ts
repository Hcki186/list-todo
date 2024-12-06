import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoItem } from '@/app/types/TodoItem';

interface TodoItemState {
  items: TodoItem[];
}

const initialState: TodoItemState = {
  items: [],
};

const todoItemSlice = createSlice({
  name: 'todoItems',
  initialState,
  reducers: {
    setTodoItems: (state, action: PayloadAction<TodoItem[]>) => {
      state.items = action.payload;
    },
    deleteTodoItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateTodoItem: (state, action: PayloadAction<{ id: string; completed: boolean }>) => {
      const { id, completed } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.completed = completed;
      }
    },
  },
});

export const { setTodoItems, deleteTodoItem, updateTodoItem } = todoItemSlice.actions;
export const todoItemReducer = todoItemSlice.reducer;