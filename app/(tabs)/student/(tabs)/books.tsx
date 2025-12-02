// app/(tabs)/student/(tabs)/books.tsx
import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions,
  Linking 
} from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import BookCard from '@/components/books/BookCard';
import SubjectScroller from '@/components/Scroller';
import { ptcbBooks } from '@/data/mockBooks';

const { width } = Dimensions.get('window');
const isDesktop = width >= 1024;

export default function BooksPage() {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

  // Get unique subjects from books
  const subjects = useMemo(() => {
    const uniqueSubjects = [...new Set(ptcbBooks.map(book => book.subject))];
    return uniqueSubjects.map((subject, index) => ({
      id: `subject-${index}`,
      title: subject,
    }));
  }, []);

  // Get books for current subject
  const booksForCurrentSubject = useMemo(() => {
    const currentSubject = subjects[selectedSubjectIndex];
    if (!currentSubject) return [];
    
    return ptcbBooks
      .filter(book => book.subject === currentSubject.title)
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [subjects, selectedSubjectIndex]);

  const currentSubject = subjects[selectedSubjectIndex];

  const handleBookPreview = async (bookId: string) => {
    const book = ptcbBooks.find(b => b.id === bookId);
    if (book && book.previewUrl) {
      try {
        await Linking.openURL(book.previewUrl);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }
    }
  };

  const handlePTCBWebsite = async () => {
    try {
      await Linking.openURL('https://www.ptb.gov.pk');
    } catch (error) {
      console.error('Failed to open PTCB website:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Mobile Layout */}
      {!isDesktop ? (
        <View style={styles.mobileContainer}>
          {/* Mobile Header */}
          <View style={styles.mobileHeader}>
            <View style={styles.mobileHeaderTop}>
              <View>
                <ThemedText style={styles.mobileTitle}>
                  PTCB Books
                </ThemedText>
                <Text style={styles.mobileSubtitle}>
                  Official 9th Class Textbooks
                </Text>
              </View>
              
              <TouchableOpacity
                onPress={handlePTCBWebsite}
                style={styles.ptcbButton}
                activeOpacity={0.7}
              >
                <ExternalLink size={18} color="white" />
              </TouchableOpacity>
            </View>

            {/* Subject Navigation using SubjectScroller */}
            <SubjectScroller
              items={subjects.map(subject => ({
                ...subject,
                count: ptcbBooks.filter(b => b.subject === subject.title).length,
              }))}
              selectedIndex={selectedSubjectIndex}
              onItemChange={setSelectedSubjectIndex}
              showCount={true}
              countKey="count"
              showDots={false}
              color="#111827"
              backgroundColor="#f9fafb"
            />
          </View>

          {/* Mobile Books List */}
          <ScrollView 
            style={styles.mobileContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.mobileContentContainer}
          >
            {currentSubject ? (
              <View style={styles.booksList}>
                {booksForCurrentSubject.length > 0 ? (
                  booksForCurrentSubject.map(book => (
                    <View key={book.id} style={styles.mobileBookCard}>
                      <View style={styles.mobileBookContent}>
                        <View style={[
                          styles.mobileBookCover,
                          { backgroundColor: book.category.color + '20' }
                        ]}>
                          <Text style={styles.mobileBookIcon}>
                            {book.category.icon}
                          </Text>
                        </View>
                        
                        <View style={styles.mobileBookInfo}>
                          <Text style={styles.mobileBookTitle} numberOfLines={2}>
                            {book.title}
                          </Text>
                          <Text style={styles.mobileBookAuthor}>
                            {book.author} • {book.language}
                          </Text>
                          
                          <View style={styles.mobileBookActions}>
                            <Text style={styles.mobileBookPages}>
                              {book.pages}p
                            </Text>
                            <TouchableOpacity
                              onPress={() => handleBookPreview(book.id)}
                              style={styles.mobilePreviewButton}
                              activeOpacity={0.7}
                            >
                              <Text style={styles.mobilePreviewButtonText}>
                                Preview
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.noBooks}>
                    <Text style={styles.emoji}>📚</Text>
                    <Text style={styles.noBooksText}>No books found</Text>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.noSubjects}>
                <Text style={styles.emoji}>📚</Text>
                <Text style={styles.noSubjectsText}>No subjects available</Text>
              </View>
            )}
          </ScrollView>
        </View>
      ) : null}

      {/* Desktop Layout */}
      {isDesktop ? (
        <ScrollView 
          style={styles.desktopContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.desktopContent}
        >
          {/* Desktop Header */}
          <View style={styles.desktopHeader}>
            <View>
              <ThemedText style={styles.desktopTitle}>
                PTCB Digital Library
              </ThemedText>
              <Text style={styles.desktopSubtitle}>
                Official Punjab Textbook Board books for 9th class - Free downloads
              </Text>
            </View>
            <TouchableOpacity
              onPress={handlePTCBWebsite}
              style={styles.desktopPTCBButton}
              activeOpacity={0.7}
            >
              <ExternalLink size={18} color="white" />
              <Text style={styles.desktopPTCBButtonText}>PTCB Official</Text>
            </TouchableOpacity>
          </View>

          {/* Desktop Subject Navigation */}
          <SubjectScroller
            items={subjects.map(subject => ({
              ...subject,
              count: ptcbBooks.filter(b => b.subject === subject.title).length,
            }))}
            selectedIndex={selectedSubjectIndex}
            onItemChange={setSelectedSubjectIndex}
            showCount={true}
            countKey="count"
            showDots={true}
            color="#2563eb"
            backgroundColor="#dbeafe"
            showBackground={true}
          />

          {/* Desktop Books Grid */}
          <View style={styles.desktopBooksGrid}>
            {booksForCurrentSubject.length > 0 ? (
              booksForCurrentSubject.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPreview={handleBookPreview}
                />
              ))
            ) : (
              <View style={styles.desktopNoBooks}>
                <Text style={styles.desktopEmoji}>📚</Text>
                <Text style={styles.desktopNoBooksText}>
                  No books found matching your criteria
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  // Mobile Styles
  mobileContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  mobileHeader: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 16,
  },
  mobileHeaderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  mobileTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  mobileSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  ptcbButton: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 8,
  },
  mobileContent: {
    flex: 1,
  },
  mobileContentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  booksList: {
    padding: 16,
    gap: 12,
  },
  mobileBookCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  mobileBookContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  mobileBookCover: {
    width: 48,
    height: 64,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileBookIcon: {
    fontSize: 20,
  },
  mobileBookInfo: {
    flex: 1,
    minWidth: 0,
  },
  mobileBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
    lineHeight: 18,
  },
  mobileBookAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  mobileBookActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mobileBookPages: {
    fontSize: 12,
    color: '#9ca3af',
  },
  mobilePreviewButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  mobilePreviewButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  noBooks: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  noSubjects: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 16,
  },
  noBooksText: {
    fontSize: 14,
    color: '#6b7280',
  },
  noSubjectsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  // Desktop Styles
  desktopContainer: {
    flex: 1,
  },
  desktopContent: {
    padding: 24,
    paddingBottom: 40,
  },
  desktopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  desktopTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  desktopSubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  desktopPTCBButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16a34a',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  desktopPTCBButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  desktopBooksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 24,
  },
  desktopNoBooks: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  desktopEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  desktopNoBooksText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});