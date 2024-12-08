import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoItemSchema, TodoItemForm } from '@/app/types/schemas/todoSchemas';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { TodoListModalProps } from '@/app/types/TodoListModalProps';

const AddTaskModal = ({ isOpen, onClose, onSubmit }: TodoListModalProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm<TodoItemForm>({
    resolver: zodResolver(todoItemSchema),
    defaultValues: { title: '', description: '', deadline: '', completed: false },
  });

  if (!isOpen) return null;

  return (
    <dialog className="modal modal-open" open>
      <div className="modal-box w-full max-w-2xl p-6 rounded-lg shadow-lg bg-base-100">
        <h3 className="font-bold text-lg flex items-center">
          <PlusCircleIcon className="h-6 w-6 text-todo-main mr-2" />
          Add New Task
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="form-control mb-4">
            <label className="label">Title</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="text" {...field} className="input input-bordered" placeholder="Enter task title" />}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="form-control mb-4">
            <label className="label">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => <textarea {...field} className="textarea textarea-bordered" placeholder="Enter task description"></textarea>}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
          <div className="form-control mb-4">
            <label className="label">Deadline</label>
            <Controller
              name="deadline"
              control={control}
              defaultValue=""
              render={({ field }) => <input type="datetime-local" {...field} className="input input-bordered" />}
            />
            {errors.deadline && <span className="text-red-500">{errors.deadline.message}</span>}
          </div>
          <div className="modal-action">
            <button type="submit" className="btn bg-todo-main text-white hover:bg-todo-main">Add Task</button>
            <button type="button" className="btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AddTaskModal;