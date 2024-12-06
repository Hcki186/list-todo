import {TodoItem} from "@/app/types/TodoItem";

export interface TodoList {
  id: string;
  title: string;
  items: TodoItem[];
  createdAt: string;
}