import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Calendar, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react-native';
import Card from '../card';

interface AttendanceStatsCardProps {
  attendance: {
    totalClasses: number;
    attendedClasses: number;
    absentClasses: number;
    currentStreak: number;
  };
  percentage: number;
  statusColor: string;
  statusText: string;
}

const AttendanceStatsCard: React.FC<AttendanceStatsCardProps> = ({
  attendance,
  percentage,
  statusColor,
  statusText,
}) => {
  const stats = [
    {
      label: 'Total Classes',
      value: attendance?.totalClasses ?? '—',
      icon: <Calendar size={16} color="#3B82F6" />,
    },
    {
      label: 'Attended',
      value: attendance?.attendedClasses ?? '—',
      icon: <CheckCircle size={16} color="#10B981" />,
    },
    {
      label: 'Absent',
      value: attendance?.absentClasses ?? '—',
      icon: <AlertCircle size={16} color="#EF4444" />,
    },
    {
      label: 'Current Streak',
      value: `${attendance?.currentStreak ?? 0} days`,
      icon: <TrendingUp size={16} color="#8B5CF6" />,
    },
  ];

  return (
    <Card style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={1}>Subject Summary</Text>
      
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View 
            key={stat.label} 
            style={[
              styles.statRow,
              index < stats.length - 1 && styles.statBorder
            ]}
          >
            <View style={styles.statLabelContainer}>
              {stat.icon}
              <Text style={styles.statLabel} numberOfLines={1}>
                {stat.label}
              </Text>
            </View>
            <Text style={styles.statValue} numberOfLines={1}>
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel} numberOfLines={1}>
            Attendance %
          </Text>
          <Text 
            style={[styles.summaryValue, { color: statusColor }]} 
            numberOfLines={1}
          >
            {percentage}%
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel} numberOfLines={1}>
            Status
          </Text>
          <Text 
            style={[styles.summaryValue, { color: statusColor }]} 
            numberOfLines={1}
          >
            {statusText}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 280, // Set minimum height
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  statsContainer: {
    gap: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    minHeight: 40,
  },
  statBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    flexShrink: 1, // Allow text to shrink
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flexShrink: 0, // Prevent value from shrinking
    textAlign: 'right',
  },
  summaryContainer: {
    marginTop: 16,
    gap: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 24,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
    flexShrink: 0,
    marginLeft: 8,
  },
});

export default AttendanceStatsCard;