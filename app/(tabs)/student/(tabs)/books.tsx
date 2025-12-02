// app/(tabs)/student/(tabs)/books.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  TextInput,
  Dimensions 
} from 'react-native';
import { Search, Download, BookOpen, Star, Filter, ChevronRight } from 'lucide-react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Card } from '@/components/ui/card';
import { 
  bookCategories, 
  ptcbBooks, 
  bookStats,
  getMostPopularBooks,
  searchBooks 
} from '@/data/mockBooks';
import { Book, BookCategory } from '@/types/books';

const { width } = Dimensions.get('window');

export default function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(ptcbBooks);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredBooks(ptcbBooks);
    } else {
      setFilteredBooks(searchBooks(query));
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredBooks(ptcbBooks);
    } else {
      const categoryBooks = ptcbBooks.filter(book => book.category.id === categoryId);
      setFilteredBooks(categoryBooks);
    }
  };

  const popularBooks = getMostPopularBooks(3);

  const renderBookCard = (book: Book) => (
    <Card key={book.id} style={styles.bookCard}>
      <View style={styles.bookCardContent}>
        <Image 
          source={{ uri: book.coverImage }} 
          style={styles.bookCover}
          resizeMode="cover"
        />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.bookSubject}>{book.subject}</Text>
          <Text style={styles.bookClass}>{book.class} • {book.board}</Text>
          
          <View style={styles.bookStats}>
            <View style={styles.ratingContainer}>
              <Star size={14} color="#fbbf24" fill="#fbbf24" />
              <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
            </View>
            <View style={styles.downloadContainer}>
              <Download size={14} color="#6b7280" />
              <Text style={styles.downloadText}>
                {(book.downloadCount / 1000).toFixed(1)}k
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Details</Text>
            <ChevronRight size={16} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>
            Digital Library
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Access all your textbooks in one place
          </ThemedText>
        </View>

        {/* Stats Overview */}
        <Card style={styles.statsCard}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <BookOpen size={24} color="#3b82f6" />
              <Text style={[styles.statValue, { color: '#3b82f6' }]}>
                {bookStats.totalBooks}
              </Text>
              <Text style={styles.statLabel}>Total Books</Text>
            </View>
            
            <View style={styles.statItem}>
              <Download size={24} color="#10b981" />
              <Text style={[styles.statValue, { color: '#10b981' }]}>
                {(bookStats.totalDownloads / 1000).toFixed(0)}k
              </Text>
              <Text style={styles.statLabel}>Downloads</Text>
            </View>
            
            <View style={styles.statItem}>
              <Star size={24} color="#f59e0b" />
              <Text style={[styles.statValue, { color: '#f59e0b' }]}>
                {bookStats.averageRating}
              </Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
          </View>
        </Card>

        {/* Search Bar */}
        <Card style={styles.searchCard}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search books by title, subject or author..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#9ca3af"
            />
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#3b82f6" />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Categories */}
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            Browse by Category
          </ThemedText>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            <TouchableOpacity
              onPress={() => handleCategorySelect('all')}
              style={[
                styles.categoryCard,
                selectedCategory === 'all' && styles.categoryCardActive
              ]}
            >
              <Text style={styles.categoryIcon}>📚</Text>
              <Text style={[
                styles.categoryName,
                selectedCategory === 'all' && styles.categoryNameActive
              ]}>
                All Books
              </Text>
            </TouchableOpacity>
            
            {bookCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategorySelect(category.id)}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardActive,
                  { borderLeftColor: category.color }
                ]}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Most Popular Books */}
        {popularBooks.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              Most Popular
            </ThemedText>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularContainer}
            >
              {popularBooks.map((book) => (
                <Card key={book.id} style={styles.popularCard}>
                  <Image 
                    source={{ uri: book.coverImage }} 
                    style={styles.popularCover}
                    resizeMode="cover"
                  />
                  <View style={styles.popularInfo}>
                    <Text style={styles.popularTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.popularSubject}>{book.subject}</Text>
                    <View style={styles.popularStats}>
                      <View style={styles.ratingContainer}>
                        <Star size={12} color="#fbbf24" fill="#fbbf24" />
                        <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
                      </View>
                      <Text style={styles.popularDownloads}>
                        {(book.downloadCount / 1000).toFixed(1)}k downloads
                      </Text>
                    </View>
                  </View>
                </Card>
              ))}
            </ScrollView>
          </View>
        )}

        {/* All Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>
              All Textbooks ({filteredBooks.length})
            </ThemedText>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.booksGrid}>
            {filteredBooks.map(renderBookCard)}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  searchCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    marginRight: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    padding: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 4,
    gap: 12,
  },
  categoryCard: {
    width: 100,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderLeftWidth: 4,
  },
  categoryCardActive: {
    backgroundColor: '#f8fafc',
    borderColor: '#dbeafe',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  categoryNameActive: {
    color: '#1e40af',
    fontWeight: '600',
  },
  popularContainer: {
    paddingHorizontal: 4,
    gap: 16,
  },
  popularCard: {
    width: 160,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  popularCover: {
    width: '100%',
    height: 200,
  },
  popularInfo: {
    padding: 12,
  },
  popularTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 18,
  },
  popularSubject: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  popularStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularDownloads: {
    fontSize: 10,
    color: '#9ca3af',
  },
  booksGrid: {
    gap: 16,
  },
  bookCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  bookCardContent: {
    flexDirection: 'row',
  },
  bookCover: {
    width: 100,
    height: 140,
  },
  bookInfo: {
    flex: 1,
    padding: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 20,
  },
  bookSubject: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
    marginBottom: 4,
  },
  bookClass: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  bookStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  },
  downloadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  downloadText: {
    fontSize: 12,
    color: '#6b7280',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
});