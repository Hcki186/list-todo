import { TodoList } from "@/app/types/TodoList";
import { TodoItem } from "@/app/types/TodoItem";
import { TodoItemForm } from "@/app/types/schemas/todoSchemas";

const API_URL = `https://${process.env.NEXT_PUBLIC_API_KEY}.mockapi.io/api/TodoList`;

export const fetchTodoLists = async (): Promise<TodoList[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch Todo lists');
  }
  return response.json();
};

export const fetchTodoListById = async (id: string): Promise<TodoList> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Todo list with id: ${id}`);
  }
  return response.json();
};

export const createTodoList = async (newList: { createdAt: string; title: string; items: never[] }): Promise<TodoList> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newList),
  });
  if (!response.ok) {
    throw new Error('Failed to create Todo list');
  }
  return response.json();
};

export const deleteTodoList = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete Todo list with id: ${id}`);
  }
};

export const createTodoItem = async (listId: string, newItem: TodoItemForm): Promise<TodoItem> => {
  const response = await fetch(`${API_URL}/${listId}/TodoItem`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  });
  if (!response.ok) {
    throw new Error(`Failed to create task for Todo list with id: ${listId}`);
  }
  return response.json();
};

export const updateTodoItem = async (listId: string, itemId: string, completed: boolean): Promise<void> => {
  const response = await fetch(`${API_URL}/${listId}/TodoItem/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update item with id: ${itemId}`);
  }
};

export const deleteTodoItem = async (listId: string, taskId: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${listId}/TodoItem/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete task with id: ${taskId} from Todo list with id: ${listId}`);
  }
};

export const fetchFilteredItemsByListId = async (
  listId: string,
  searchTerm: string,
  filter: 'All' | 'Active' | 'Done'
): Promise<TodoItem[]> => {
  try {
    const url = new URL(`${API_URL}/${listId}/TodoItem`);
    if (searchTerm) {
      url.searchParams.append('title', searchTerm);
    }
    if (filter === 'Active') {
      url.searchParams.append('completed', 'false');
    } else if (filter === 'Done') {
      url.searchParams.append('completed', 'true');
    }

    const response = await fetch(url.toString());
    if (!response.ok) {
      console.warn('No items matched the search criteria.');
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching filtered items:', error);
    return [];
  }
};