'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import TodoItem from './TodoItem';
import AddTaskModal from '@/app/components/AddTaskModal';
import { deleteTodoItem, updateTodoItem, createTodoItem, fetchFilteredItemsByListId } from '@/app/services/todoApi';
import { TodoItem as TodoItemType } from '@/app/types/TodoItem';
import { TodoItemForm } from '@/app/types/schemas/todoSchemas';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { TodoListDetailProps } from '@/app/types/TodoListDetailProps';

const TodoListDetail = ({ todoList }: TodoListDetailProps) => {
  const [items, setItems] = useState<TodoItemType[]>(todoList.items);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'All' | 'Active' | 'Done'>('All');
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchItems = async () => {
    try {
      const filteredItems = await fetchFilteredItemsByListId(todoList.id, searchTerm, filter);
      setItems(filteredItems);
    } catch (error) {
      console.error('Error fetching filtered items:', error);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [searchTerm, filter]);

  const handleDeleteItem = async (itemId: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this Todo item?");
    if (confirmDelete) {
      try {
        await deleteTodoItem(todoList.id, itemId);
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleCheckboxChange = async (itemId: string, completed: boolean) => {
    try {
      await updateTodoItem(todoList.id, itemId, completed);
      setItems(prevItems =>
        prevItems.map(item => item.id === itemId ? { ...item, completed } : item)
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleAddItem = async (data: TodoItemForm) => {
    try {
      const newItem = await createTodoItem(todoList.id, data);
      setItems(prevItems => [...prevItems, newItem]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <div>
      <SearchBar
        searchTerm={searchTerm}
        filter={filter}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilter}
      />
      <h1 className="card-title text-3xl text-todo-main mb-5">{todoList.title}</h1>
      <div className="mt-4">
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onDelete={handleDeleteItem}
                onCheckboxChange={handleCheckboxChange}
              />
            ))}
          </ul>
        ) : (
          <p>No records</p>
        )}
      </div>
      <button className="btn btn-link no-underline hover:no-underline text-todo-main" onClick={() => setModalOpen(true)}>
        <PlusCircleIcon className="h-5 w-5 text-todo-main" />Add task
      </button>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddItem}
      />
    </div>
  );
};

export default TodoListDetail;