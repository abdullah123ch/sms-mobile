// types/books.ts
export interface BookCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Book {
  id: string;
  title: string;
  subject: string;
  class: string;
  board: string;
  author: string;
  publisher: string;
  publicationYear: number;
  language: string;
  pages: number;
  isbn: string;
  description: string;
  coverImage: string;
  pdfUrl: string;
  previewUrl: string;
  fileSize: string;
  downloadCount: number;
  rating: number;
  tags: string[];
  category: BookCategory;
}

export interface BookStats {
  totalBooks: number;
  totalDownloads: number;
  averageRating: number;
  recentlyAdded: number;
  mostPopular: string;
}