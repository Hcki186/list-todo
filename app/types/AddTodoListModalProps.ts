import { TodoListForm } from '@/app/types/schemas/todoSchemas';

export interface AddTodoListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TodoListForm) => void;
}