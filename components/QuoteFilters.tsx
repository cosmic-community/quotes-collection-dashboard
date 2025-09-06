import { Search, Filter } from 'lucide-react';
import { QuoteFilters as FiltersType, Author, Category } from '@/types';

interface QuoteFiltersProps {
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  authors: Author[];
  categories: Category[];
}

const languageOptions = [
  { key: 'en', value: 'English' },
  { key: 'pt', value: 'Portuguese' },
  { key: 'es', value: 'Spanish' },
  { key: 'fr', value: 'French' },
  { key: 'de', value: 'German' },
];

export function QuoteFilters({ 
  filters, 
  onFiltersChange, 
  authors, 
  categories 
}: QuoteFiltersProps) {
  const updateFilter = (key: keyof FiltersType, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      author: '',
      category: '',
      language: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search quotes..."
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Author Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <select
            value={filters.author}
            onChange={(e) => updateFilter('author', e.target.value)}
            className="select w-full"
          >
            <option value="">All Authors</option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.title}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="select w-full"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => updateFilter('language', e.target.value)}
            className="select w-full"
          >
            <option value="">All Languages</option>
            {languageOptions.map((lang) => (
              <option key={lang.key} value={lang.key}>
                {lang.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}