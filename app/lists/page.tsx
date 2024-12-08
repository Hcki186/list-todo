'use client';

import React, { useEffect, useState } from 'react';
import { deleteTodoList, fetchTodoLists, createTodoList } from "@/app/services/todoApi";
import { useRouter } from "next/navigation";
import { TodoList } from "@/app/types/TodoList";
import { EllipsisHorizontalIcon, TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid';
import AddTodoListModal from '@/app/components/AddTodoListModal';
import {TodoListForm} from "@/app/types/schemas/todoSchemas";

const Page = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadTodoLists = async () => {
      setLoading(true);
      try {
        const data = await fetchTodoLists();
        setTodoLists(data);
      } catch (error: unknown) {
        console.error('Unknown error', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTodoLists();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this Todo list?");
    if (confirmDelete) {
      try {
        await deleteTodoList(id);
        setTodoLists(todoLists.filter(list => list.id !== id));
      } catch (error) {
        console.error('Failed to delete Todo list', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Something went wrong while deleting');
        }
      }
    }
  };

  const handleAddTodoList = async (data: TodoListForm) => {
    try {
      const newList = { title: data.title, createdAt: new Date().toISOString(), items: [] };
      const createdList = await createTodoList(newList);
      setTodoLists([...todoLists, createdList]);
      setModalOpen(false);
    } catch (error) {
      console.error('Error creating Todo list:', error);
    }
  };

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="card-title text-3xl text-todo-main mb-5">My Todo lists</h1>
        <button className="btn btn-link no-underline hover:no-underline text-todo-main" onClick={() => setModalOpen(true)}>
          <PlusCircleIcon className="h-5 w-5 text-todo-main" />Add new
        </button>
      </div>
      <AddTodoListModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddTodoList}
      />
      {todoLists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {todoLists.map((list: TodoList) => (
            <div key={list.id} className="card bg-todo-main text-white w-full">
              <div className="card-body py-5">
                <div className="flex justify-between">
                  <h2 className="card-title">{list.title}</h2>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                      <EllipsisHorizontalIcon className="h-5 w-5 text-grey-500" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-4 w-52 p-2 shadow">
                      <li>
                        <a
                          className="text-red-500"
                          onClick={() => handleDelete(list.id)} >
                          <TrashIcon className="h-5 w-5 text-grey-500" />
                          Delete
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <p>Items: {list.items.length}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => router.push(`/lists/${list.id}`)} className="btn">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No records found</p>
      )}
    </div>
  );
};

export default Page;