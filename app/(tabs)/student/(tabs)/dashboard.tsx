import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function StudentDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Welcome back, Student!</Text>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>85.3%</Text>
            <Text style={styles.statLabel}>Attendance</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>9</Text>
            <Text style={styles.statLabel}>Deadlines</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
        </View>

        {/* Recent Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Courses</Text>
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>Mathematics 101</Text>
            <Text style={styles.courseSubtitle}>Last accessed 2 hours ago</Text>
          </View>
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>Physics Advanced</Text>
            <Text style={styles.courseSubtitle}>Last accessed 2 hours ago</Text>
          </View>
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>Computer Science</Text>
            <Text style={styles.courseSubtitle}>Last accessed 2 hours ago</Text>
          </View>
        </View>

        {/* Upcoming Deadlines */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
          <View style={styles.deadlineCard}>
            <Text style={styles.deadlineTitle}>Assignment #5</Text>
            <Text style={styles.deadlineDate}>Due Tomorrow</Text>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>
              Assignment Due Tomorrow
            </Text>
            <Text style={styles.notificationText}>
              Your Mathematics assignment is due tomorrow at 11:59 PM.
            </Text>
          </View>
          <View style={styles.notificationCard}>
            <Text style={styles.notificationTitle}>New Grade Posted</Text>
            <Text style={styles.notificationText}>
              Your Physics quiz grade has been posted. You scored 87/100.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563eb",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 12,
  },
  courseCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#2563eb",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  courseSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
  deadlineCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
  },
  deadlineTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  deadlineDate: {
    fontSize: 12,
    color: "#dc2626",
    marginTop: 4,
  },
  notificationCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  notificationText: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },
});