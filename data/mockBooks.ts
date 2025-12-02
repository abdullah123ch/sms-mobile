// data/mockBooks.ts
import { Book, BookCategory, BookStats } from '@/types/books';

export const bookCategories: BookCategory[] = [
  { id: '1', name: 'Science', icon: '🔬', color: '#3B82F6' },
  { id: '2', name: 'Mathematics', icon: '📐', color: '#10B981' },
  { id: '3', name: 'Languages', icon: '📖', color: '#8B5CF6' },
  { id: '4', name: 'Social Studies', icon: '🌍', color: '#F59E0B' },
  { id: '5', name: 'Islamic Studies', icon: '🕌', color: '#EF4444' },
  { id: '6', name: 'Computer Science', icon: '💻', color: '#06B6D4' }
];

export const ptcbBooks: Book[] = [
  {
    id: '1',
    title: 'Physics (English Medium)',
    subject: 'Physics',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 256,
    isbn: '978-969-XXX-XXX-X',
    description: 'Comprehensive physics textbook covering mechanics, heat, light, sound, and electricity for 9th grade students.',
    coverImage: 'https://picsum.photos/200/280?random=1',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/physics-9th-english.pdf',
    previewUrl: 'https://drive.google.com/file/d/14TEL4poDp5vvAP7JZ3dYXJ4U_9fPexm3/view',
    fileSize: '15.2 MB',
    downloadCount: 15420,
    rating: 4.5,
    tags: ['PTCB', 'Physics', 'Science', '9th Class', 'English'],
    category: bookCategories[0]
  },
  {
    id: '2',
    title: 'Chemistry (English Medium)',
    subject: 'Chemistry',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 224,
    isbn: '978-969-XXX-XXX-Y',
    description: 'Complete chemistry textbook including atomic structure, chemical bonding, acids, bases, and organic chemistry basics.',
    coverImage: 'https://picsum.photos/200/280?random=2',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/chemistry-9th-english.pdf',
    previewUrl: 'https://drive.google.com/file/d/1OY1Unpm8VkLCGQfbLFrE8wLn3fzXmZpc/view',
    fileSize: '12.8 MB',
    downloadCount: 13850,
    rating: 4.4,
    tags: ['PTCB', 'Chemistry', 'Science', '9th Class', 'English'],
    category: bookCategories[0]
  },
  {
    id: '3',
    title: 'Biology (English Medium)',
    subject: 'Biology',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 288,
    isbn: '978-969-XXX-XXX-Z',
    description: 'Detailed biology textbook covering cell biology, diversity of life, human anatomy, and environmental science.',
    coverImage: 'https://picsum.photos/200/280?random=3',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/biology-9th-english.pdf',
    previewUrl: 'https://drive.google.com/file/d/1-8dIJw92YsW4BA5EmPinhHMCHRl5WuyX/view',
    fileSize: '18.5 MB',
    downloadCount: 16720,
    rating: 4.6,
    tags: ['PTCB', 'Biology', 'Science', '9th Class', 'English'],
    category: bookCategories[0]
  },
  {
    id: '4',
    title: 'Mathematics (English Medium)',
    subject: 'Mathematics',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 312,
    isbn: '978-969-XXX-XXX-A',
    description: 'Comprehensive mathematics textbook covering algebra, geometry, trigonometry, and statistics for 9th grade.',
    coverImage: 'https://picsum.photos/200/280?random=4',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/mathematics-9th-english.pdf',
    previewUrl: 'https://pctb.punjab.gov.pk/system/files/2019-G09-Mathematics-EM_0.pdf',
    fileSize: '14.3 MB',
    downloadCount: 19850,
    rating: 4.7,
    tags: ['PTCB', 'Mathematics', '9th Class', 'English', 'Algebra'],
    category: bookCategories[1]
  },
  {
    id: '5',
    title: 'English (Compulsory)',
    subject: 'English',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 196,
    isbn: '978-969-XXX-XXX-B',
    description: 'English language and literature textbook with stories, poems, grammar, and composition exercises.',
    coverImage: 'https://picsum.photos/200/280?random=5',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/english-9th-compulsory.pdf',
    previewUrl: 'https://drive.google.com/file/d/1mWBO-wzXqv0Oq9oazcjM-Y16EqmPqBtj/view',
    fileSize: '10.7 MB',
    downloadCount: 22100,
    rating: 4.3,
    tags: ['PTCB', 'English', 'Language', '9th Class', 'Literature'],
    category: bookCategories[2]
  },
  {
    id: '6',
    title: 'Urdu (Compulsory)',
    subject: 'Urdu',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'Urdu',
    pages: 208,
    isbn: '978-969-XXX-XXX-C',
    description: 'اردو زبان اور ادب کی کتاب جس میں نظم، نثر، قواعد اور تحریری مشقیں شامل ہیں۔',
    coverImage: 'https://picsum.photos/200/280?random=6',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/urdu-9th-compulsory.pdf',
    previewUrl: 'https://drive.google.com/file/d/1JPgnI_hL6D0EMPG36IdjcqB2OFBHLp52/view',
    fileSize: '13.2 MB',
    downloadCount: 18650,
    rating: 4.5,
    tags: ['PTCB', 'Urdu', 'Language', '9th Class', 'Literature'],
    category: bookCategories[2]
  },
  {
    id: '7',
    title: 'Pakistan Studies (Geography)',
    subject: 'Pakistan Studies',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 172,
    isbn: '978-969-XXX-XXX-D',
    description: 'Comprehensive study of Pakistan\'s geography, climate, natural resources, and economic development.',
    coverImage: 'https://picsum.photos/200/280?random=7',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/pakistan-studies-geography-9th.pdf',
    previewUrl: 'https://drive.google.com/file/d/1XYODJ4j1SXfvi1u2c3YVOge6gZ2hPKt8/view',
    fileSize: '16.8 MB',
    downloadCount: 14200,
    rating: 4.2,
    tags: ['PTCB', 'Pakistan Studies', 'Geography', '9th Class', 'Social'],
    category: bookCategories[3]
  },
  {
    id: '8',
    title: 'Pakistan Studies (History)',
    subject: 'Pakistan Studies',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 164,
    isbn: '978-969-XXX-XXX-E',
    description: 'Historical development of Pakistan from ancient times to modern era, covering political and cultural aspects.',
    coverImage: 'https://picsum.photos/200/280?random=8',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/pakistan-studies-history-9th.pdf',
    previewUrl: 'https://drive.google.com/file/d/1Z9fnK77LPs7FUHxeSEUY-w5osijGkl3t/view',
    fileSize: '15.4 MB',
    downloadCount: 13750,
    rating: 4.1,
    tags: ['PTCB', 'Pakistan Studies', 'History', '9th Class', 'Social'],
    category: bookCategories[3]
  },
  {
    id: '9',
    title: 'Islamic Studies (Compulsory)',
    subject: 'Islamic Studies',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 156,
    isbn: '978-969-XXX-XXX-F',
    description: 'Islamic teachings, Quran, Hadith, Islamic history, and moral values for character building.',
    coverImage: 'https://picsum.photos/200/280?random=9',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/islamic-studies-9th-english.pdf',
    previewUrl: 'https://drive.google.com/file/d/1kiaCqhXsXuuZ7HAAuXYfjl4_WaBf-ARS/view',
    fileSize: '11.9 MB',
    downloadCount: 17300,
    rating: 4.4,
    tags: ['PTCB', 'Islamic Studies', 'Religion', '9th Class', 'English'],
    category: bookCategories[4]
  },
  {
    id: '10',
    title: 'Computer Science',
    subject: 'Computer Science',
    class: '9th',
    board: 'PTCB',
    author: 'Punjab Textbook Board',
    publisher: 'Punjab Textbook Board',
    publicationYear: 2024,
    language: 'English',
    pages: 184,
    isbn: '978-969-XXX-XXX-G',
    description: 'Introduction to computer science, programming basics, MS Office, and internet fundamentals.',
    coverImage: 'https://picsum.photos/200/280?random=10',
    pdfUrl: 'https://www.ptb.gov.pk/downloads/computer-science-9th.pdf',
    previewUrl: 'https://drive.google.com/file/d/1j8QTq_tyjH_hUbsAqrkxZnmryoLPAq4F/view',
    fileSize: '13.7 MB',
    downloadCount: 12400,
    rating: 4.3,
    tags: ['PTCB', 'Computer Science', 'IT', '9th Class', 'Programming'],
    category: bookCategories[5]
  }
];

