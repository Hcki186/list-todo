import React from 'react';
import { TodoItemProps } from '@/app/types/TodoItemProps';
import { EllipsisHorizontalIcon, TrashIcon } from '@heroicons/react/24/solid';

const TodoItem = ({ item, onDelete, onCheckboxChange }: TodoItemProps) => (
  <li className="navbar border border-300 rounded-box">
    <div className="flex flex-1 flex-col items-start px-2 lg:flex-none">
      <h2 className="text-lg font-bold">{item.title}</h2>
      <p>{item.description}</p>
      <p>Deadline: {new Date(item.deadline).toLocaleDateString()}</p>
    </div>
    <div className="flex flex-1 justify-end px-2">
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text mr-2">Done</span>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={(e) => onCheckboxChange(item.id, e.target.checked)}
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
            <a onClick={() => onDelete(item.id)} className="text-red-500">
              <TrashIcon className="h-5 w-5 text-grey-500" />
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  </li>
);

export default TodoItem;