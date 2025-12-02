// components/timetable/TimetableComponent.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  ClassSession,
  DaySchedule,
  TimetableComponentProps,
} from "../../types/timetable";
import SubjectScroller from "../Scroller";
import SessionCard from "./SessionCard";

const TimetableComponent: React.FC<TimetableComponentProps> = ({
  data,
  type = "student",
  title = "Timetable",
  onSessionClick,
  onExport,
}) => {
  const [currentWeek, setCurrentWeek] = useState(data);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const totalDays = dayNames.length;

  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let mondayFirst = dayOfWeek === 0 ? 0 : dayOfWeek - 1;
    mondayFirst = Math.max(0, Math.min(totalDays - 1, mondayFirst));
    setSelectedDayIndex(mondayFirst);
  }, [currentWeek, totalDays]);

  const handleSessionClick = (sessionId: string) => {
    onSessionClick?.(sessionId);
  };

  const handleExport = () => {
    onExport?.();
  };

  const getCurrentDay = (): DaySchedule => {
    const day = currentWeek.days[selectedDayIndex];
    if (!day) {
      return {
        day: dayNames[selectedDayIndex] || "Monday",
        date: new Date().toISOString().split("T")[0],
        sessions: [],
      };
    }
    return day;
  };

  const isCurrentSession = (
    session: ClassSession,
    day: DaySchedule
  ): boolean => {
    if (
      !session.timeSlot?.startTime ||
      !session.timeSlot?.endTime ||
      !day.date
    ) {
      return false;
    }

    const now = new Date();
    const sessionStart = new Date(`${day.date}T${session.timeSlot.startTime}`);
    const sessionEnd = new Date(`${day.date}T${session.timeSlot.endTime}`);

    return now >= sessionStart && now <= sessionEnd;
  };

  const currentDay = getCurrentDay();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* White Header Section - Matching Books page */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.title}>
              {title}
            </Text>
            <Text style={styles.subtitle}>
              View your weekly schedule
            </Text>
          </View>
          
          {/* Optional: Add an action button like the PTCB button in Books page */}
          {/* <TouchableOpacity
            style={styles.headerButton}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar-outline" size={18} color="white" />
          </TouchableOpacity> */}
        </View>

        {/* Day Navigation using SubjectScroller */}
        <SubjectScroller
          items={currentWeek.days.map((day, index) => ({
            id: `day-${index}`,
            title: day.day,
            count: day.sessions?.length || 0,
          }))}
          selectedIndex={selectedDayIndex}
          onItemChange={setSelectedDayIndex}
          showCount={true}
          countKey="count"
          showDots={false}
          color="#111827"
          backgroundColor="#f9fafb"
        />
      </View>

      {/* Sessions List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sessionsContainer}>
          {currentDay.sessions.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons name="calendar-outline" size={48} color="#10B981" />
              </View>
              <Text style={styles.emptyTitle}>
                No {type === "teacher" ? "Classes" : "Sessions"} Today
              </Text>
              <Text style={styles.emptySubtitle}>
                {type === "teacher"
                  ? "No classes scheduled for today."
                  : "Enjoy your free day!"}
              </Text>
            </View>
          ) : (
            currentDay.sessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                type={type}
                isCurrent={isCurrentSession(session, currentDay)}
                onPress={handleSessionClick}
              />
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // Changed to match Books page background
  },
  // White Header Section - Exactly like Books page
  header: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
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
  headerButton: {
    backgroundColor: '#16a34a',
    padding: 8,
    borderRadius: 8,
  },
  scrollView: {
    flex: 1,
  },
  sessionsContainer: {
    padding: 16, // Reduced from 20 to match Books page padding
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48, // Reduced from 60 to match Books page
  },
  emptyIcon: {
    backgroundColor: '#F0FDF4',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 16, // Reduced from 18 to be consistent
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default TimetableComponent;