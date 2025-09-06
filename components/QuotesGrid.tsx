'use client';

import { Quote as QuoteIcon } from 'lucide-react';
import { Quote, Author, Category } from '@/types';
import { QuoteCard } from './QuoteCard';

interface QuotesGridProps {
  quotes: Quote[];
  authors: Author[];
  categories: Category[];
}

export function QuotesGrid({ quotes, authors, categories }: QuotesGridProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Quotes Collection
        </h2>
        <p className="text-sm text-gray-500">
          {quotes.length} quotes
        </p>
      </div>

      {quotes.length === 0 ? (
        <div className="text-center py-12">
          <QuoteIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No quotes found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Add some quotes to get started.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      )}
    </div>
  );
}