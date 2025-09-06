import Link from 'next/link';
import { Quote } from '@/types';
import { ExternalLink, User, Calendar } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  const author = typeof quote.metadata.author === 'object' && quote.metadata.author !== null 
    ? quote.metadata.author 
    : null;
  const categories = quote.metadata.categories || [];
  
  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Quote Text */}
        <blockquote className="text-lg font-medium text-gray-900 leading-relaxed">
          "{quote.metadata.quote_text}"
        </blockquote>

        {/* Author */}
        {quote.metadata.author && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <User className="h-4 w-4" />
            <span>
              — {author ? author.title : typeof quote.metadata.author === 'string' ? quote.metadata.author.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown Author'}
            </span>
            {author?.metadata?.birth_year && (
              <span className="text-gray-400">
                ({author.metadata.birth_year}
                {author.metadata?.death_year && `-${author.metadata.death_year}`})
              </span>
            )}
          </div>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
              >
                {category.title}
              </span>
            ))}
          </div>
        )}

        {/* Language & Source */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            {quote.metadata.language && (
              <span>Language: {quote.metadata.language.value}</span>
            )}
            {quote.metadata.source && (
              <span>Source: {quote.metadata.source}</span>
            )}
          </div>
          
          {/* Only show date if it's valid - removed "No date" fallback */}
          {quote.created_at && !isNaN(new Date(quote.created_at).getTime()) && (
            <div className="flex items-center space-x-1 text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>
                {new Date(quote.created_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <Link
            href={`/quotes/${quote.slug}`}
            className="inline-flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>View Details</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
          
          {quote.metadata.translation && (
            <span className="text-xs text-green-600 font-medium">
              Translation Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
}