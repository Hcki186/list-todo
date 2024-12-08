import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoListSchema, TodoListForm } from '@/app/types/schemas/todoSchemas';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { AddTodoListModalProps } from '@/app/types/AddTodoListModalProps';

const AddTodoListModal = ({ isOpen, onClose, onSubmit }: AddTodoListModalProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<TodoListForm>({
    resolver: zodResolver(todoListSchema),
    defaultValues: { title: '' },
  });

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <div className="modal-box w-full max-w-xl p-6 rounded-lg shadow-lg bg-base-100">
        <h3 className="font-bold text-lg flex items-center">
          <PlusCircleIcon className="h-6 w-6 text-todo-main mr-2" />
          Add New Todo List
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="form-control mb-4">
            <label className="label">Title</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="input input-bordered"
                  placeholder="Enter todo list title"
                />
              )}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn bg-todo-main text-white hover:bg-todo-main">Add Todo List</button>
            <button type="button" className="btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTodoListModal;