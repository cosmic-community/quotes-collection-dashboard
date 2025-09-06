// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Language option interface for select-dropdown
export interface LanguageOption {
  key: string;
  value: string;
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    bio?: string;
    birth_year?: number;
    death_year?: number;
    nationality?: string;
    profession?: string;
    portrait?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    description?: string;
    color?: string;
  };
}

// Quote interface
export interface Quote extends CosmicObject {
  type: 'quotes';
  metadata: {
    quote_text: string;
    author?: Author | string;
    source?: string;
    categories?: Category[];
    language?: LanguageOption;
    translation?: string;
    context?: string;
  };
}

// API response interfaces
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Dashboard filter interfaces
export interface QuoteFilters {
  search: string;
  author: string;
  category: string;
  language: string;
}

// Form data interfaces
export interface CreateQuoteData {
  title: string;
  metadata: {
    quote_text: string;
    author: string;
    source?: string;
    categories?: string[];
    language?: LanguageOption;
    translation?: string;
    context?: string;
  };
}

export interface UpdateQuoteData {
  title?: string;
  metadata: {
    quote_text?: string;
    author?: string;
    source?: string;
    categories?: string[];
    language?: LanguageOption;
    translation?: string;
    context?: string;
  };
}

// Type guards
export function isQuote(obj: CosmicObject): obj is Quote {
  return obj.type === 'quotes';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}