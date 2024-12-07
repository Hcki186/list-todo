'use client';

import React, { useEffect, useState } from 'react';
import { fetchTodoLists } from "@/app/services/todoApi";
import { useRouter } from "next/navigation";
import { TodoList } from "@/app/types/TodoList";

const Page = () => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="card-title">Zoznam všetkých ToDo zoznamov</h1>
      {todoLists.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {todoLists.map((list: TodoList) => (
            <div key={list.id} className="card bg-todo-main text-white w-full">
              <div className="card-body">
                <h2 className="card-title">{list.title}</h2>
                <p>Items: {list.items.length}</p>
                <div className="card-actions justify-end">
                  <button onClick={() => router.push(`/lists/${list.id}`)} className="btn">detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Žiadne ToDo zoznamy neboli nájdené.</p>
      )}
    </div>
  );
};

export default Page;