export const bookStats: BookStats = {
  totalBooks: ptcbBooks.length,
  totalDownloads: ptcbBooks.reduce((sum, book) => sum + book.downloadCount, 0),
  averageRating: Number((ptcbBooks.reduce((sum, book) => sum + book.rating, 0) / ptcbBooks.length).toFixed(1)),
  recentlyAdded: 3,
  mostPopular: 'Mathematics (English Medium)'
};

// Utility functions
export const getMostPopularBooks = (limit: number = 5): Book[] => {
  return ptcbBooks
    .sort((a, b) => b.downloadCount - a.downloadCount)
    .slice(0, limit);
};

export const searchBooks = (query: string): Book[] => {
  const searchTerm = query.toLowerCase();
  return ptcbBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.subject.toLowerCase().includes(searchTerm) ||
    book.description.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getBooksByCategory = (categoryId: string): Book[] => {
  return ptcbBooks.filter(book => book.category.id === categoryId);
};

export const getBooksByClass = (className: string): Book[] => {
  return ptcbBooks.filter(book => book.class.toLowerCase() === className.toLowerCase());
};

export const getBooksBySubject = (subject: string): Book[] => {
  return ptcbBooks.filter(book => 
    book.subject.toLowerCase().includes(subject.toLowerCase())
  );
};