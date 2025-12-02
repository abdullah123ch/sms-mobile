import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ClassSession } from "../../types/timetable";

interface SessionCardProps {
  session: ClassSession;
  type: "student" | "teacher";
  isCurrent?: boolean;
  onPress: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  type,
  isCurrent = false,
  onPress,
}) => {
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":");
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const ampm = hour24 >= 12 ? "PM" : "AM";
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getSessionDisplayName = (session: ClassSession): string => {
    if (type === "teacher") {
      return `${session.class} - Section ${session.section}`;
    } else {
      return session.subject?.name || "Unknown Subject";
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isCurrent && styles.currentSession,
        { borderLeftColor: "#10B981" },
      ]}
      onPress={() => onPress(session.id)}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={[styles.dot, { backgroundColor: "#10B981" }]} />
          <Text style={styles.title} numberOfLines={1}>
            {getSessionDisplayName(session)}
          </Text>
        </View>
        {isCurrent && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>Live</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.time}>
          {formatTime(session.timeSlot.startTime)} -{" "}
          {formatTime(session.timeSlot.endTime)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  currentSession: {
    backgroundColor: "#F0FDF4",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
  },
  liveBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  liveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    gap: 4,
  },
  time: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
});

export default SessionCard;
