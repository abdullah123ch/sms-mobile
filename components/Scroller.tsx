// components/common/SubjectScroller.tsx
import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  ScrollView 
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

export interface ScrollerItem {
  id: string;
  title: string;
  [key: string]: any; // Allow additional properties
}

interface SubjectScrollerProps {
  items: ScrollerItem[];
  selectedIndex: number;
  onItemChange: (index: number) => void;
  titleKey?: string;
  showCount?: boolean;
  countKey?: string;
  showDots?: boolean;
  color?: string;
  backgroundColor?: string;
  showBackground?: boolean;
  compact?: boolean;
}

const SubjectScroller: React.FC<SubjectScrollerProps> = ({
  items,
  selectedIndex,
  onItemChange,
  titleKey = 'title',
  showCount = false,
  countKey = 'count',
  showDots = false,
  color = '#111827',
  backgroundColor = '#f9fafb',
  showBackground = true,
  compact = false,
}) => {
  const handlePrevious = () => {
    if (selectedIndex > 0) {
      onItemChange(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) {
      onItemChange(selectedIndex + 1);
    }
  };

  const currentItem = items[selectedIndex];

  const renderItemTitle = () => {
    if (!currentItem) return 'No Items';
    
    if (typeof currentItem[titleKey] === 'string') {
      return currentItem[titleKey];
    }
    
    // Fallback to title or name properties
    return currentItem.title || currentItem.name || 'No Title';
  };

  const renderItemCount = () => {
    if (!showCount || !currentItem || !countKey) return null;
    
    const count = currentItem[countKey];
    if (count !== undefined && count !== null) {
      return (
        <Text style={[styles.itemCount, { color: '#6b7280' }]}>
          {count} {typeof count === 'number' && count === 1 ? 'item' : 'items'}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={[
      styles.container,
      compact && styles.containerCompact,
      { backgroundColor: showBackground ? '#ffffff' : 'transparent' }
    ]}>
      {/* Navigation Container */}
      <View style={[
        styles.navigationContainer,
        { backgroundColor: showBackground ? backgroundColor : 'transparent' },
        showBackground && styles.navigationContainerWithBorder,
        compact && styles.navigationContainerCompact
      ]}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={selectedIndex === 0}
          style={[
            styles.navButton,
            selectedIndex === 0 && styles.navButtonDisabled,
            compact && styles.navButtonCompact
          ]}
        >
          <ChevronLeft 
            size={compact ? 16 : 20} 
            color={selectedIndex === 0 ? '#9ca3af' : '#4b5563'} 
          />
        </TouchableOpacity>
        
        <View style={[
          styles.itemInfo,
          compact && styles.itemInfoCompact
        ]}>
          <Text 
            style={[
              styles.itemName, 
              { color },
              compact && styles.itemNameCompact
            ]} 
            numberOfLines={compact ? 1 : 2}
          >
            {renderItemTitle()}
          </Text>
          {renderItemCount()}
        </View>
        
        <TouchableOpacity
          onPress={handleNext}
          disabled={selectedIndex === items.length - 1}
          style={[
            styles.navButton,
            selectedIndex === items.length - 1 && styles.navButtonDisabled,
            compact && styles.navButtonCompact
          ]}
        >
          <ChevronRight 
            size={compact ? 16 : 20} 
            color={selectedIndex === items.length - 1 ? '#9ca3af' : '#4b5563'} 
          />
        </TouchableOpacity>
      </View>

      {/* Dots Indicator */}
      {showDots && items.length > 0 && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.dotsScroll}
          contentContainerStyle={styles.dotsContainer}
        >
          {items.map((item, index) => {
            const isSelected = index === selectedIndex;
            
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => onItemChange(index)}
                style={styles.dotWrapper}
              >
                <View 
                  style={[
                    styles.dot,
                    isSelected && styles.dotActive,
                    { backgroundColor: isSelected ? color : '#d1d5db' }
                  ]} 
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  containerCompact: {
    paddingVertical: 8,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
  },
  navigationContainerWithBorder: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  navigationContainerCompact: {
    padding: 8,
    marginHorizontal: 12,
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
  },
  navButtonCompact: {
    padding: 4,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  itemInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  itemInfoCompact: {
    paddingHorizontal: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  itemNameCompact: {
    fontSize: 14,
  },
  itemCount: {
    fontSize: 12,
    marginTop: 2,
  },
  dotsScroll: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  dotWrapper: {
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 8,
    height: 8,
  },
});

export default SubjectScroller;