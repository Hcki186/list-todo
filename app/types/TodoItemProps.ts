import { TodoItem as TodoItemType } from "@/app/types/TodoItem";

export interface TodoItemProps {
  item: TodoItemType;
  onDelete: (itemId: string) => void;
  onCheckboxChange: (itemId: string, completed: boolean) => void;
}