import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DayNavigationProps {
  currentDay: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  showLoop?: boolean; // New prop to enable/disable looping
}

const DayNavigation: React.FC<DayNavigationProps> = ({
  currentDay,
  onPrevious,
  onNext,
  canGoPrevious = true,
  canGoNext = true,
  showLoop = true, // Default to true for looping behavior
}) => {
  // With looping enabled, buttons are never disabled
  const previousEnabled = showLoop ? true : canGoPrevious;
  const nextEnabled = showLoop ? true : canGoNext;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !previousEnabled && styles.buttonDisabled]}
        onPress={onPrevious}
        disabled={!previousEnabled}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={previousEnabled ? "#6B7280" : "#D1D5DB"}
        />
      </TouchableOpacity>

      <View style={styles.dayInfo}>
        <Ionicons name="calendar-outline" size={16} color="#6B7280" />
        <Text style={styles.dayText}>{currentDay}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !nextEnabled && styles.buttonDisabled]}
        onPress={onNext}
        disabled={!nextEnabled}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={nextEnabled ? "#6B7280" : "#D1D5DB"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: "#F3F4F6",
  },
  dayInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
});

export default DayNavigation;
