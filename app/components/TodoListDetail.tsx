'use client';
import React, { useState } from 'react';
import { TodoList } from '@/app/types/TodoList';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { deleteTodoItem, updateTodoItem } from '@/app/services/todoApi';
interface TodoListDetailProps {
  todoList: TodoList;
}
const TodoListDetail = ({ todoList }: TodoListDetailProps) => {
  const [items, setItems] = useState(todoList.items);
  const handleDeleteItem = async (itemId: string) => {
    try {
      await deleteTodoItem(todoList.id, itemId);
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const handleCheckboxChange = async (itemId: string, completed: boolean) => {
    try {
      await updateTodoItem(todoList.id, itemId, completed);
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, completed } : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  return (
    <div>
      <h1 className="card-title">{todoList.title}</h1>
      <div className="mt-4">
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.id} className="navbar border border-300 rounded-box">
                <div className="flex-1 px-2 lg:flex-none">
                  <div className="flex-1 px-2 lg:flex-none">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <p>{item.description}</p>
                    <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex flex-1 justify-end px-2">
                  <div className="flex items-stretch">
                    <div className="form-control">
                      <label className="cursor-pointer label">
                        <span className="label-text mr-2">Done</span>
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
                          className="checkbox checkbox-error"
                        />
                      </label>
                    </div>
                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                        <EllipsisHorizontalIcon className="h-5 w-5 text-grey-500" />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                        <li>
                          <a onClick={() => handleDeleteItem(item.id)} className="text-red-500">Delete</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No records</p>
        )}
      </div>
    </div>
  );
};
export default TodoListDetail;