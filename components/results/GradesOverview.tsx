// components/results/GradesOverview.tsx
import {
  CourseGrade,
  PerformanceMetrics,
  StudentProfile,
} from "@/types/results";
import { Award, BookOpen, TrendingUp } from "lucide-react-native";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { Card } from "../ui/card";
import SubjectsList from "./SubjectList";

interface GradesOverviewProps {
  subjects: CourseGrade[];
  studentProfile: StudentProfile;
  performanceMetrics: PerformanceMetrics;
}

const { width } = Dimensions.get("window");

const GradesOverview: React.FC<GradesOverviewProps> = ({
  subjects,
  studentProfile,
  performanceMetrics,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>Academic Results</ThemedText>
        <ThemedText style={styles.subtitle}>
          Overview of your performance across all subjects
        </ThemedText>
      </View>

      {/* Combined Overview Card */}
      <Card style={styles.overviewCard}>
        <View
          style={[
            styles.overviewGrid,
            { flexDirection: width < 768 ? "column" : "row" },
          ]}
        >
          {/* Cumulative Grade */}
          <View
            style={[
              styles.overviewItem,
              width < 768 && styles.overviewItemMobile,
            ]}
          >
            <View style={styles.overviewHeader}>
              <Award size={32} color="#2563eb" />
              <ThemedText style={styles.overviewTitle}>
                Cumulative Grade
              </ThemedText>
            </View>
            <ThemedText style={[styles.overviewValue, { color: "#2563eb" }]}>
              {performanceMetrics.averageScore.toFixed(1)}%
            </ThemedText>
            <ThemedText style={styles.overviewLabel}>
              Overall Average
            </ThemedText>
          </View>

          {/* GPA */}
          <View
            style={[
              styles.overviewItem,
              width < 768 && styles.overviewItemMobile,
            ]}
          >
            <View style={styles.overviewHeader}>
              <TrendingUp size={32} color="#16a34a" />
              <ThemedText style={styles.overviewTitle}>GPA</ThemedText>
            </View>
            <ThemedText style={[styles.overviewValue, { color: "#16a34a" }]}>
              {studentProfile.cumulativeGPA.toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.overviewLabel}>Cumulative GPA</ThemedText>
          </View>

          {/* Total Subjects */}
          <View
            style={[
              styles.overviewItem,
              width < 768 && styles.overviewItemMobile,
            ]}
          >
            <View style={styles.overviewHeader}>
              <BookOpen size={32} color="#9333ea" />
              <ThemedText style={styles.overviewTitle}>
                Total Subjects
              </ThemedText>
            </View>
            <ThemedText style={[styles.overviewValue, { color: "#9333ea" }]}>
              {subjects.length}
            </ThemedText>
            <ThemedText style={styles.overviewLabel}>
              Enrolled Courses
            </ThemedText>
          </View>
        </View>
      </Card>

      {/* Subjects List Component */}
      <SubjectsList subjects={subjects} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
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
  overviewCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  overviewGrid: {
    gap: 24,
  },
  overviewItem: {
    flex: 1,
    alignItems: "center",
  },
  overviewItemMobile: {
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  overviewValue: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 14,
    color: "#6b7280",
  },
});

export default GradesOverview;
