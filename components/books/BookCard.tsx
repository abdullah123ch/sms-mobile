// components/books/BookCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye } from 'lucide-react-native';
import { Card } from '../ui/card';
import { Book } from '@/types/books';

interface BookCardProps {
  book: Book;
  onPreview: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPreview }) => {
  const handlePreview = () => {
    if (book.previewUrl) {
      // You'll need to handle URL opening with Linking or WebBrowser
      // Linking.openURL(book.previewUrl);
      onPreview(book.id);
    }
  };

  return (
    <Card style={styles.container}>
      {/* Book Cover */}
      <View style={styles.coverContainer}>
        <View 
          style={[
            styles.bookCover,
            { backgroundColor: book.category.color + '20' } // Adding opacity
          ]}
        >
          <View style={styles.coverContent}>
            <Text style={styles.coverIcon}>{book.category.icon}</Text>
            <Text style={styles.coverTitle} numberOfLines={2}>
              {book.title}
            </Text>
          </View>
        </View>
        
        {/* Language Badge */}
        <View style={[styles.badge, styles.languageBadge]}>
          <Text 
            style={[
              styles.badgeText,
              book.language === 'English' 
                ? styles.englishBadge
                : styles.urduBadge
            ]}
          >
            {book.language}
          </Text>
        </View>

        {/* Category Badge */}
        <View style={[styles.badge, styles.categoryBadge]}>
          <Text 
            style={[styles.badgeText, { color: 'white' }]}
          >
            {book.category.name}
          </Text>
        </View>
      </View>

      {/* Book Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.subject}>
            {book.subject} • {book.pages}p
          </Text>
        </View>

        {/* Author */}
        <View style={styles.authorContainer}>
          <Text style={styles.author} numberOfLines={1}>
            by {book.author}
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={handlePreview}
          style={styles.previewButton}
          activeOpacity={0.7}
        >
          <Eye size={14} color="white" />
          <Text style={styles.previewButtonText}>Preview & Download</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  coverContainer: {
    position: 'relative',
  },
  bookCover: {
    aspectRatio: 3/4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  coverContent: {
    alignItems: 'center',
  },
  coverIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  coverTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    lineHeight: 16,
  },
  badge: {
    position: 'absolute',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  languageBadge: {
    top: 8,
    right: 8,
  },
  categoryBadge: {
    top: 8,
    left: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  englishBadge: {
    color: '#1e40af',
    backgroundColor: '#dbeafe',
  },
  urduBadge: {
    color: '#166534',
    backgroundColor: '#d1fae5',
  },
  detailsContainer: {
    padding: 12,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 18,
  },
  subject: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  authorContainer: {
    marginBottom: 12,
  },
  author: {
    fontSize: 12,
    color: '#9ca3af',
  },
  previewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  previewButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    marginLeft: 6,
  },
});

export default BookCard;