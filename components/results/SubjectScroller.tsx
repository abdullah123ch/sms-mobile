// components/results/SubjectScroller.tsx
import { CourseGrade } from "@/types/results";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SubjectScrollerProps {
  subjects: CourseGrade[];
  selectedIndex: number;
  onSubjectChange: (index: number) => void;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = 140;
const CARD_MARGIN = 8;

const SubjectScroller: React.FC<SubjectScrollerProps> = ({
  subjects,
  selectedIndex,
  onSubjectChange,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
    onSubjectChange(index);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      scrollToIndex(selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < subjects.length - 1) {
      scrollToIndex(selectedIndex + 1);
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "#16a34a";
    if (percentage >= 80) return "#2563eb";
    if (percentage >= 70) return "#ca8a04";
    if (percentage >= 60) return "#ea580c";
    return "#dc2626";
  };

  const renderSubject = ({
    item,
    index,
  }: {
    item: CourseGrade;
    index: number;
  }) => {
    const isSelected = index === selectedIndex;
    const gradeColor = getGradeColor(item.currentGrade);

    return (
      <TouchableOpacity
        onPress={() => scrollToIndex(index)}
        style={[
          styles.subjectCard,
          isSelected && styles.subjectCardSelected,
          { borderLeftColor: gradeColor },
        ]}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.subjectName, isSelected && styles.subjectNameSelected]}
          numberOfLines={2}
        >
          {item.courseName}
        </Text>
        <Text
          style={[
            styles.subjectGrade,
            { color: gradeColor },
            isSelected && styles.subjectGradeSelected,
          ]}
        >
          {item.currentGrade.toFixed(1)}%
        </Text>
        <Text
          style={[
            styles.subjectLetter,
            isSelected && styles.subjectLetterSelected,
          ]}
        >
          {item.letterGrade}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <TouchableOpacity
          onPress={handlePrevious}
          disabled={selectedIndex === 0}
          style={[
            styles.navButton,
            selectedIndex === 0 && styles.navButtonDisabled,
          ]}
        >
          <ChevronLeft
            size={24}
            color={selectedIndex === 0 ? "#d1d5db" : "#374151"}
          />
        </TouchableOpacity>

        <View style={styles.listContainer}>
          <Animated.FlatList
            ref={flatListRef}
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.courseId}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
            decelerationRate="fast"
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            initialScrollIndex={selectedIndex}
            getItemLayout={(data, index) => ({
              length: CARD_WIDTH + CARD_MARGIN * 2,
              offset: (CARD_WIDTH + CARD_MARGIN * 2) * index,
              index,
            })}
          />
        </View>

        <TouchableOpacity
          onPress={handleNext}
          disabled={selectedIndex === subjects.length - 1}
          style={[
            styles.navButton,
            selectedIndex === subjects.length - 1 && styles.navButtonDisabled,
          ]}
        >
          <ChevronRight
            size={24}
            color={
              selectedIndex === subjects.length - 1 ? "#d1d5db" : "#374151"
            }
          />
        </TouchableOpacity>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsContainer}>
        {subjects.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[styles.dot, index === selectedIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  listContainer: {
    flex: 1,
    height: 140,
  },
  listContent: {
    paddingHorizontal: 8,
    alignItems: "center",
  },
  subjectCard: {
    width: CARD_WIDTH,
    height: 120,
    marginHorizontal: CARD_MARGIN,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderLeftWidth: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  subjectCardSelected: {
    backgroundColor: "#f8fafc",
    borderColor: "#dbeafe",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 18,
  },
  subjectNameSelected: {
    color: "#111827",
    fontWeight: "700",
  },
  subjectGrade: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subjectGradeSelected: {
    fontSize: 22,
  },
  subjectLetter: {
    fontSize: 14,
    color: "#6b7280",
    textTransform: "uppercase",
  },
  subjectLetterSelected: {
    color: "#374151",
    fontWeight: "600",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d1d5db",
  },
  dotActive: {
    backgroundColor: "#2563eb",
    width: 12,
    height: 12,
  },
});

export default SubjectScroller;
