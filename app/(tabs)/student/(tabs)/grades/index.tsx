// app/(tabs)/student/(tabs)/grades.tsx
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import GradesOverview from '@/components/results/GradesOverview';
import { mockCourseGrades, mockStudentProfile, mockPerformanceMetrics } from '@/data/mockGrades';

export default function GradesPage() {
  return (
    <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <GradesOverview
          subjects={mockCourseGrades}
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
    backgroundColor: '#f9fafb',
  },
  scrollContent: {
    flexGrow: 1,
  },
});