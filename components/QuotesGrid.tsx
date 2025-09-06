'use client';

import { useState, useMemo } from 'react';
import { Quote, Author, Category, QuoteFilters } from '@/types';
import { QuoteCard } from './QuoteCard';
import { QuoteFilters as FiltersComponent } from './QuoteFilters';

interface QuotesGridProps {
  quotes: Quote[];
  authors: Author[];
  categories: Category[];
}

export function QuotesGrid({ quotes, authors, categories }: QuotesGridProps) {
  const [filters, setFilters] = useState<QuoteFilters>({
    search: '',
    author: '',
    category: '',
    language: '',
  });

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesSearch = !filters.search || 
        quote.metadata.quote_text.toLowerCase().includes(filters.search.toLowerCase()) ||
        quote.title.toLowerCase().includes(filters.search.toLowerCase());

      const matchesAuthor = !filters.author || 
        (typeof quote.metadata.author === 'object' && 
         quote.metadata.author?.id === filters.author);

      const matchesCategory = !filters.category || 
        quote.metadata.categories?.some(cat => cat.id === filters.category);

      const matchesLanguage = !filters.language || 
        quote.metadata.language?.key === filters.language;

      return matchesSearch && matchesAuthor && matchesCategory && matchesLanguage;
    });
  }, [quotes, filters]);

  return (
    <div className="space-y-6">
      <FiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        authors={authors}
        categories={categories}
      />

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Quotes Collection
        </h2>
        <p className="text-sm text-gray-500">
          {filteredQuotes.length} of {quotes.length} quotes
        </p>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12">
          <Quote className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No quotes found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search filters or add new quotes.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}