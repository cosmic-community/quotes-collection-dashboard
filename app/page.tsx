import { DashboardLayout } from '@/components/DashboardLayout';
import { QuotesGrid } from '@/components/QuotesGrid';
import { DashboardStats } from '@/components/DashboardStats';
import { getQuotes, getAuthors, getCategories } from '@/lib/cosmic';

export default async function HomePage() {
  const [quotes, authors, categories] = await Promise.all([
    getQuotes(),
    getAuthors(),
    getCategories(),
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Quotes Collection Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your collection of inspiring quotes, authors, and categories
          </p>
        </div>

        <DashboardStats 
          quotesCount={quotes.length}
          authorsCount={authors.length}
          categoriesCount={categories.length}
        />

        <QuotesGrid 
          quotes={quotes}
          authors={authors}
          categories={categories}
        />
      </div>
    </DashboardLayout>
  );
}