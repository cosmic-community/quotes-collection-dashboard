# Quotes Collection Dashboard

![Quotes Collection Dashboard](https://imgix.cosmicjs.com/106474d0-8b32-11f0-928b-57c4bf5f40ed-photo-1573496359142-b8d87734a5a2-1757170758260.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive React dashboard for managing your quotes collection, featuring quotes from renowned authors like Maya Angelou, João Guimarães Rosa, and Rumi. The dashboard provides an intuitive interface to view, search, filter, and manage quotes with full CRUD capabilities.

## ✨ Features

- **Quote Management**: Create, read, update, and delete quotes with rich metadata
- **Author Profiles**: Manage author information with biographical details and portraits
- **Category Organization**: Color-coded category system for content organization
- **Advanced Search & Filtering**: Search by text, author, category, or language
- **Multi-language Support**: Handle quotes in multiple languages with translations
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Updates**: Live content management with instant synchronization

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68bc4559285c02bfe718ddfd&clone_repository=68bc4d6f285c02bfe718de30)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a blog with posts, authors, and categories

### Code Generation Prompt

> Create a React dashboard that displays and manages my existing content

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Package Manager**: Bun
- **Deployment**: Vercel Ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Add your Cosmic credentials to `.env.local`:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

5. Run the development server:
   ```bash
   bun dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Quotes with Author and Category Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get quotes with related data
const response = await cosmic.objects
  .find({ type: 'quotes' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const quotes = response.objects
```

### Creating a New Quote

```typescript
const newQuote = await cosmic.objects.insertOne({
  type: 'quotes',
  title: 'Quote Title',
  metadata: {
    quote_text: 'The actual quote text',
    author: 'author-id',
    categories: ['category-id-1', 'category-id-2'],
    language: { key: 'en', value: 'English' },
    source: 'Book or source name',
    context: 'Background information'
  }
})
```

### Updating Quote Content

```typescript
await cosmic.objects.updateOne(quoteId, {
  metadata: {
    quote_text: 'Updated quote text',
    categories: ['updated-category-id']
  }
})
```

## 🌐 Cosmic CMS Integration

This dashboard integrates with three main content types in your Cosmic bucket:

### Quotes Object Type
- **Quote Text**: Main quote content (required)
- **Author**: Connected object relationship to authors
- **Categories**: Multiple category relationships
- **Language**: Select dropdown (English, Portuguese, Spanish, French, German)
- **Translation**: English translation for non-English quotes
- **Source**: Original source material
- **Context**: Background information

### Authors Object Type
- **Bio**: Author biography
- **Birth/Death Years**: Numerical year fields
- **Nationality**: Author's country of origin
- **Profession**: What the author was known for
- **Portrait**: Author image file

### Categories Object Type
- **Description**: Category explanation
- **Color**: Theme color for visual organization

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables

### Environment Variables for Production
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->