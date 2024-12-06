import {TodoList} from "@/app/types/TodoList";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TodoListState {
  todoLists: TodoList[];
}

const initialState: TodoListState = {
  todoLists: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoLists: (state, action: PayloadAction<TodoList[]>) => {
      state.todoLists = action.payload;
    },
  },
});

export const { setTodoLists } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;