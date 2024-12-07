export interface SearchBarProps {
    searchTerm: string;
    filter: 'All' | 'Active' | 'Done';
    onSearchChange: (value: string) => void;
    onFilterChange: (value: 'All' | 'Active' | 'Done') => void;
}