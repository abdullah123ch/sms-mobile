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
import DayNavigation from "./DayNavigation";
import SessionCard from "./SessionCard";
import TimetableHeader from "./TimetableHeader";

const TimetableComponent: React.FC<TimetableComponentProps> = ({
  data,
  type = "student",
  title = "Timetable",
  subtitle = "View your weekly schedule",
  showStats = false,
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

  // Loop through days continuously
  const goToPreviousDay = () => {
    setSelectedDayIndex((prev) => {
      if (prev === 0) {
        return totalDays - 1;
      } else {
        return prev - 1;
      }
    });
  };

  // Loop through days continuously
  const goToNextDay = () => {
    setSelectedDayIndex((prev) => {
      if (prev === totalDays - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
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

  const getCurrentDayName = (): string => {
    return dayNames[selectedDayIndex];
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

      {/* Header - Updated without current day */}
      <TimetableHeader title={title}/>

      {/* Day Navigation with Loop */}
      <DayNavigation
        currentDay={getCurrentDayName()}
        onPrevious={goToPreviousDay}
        onNext={goToNextDay}
        showLoop={true}
      />

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
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  sessionsContainer: {
    padding: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    backgroundColor: "#F0FDF4",
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});

export default TimetableComponent;
