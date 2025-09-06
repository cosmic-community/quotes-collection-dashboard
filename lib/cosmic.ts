import { createBucketClient } from '@cosmicjs/sdk';
import type { Quote, Author, Category, CosmicResponse } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all quotes with related data
export async function getQuotes(): Promise<Quote[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'quotes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    // Sort quotes by creation date (newest first)
    return (response.objects as Quote[]).sort((a, b) => {
      const dateA = new Date(a.created_at || '').getTime();
      const dateB = new Date(b.created_at || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch quotes');
  }
}

// Fetch single quote by slug
export async function getQuote(slug: string): Promise<Quote | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'quotes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);

    return response.object as Quote;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch quote');
  }
}

// Fetch all authors
export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata']);

    return response.objects as Author[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch authors');
  }
}

// Fetch single author by slug
export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata']);

    return response.object as Author;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch author');
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata']);

    return response.objects as Category[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

// Create new quote
export async function createQuote(data: {
  title: string;
  metadata: {
    quote_text: string;
    author: string;
    source?: string;
    categories?: string[];
    language?: { key: string; value: string };
    translation?: string;
    context?: string;
  };
}): Promise<Quote> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'quotes',
      title: data.title,
      metadata: {
        quote_text: data.metadata.quote_text,
        author: data.metadata.author,
        source: data.metadata.source || '',
        categories: data.metadata.categories || [],
        language: data.metadata.language,
        translation: data.metadata.translation || '',
        context: data.metadata.context || '',
      },
    });

    return response.object as Quote;
  } catch (error) {
    throw new Error('Failed to create quote');
  }
}

// Update existing quote
export async function updateQuote(
  id: string,
  data: {
    title?: string;
    metadata: {
      quote_text?: string;
      author?: string;
      source?: string;
      categories?: string[];
      language?: { key: string; value: string };
      translation?: string;
      context?: string;
    };
  }
): Promise<Quote> {
  try {
    const response = await cosmic.objects.updateOne(id, {
      ...(data.title && { title: data.title }),
      metadata: data.metadata,
    });

    return response.object as Quote;
  } catch (error) {
    throw new Error('Failed to update quote');
  }
}

// Delete quote
export async function deleteQuote(id: string): Promise<void> {
  try {
    await cosmic.objects.deleteOne(id);
  } catch (error) {
    throw new Error('Failed to delete quote');
  }
}