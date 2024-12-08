import { fetchTodoListById } from '@/app/services/todoApi';
import { TodoList } from '@/app/types/TodoList';
import TodoListDetail from '@/app/components/TodoListDetail';
import { TodoListPageProps } from '@/app/types/TodoListPageProps';

export default async function Page({ params }: TodoListPageProps) {
  const { id } = await params;
  const todoList: TodoList = await fetchTodoListById(id);

  return <TodoListDetail todoList={todoList} />;
}