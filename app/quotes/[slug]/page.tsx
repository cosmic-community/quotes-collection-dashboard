// app/quotes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getQuote } from '@/lib/cosmic';
import { DashboardLayout } from '@/components/DashboardLayout';
import { QuoteDetail } from '@/components/QuoteDetail';

interface QuotePageProps {
  params: Promise<{ slug: string }>;
}

export default async function QuotePage({ params }: QuotePageProps) {
  const { slug } = await params;
  const quote = await getQuote(slug);

  if (!quote) {
    notFound();
  }

  return (
    <DashboardLayout>
      <QuoteDetail quote={quote} />
    </DashboardLayout>
  );
}