// components/results/GradeDetails.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Award, TrendingUp, BookOpen, BarChart3, Target } from 'lucide-react-native';
import { Card } from '../ui/card';
import { CourseGrade, StudentProfile, PerformanceMetrics } from '@/types/results';

interface GradeDetailsProps {
  subject: CourseGrade;
  studentProfile: StudentProfile;
  performanceMetrics: PerformanceMetrics;
}

const GradeDetails: React.FC<GradeDetailsProps> = ({
  subject,
  studentProfile,
  performanceMetrics,
}) => {
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return '#16a34a';
    if (percentage >= 80) return '#2563eb';
    if (percentage >= 70) return '#ca8a04';
    if (percentage >= 60) return '#ea580c';
    return '#dc2626';
  };

  const getPerformanceStatus = () => {
    if (subject.currentGrade >= subject.courseAverage) {
      return {
        text: 'Above class average',
        color: '#16a34a',
        bgColor: '#dcfce7',
        icon: '📈',
      };
    } else if (subject.currentGrade >= subject.courseAverage - 5) {
      return {
        text: 'Near class average',
        color: '#ca8a04',
        bgColor: '#fef9c3',
        icon: '↔️',
      };
    } else {
      return {
        text: 'Below class average',
        color: '#dc2626',
        bgColor: '#fee2e2',
        icon: '📉',
      };
    }
  };

  const performanceStatus = getPerformanceStatus();
  const gradeColor = getGradeColor(subject.currentGrade);

  return (
    <View style={styles.container}>
      {/* Main Grade Display */}
      <Card style={styles.gradeDisplayCard}>
        <View style={styles.gradeDisplayContent}>
          <View style={styles.gradeMain}>
            <Text style={[styles.gradePercentage, { color: gradeColor }]}>
              {subject.currentGrade.toFixed(1)}%
            </Text>
            <View style={styles.gradeDetails}>
              <Text style={[styles.gradeLetter, { color: gradeColor }]}>
                {subject.letterGrade}
              </Text>
              <Text style={styles.gradeCredits}>
                {subject.creditHours} Credits
              </Text>
            </View>
          </View>
          <View style={styles.courseInfo}>
            <Text style={styles.courseTitle}>
              {subject.courseCode}
            </Text>
            <Text style={styles.instructor}>
              {subject.instructor}
            </Text>
          </View>
        </View>
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={[styles.statCard, { backgroundColor: '#dbeafe' }]}>
          <Award size={20} color="#2563eb" />
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: '#2563eb' }]}>
              {studentProfile.cumulativeGPA.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>
              Cumulative GPA
            </Text>
          </View>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: '#dcfce7' }]}>
          <TrendingUp size={20} color="#16a34a" />
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: '#16a34a' }]}>
              {performanceMetrics.averageScore.toFixed(1)}%
            </Text>
            <Text style={styles.statLabel}>
              Overall Average
            </Text>
          </View>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: '#f3e8ff' }]}>
          <BookOpen size={20} color="#9333ea" />
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: '#9333ea' }]}>
              {subject.totalAssignments}
            </Text>
            <Text style={styles.statLabel}>
              Total Assignments
            </Text>
          </View>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: '#fef3c7' }]}>
          <BarChart3 size={20} color="#d97706" />
          <View style={styles.statContent}>
            <Text style={[styles.statValue, { color: '#d97706' }]}>
              {performanceMetrics.improvementTrend === 'up' ? '↑' : 
               performanceMetrics.improvementTrend === 'down' ? '↓' : '→'}
            </Text>
            <Text style={styles.statLabel}>
              Performance Trend
            </Text>
          </View>
        </Card>
      </View>

      {/* Performance Indicator */}
      <Card style={[
        styles.performanceCard,
        { backgroundColor: performanceStatus.bgColor }
      ]}>
        <View style={styles.performanceContent}>
          <Text style={styles.performanceIcon}>{performanceStatus.icon}</Text>
          <View style={styles.performanceText}>
            <Text style={[styles.performanceTitle, { color: performanceStatus.color }]}>
              {performanceStatus.text}
            </Text>
            <Text style={styles.performanceSubtitle}>
              Class Average: {subject.courseAverage.toFixed(1)}%
            </Text>
          </View>
          <Text style={[styles.difference, { color: performanceStatus.color }]}>
            {subject.currentGrade >= subject.courseAverage ? '+' : ''}
            {(subject.currentGrade - subject.courseAverage).toFixed(1)}%
          </Text>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  gradeDisplayCard: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  gradeDisplayContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeMain: {
    alignItems: 'flex-start',
  },
  gradePercentage: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },
  gradeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  gradeLetter: {
    fontSize: 24,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  gradeCredits: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  courseInfo: {
    alignItems: 'flex-end',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  instructor: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'right',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 2,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  performanceCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  performanceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  performanceIcon: {
    fontSize: 24,
  },
  performanceText: {
    flex: 1,
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  performanceSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  difference: {
    fontSize: 18,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
});

export default GradeDetails;