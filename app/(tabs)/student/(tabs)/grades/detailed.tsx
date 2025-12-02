// app/(tabs)/student/grades/detailed.tsx
import DetailedHeader from "@/components/results/DetailedHeader";
import GradeDetails from "@/components/results/GradeDetails";
import SubjectScroller from "@/components/Scroller";
import {
  mockCourseGrades,
  mockPerformanceMetrics,
  mockStudentProfile,
} from "@/data/mockGrades";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DetailedGradesPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialIndex = params.initialIndex
    ? parseInt(params.initialIndex as string)
    : 0;

  const [selectedSubjectIndex, setSelectedSubjectIndex] =
    useState(initialIndex);
  const subjects = mockCourseGrades;
  const currentSubject = subjects[selectedSubjectIndex];

  const handleBack = () => {
    router.back();
  };

  if (!currentSubject) {
    return (
      <View style={styles.container}>
        <DetailedHeader onBack={handleBack} />
        <View style={styles.noSubjects}>
          <Text style={styles.noSubjectsText}>No subject selected</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* White static header + back button */}
      <DetailedHeader onBack={handleBack} />

      {/* Subject scroller */}
      <SubjectScroller
        items={subjects.map((subject) => ({
          id: subject.courseId,
          title: subject.courseName,
          count: subject.completedAssignments,
          currentGrade: subject.currentGrade,
          letterGrade: subject.letterGrade,
        }))}
        selectedIndex={selectedSubjectIndex}
        onItemChange={setSelectedSubjectIndex}
        showCount={true}
        countKey="count"
        showDots={false}
        color="#111827"
        backgroundColor="#f9fafb"
      />

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <GradeDetails
          subject={currentSubject}
          studentProfile={mockStudentProfile}
          performanceMetrics={mockPerformanceMetrics}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  noSubjects: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  noSubjectsText: {
    fontSize: 16,
    color: "#6b7280",
  },
});
