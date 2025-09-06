import Link from 'next/link';
import { Quote } from '@/types';
import { ArrowLeft, User, BookOpen, Globe, MessageSquare } from 'lucide-react';

interface QuoteDetailProps {
  quote: Quote;
}

export function QuoteDetail({ quote }: QuoteDetailProps) {
  const author = typeof quote.metadata.author === 'object' ? quote.metadata.author : null;
  const categories = quote.metadata.categories || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Quote Card */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-8">
          {/* Main Quote */}
          <blockquote className="text-2xl font-medium text-gray-900 leading-relaxed mb-8">
            "{quote.metadata.quote_text}"
          </blockquote>

          {/* Author Section */}
          {author && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start space-x-4">
                {author.metadata?.portrait && (
                  <img
                    src={`${author.metadata.portrait.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.title}
                    className="w-20 h-20 rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {author.title}
                    </h3>
                    {author.metadata?.birth_year && (
                      <span className="text-gray-500">
                        ({author.metadata.birth_year}
                        {author.metadata?.death_year && `-${author.metadata.death_year}`})
                      </span>
                    )}
                  </div>
                  
                  {author.metadata?.nationality && author.metadata?.profession && (
                    <p className="text-sm text-gray-600 mb-2">
                      {author.metadata.profession} • {author.metadata.nationality}
                    </p>
                  )}
                  
                  {author.metadata?.bio && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {author.metadata.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quote Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {quote.metadata.source && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Source</span>
                  </div>
                  <p className="text-gray-700">{quote.metadata.source}</p>
                </div>
              )}

              {quote.metadata.language && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">Language</span>
                  </div>
                  <p className="text-gray-700">{quote.metadata.language.value}</p>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {categories.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <span
                        key={category.id}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white"
                        style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="font-medium text-gray-900">Created</span>
                <p className="text-gray-700">
                  {new Date(quote.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Translation */}
          {quote.metadata.translation && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <Globe className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">English Translation</h4>
              </div>
              <blockquote className="text-lg text-blue-800 italic">
                "{quote.metadata.translation}"
              </blockquote>
            </div>
          )}

          {/* Context */}
          {quote.metadata.context && (
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <MessageSquare className="h-5 w-5 text-yellow-600" />
                <h4 className="font-medium text-yellow-900">Context</h4>
              </div>
              <p className="text-yellow-800 leading-relaxed">
                {quote.metadata.context}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}