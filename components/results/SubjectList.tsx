// components/results/SubjectsList.tsx
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ThemedText } from '../themed-text';
import { CourseGrade } from '@/types/results';

interface SubjectsListProps {
  subjects: CourseGrade[];
}

const SubjectsList: React.FC<SubjectsListProps> = ({ subjects }) => {
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return '#16a34a';
    if (percentage >= 80) return '#2563eb';
    if (percentage >= 70) return '#ca8a04';
    if (percentage >= 60) return '#ea580c';
    return '#dc2626';
  };

  const getGradeBgColor = (percentage: number) => {
    if (percentage >= 90) return '#dcfce7';
    if (percentage >= 80) return '#dbeafe';
    if (percentage >= 70) return '#fef9c3';
    if (percentage >= 60) return '#ffedd5';
    return '#fee2e2';
  };

  return (
    <View style={styles.subjectsSection}>
      <View style={styles.subjectsHeader}>
        <ThemedText style={styles.subjectsTitle}>
          Subject Performance
        </ThemedText>
        <ThemedText style={styles.subjectsSubtitle}>
          Tap on any subject to view detailed breakdown
        </ThemedText>
      </View>

      <View style={styles.subjectsList}>
        {subjects.map((subject) => {
          const percentage = subject.currentGrade;
          const gradeColor = getGradeColor(percentage);
          const gradeBgColor = getGradeBgColor(percentage);
          
          return (
            <Link
              key={subject.courseId}
              href={{
                pathname: "/student/grades/detailed",
                params: {
                  courseId: subject.courseId,
                  initialIndex: subjects.findIndex(
                    (s) => s.courseId === subject.courseId
                  ),
                },
              }}
              asChild
            >
              <TouchableOpacity
                style={styles.subjectCard}
                activeOpacity={0.7}
              >
                {/* Background fill based on percentage */}
                <View 
                  style={[
                    styles.percentageFill,
                    { 
                      width: `${Math.min(percentage, 100)}%`,
                      backgroundColor: gradeBgColor,
                      opacity: 0.3
                    }
                  ]} 
                />
                
                <View style={styles.subjectContent}>
                  {/* Subject Info */}
                  <View style={styles.subjectInfo}>
                    <View style={styles.subjectHeader}>
                      <ThemedText style={styles.subjectName} numberOfLines={1}>
                        {subject.courseName}
                      </ThemedText>
                      <ThemedText style={styles.subjectCode}>
                        {subject.courseCode}
                      </ThemedText>
                    </View>
                    
                    <View style={styles.gradeInfo}>
                      <ThemedText style={[styles.subjectLetter, { color: gradeColor }]}>
                        {subject.letterGrade}
                      </ThemedText>
                    </View>
                  </View>
                  
                  {/* Percentage Bar and Value */}
                  <View style={styles.percentageContainer}>
                    <View style={styles.percentageBar}>
                      <View 
                        style={[
                          styles.percentageFillBar,
                          { 
                            width: `${Math.min(percentage, 100)}%`,
                            backgroundColor: gradeColor
                          }
                        ]} 
                      />
                    </View>
                    
                    <ThemedText style={[styles.subjectPercentage, { color: gradeColor }]}>
                      {percentage.toFixed(1)}%
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subjectsSection: {
    marginTop: 24,
  },
  subjectsHeader: {
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  subjectsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subjectsSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  subjectsList: {
    gap: 12,
  },
  subjectCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    position: 'relative',
    height: 80,
  },
  percentageFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 12,
  },
  subjectContent: {
    flex: 1,
    padding: 16,
    position: 'relative',
    zIndex: 1,
  },
  subjectInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectHeader: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  subjectCode: {
    fontSize: 12,
    color: '#6b7280',
  },
  gradeInfo: {
    marginLeft: 12,
  },
  subjectLetter: {
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  percentageBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f3f4f6',
    borderRadius: 3,
    overflow: 'hidden',
  },
  percentageFillBar: {
    height: '100%',
    borderRadius: 3,
  },
  subjectPercentage: {
    fontSize: 16,
    fontWeight: '700',
    minWidth: 50,
    textAlign: 'right',
  },
});

export default SubjectsList;