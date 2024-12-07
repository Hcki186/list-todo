import { TodoItemForm } from '@/app/types/schemas/todoSchemas';

export interface TodoListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoItemForm) => void;
}