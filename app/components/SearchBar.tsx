import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { SearchBarProps } from '@/app/types/SearchBarProps';

const SearchBar = ({ searchTerm, filter, onSearchChange, onFilterChange }: SearchBarProps) => (
  <div className="flex gap-2 mb-5">
    <label className="input input-bordered flex items-center gap-2">
      <input
        type="text"
        className="grow"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <MagnifyingGlassIcon className="h-5 w-5 text-grey-500" />
    </label>
    <select
      className="select select-bordered w-full max-w-xs"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value as 'All' | 'Active' | 'Done')}
    >
      <option>All</option>
      <option>Active</option>
      <option>Done</option>
    </select>
  </div>
);

export default SearchBar;