import SubjectScroller from "@/components/Scroller";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import AttendanceProgressCard from "../../../../components/attendance/AttendanceProgressCard";
import AttendanceStatsCard from "../../../../components/attendance/AttendanceStatCard";
import {
  mockAttendanceData,
  mockSubjects,
} from "../../../../data/mockAttendance";

const AttendanceScreen: React.FC = () => {
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(0);

  // Mock data
  const subjects = mockSubjects || [];
  const currentSubject = subjects[selectedSubjectIndex] || null;
  const currentAttendance = mockAttendanceData?.[selectedSubjectIndex] || null;
  const hasSubjects = subjects.length > 0;

  // Calculate attendance percentage
  const getAttendancePercentage = (attendance: any) => {
    if (!attendance || !attendance.totalClasses || attendance.totalClasses <= 0)
      return 100;
    const percent =
      (attendance.attendedClasses / attendance.totalClasses) * 100;
    return Math.min(Math.max(Math.round(percent), 0), 100);
  };

  const percentage = useMemo(
    () => getAttendancePercentage(currentAttendance),
    [currentAttendance]
  );

  // Dynamic colors and status
  const statusColor =
    percentage >= 85
      ? "#10B981" // Green
      : percentage >= 75
      ? "#F59E0B" // Yellow
      : "#EF4444"; // Red

  const statusText =
    percentage >= 85
      ? "Excellent"
      : percentage >= 75
      ? "Good"
      : "Needs Improvement";

  // Format subjects for scroller
  const scrollerItems = subjects.map((subject) => ({
    id: subject.id,
    title: subject.name,
    code: subject.code,
  }));

  // No subjects fallback
  if (!hasSubjects) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>📊 No Subjects Found</Text>
            <Text style={styles.emptyText}>
              There's no attendance data available at the moment.
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance Tracker</Text>
          <Text style={styles.subtitle}>
            Track your attendance and progress across subjects
          </Text>
        </View>

        {/* Subject Scroller */}
        <SubjectScroller
          items={scrollerItems}
          selectedIndex={selectedSubjectIndex}
          onItemChange={setSelectedSubjectIndex}
          titleKey="title"
          showDots={false}
          showBackground={true}
          color="#111827"
          backgroundColor="#F9FAFB"
        />

        {/* Stats Cards */}
        <View style={styles.cardsContainer}>
          <AttendanceStatsCard
            attendance={currentAttendance}
            percentage={percentage}
            statusColor={statusColor}
            statusText={statusText}
          />

          <View style={styles.cardSpacer} />

          <AttendanceProgressCard
            attendance={currentAttendance}
            percentage={percentage}
            statusColor={statusColor}
          />
        </View>

        {/* Additional Info */}
        <View style={styles.additionalInfo}>
          <Text style={styles.infoTitle}>Attendance Tips</Text>
          <View style={styles.tipsContainer}>
            <View style={styles.tipItem}>
              <View style={[styles.tipDot, { backgroundColor: "#10B981" }]} />
              <Text style={styles.tipText}>
                {percentage >= 85
                  ? "🎯 Excellent! Keep up the good work!"
                  : percentage >= 75
                  ? "👍 Good attendance, stay consistent!"
                  : "⚠️ Try to attend more classes to improve your percentage"}
              </Text>
            </View>
            <View style={styles.tipItem}>
              <View style={[styles.tipDot, { backgroundColor: "#3B82F6" }]} />
              <Text style={styles.tipText}>
                Current streak: {currentAttendance?.currentStreak || 0} days
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cardSpacer: {
    height: 16,
  },
  additionalInfo: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  tipsContainer: {
    gap: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  tipDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: "100%",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default AttendanceScreen;
