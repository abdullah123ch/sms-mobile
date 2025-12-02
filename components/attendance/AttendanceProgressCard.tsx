import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Card  from '../card';

interface AttendanceProgressCardProps {
  attendance: {
    attendedClasses: number;
    totalClasses: number;
    absentClasses: number;
  };
  percentage: number;
  statusColor: string;
}

const AttendanceProgressCard: React.FC<AttendanceProgressCardProps> = ({
  attendance,
  percentage,
  statusColor,
}) => {
  const getProgressColor = (percent: number) => {
    if (percent >= 85) return '#10B981';    // Green
    if (percent >= 70) return '#F59E0B';    // Yellow
    return '#EF4444';                       // Red
  };

  const progressColor = getProgressColor(percentage);
  const screenWidth = Dimensions.get('window').width;
  const maxWidth = screenWidth - 64; // Account for padding

  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={1}>
        Attendance Overview
      </Text>
      
      <View style={styles.percentageContainer}>
        <Text 
          style={[styles.percentageText, { color: statusColor }]} 
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {percentage}%
        </Text>
        <Text 
          style={styles.classesText} 
          numberOfLines={2}
          textBreakStrategy="highQuality"
        >
          {attendance?.attendedClasses ?? 0} / {attendance?.totalClasses ?? 0} classes attended
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: progressColor,
                maxWidth: maxWidth - 32, // Ensure it doesn't overflow
              }
            ]} 
          />
        </View>
        
        <View style={styles.progressLabels}>
          <Text 
            style={styles.progressLabel} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Absent: {attendance?.absentClasses ?? 0}
          </Text>
          <Text 
            style={styles.progressLabel} 
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Attended: {attendance?.attendedClasses ?? 0}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 280, // Match the stats card height
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  percentageContainer: {
    alignItems: 'center',
    marginBottom: 24,
    minHeight: 80, // Reserve space for the percentage
  },
  percentageText: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    includeFontPadding: false,
  },
  classesText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  progressContainer: {
    gap: 12,
  },
  progressBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    minWidth: 6, // Minimum width to show something
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 20,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
    marginHorizontal: 4,
  },
});

export default AttendanceProgressCard;