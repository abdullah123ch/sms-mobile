import { StyleSheet, Text, View } from "react-native";

export default function TeacherScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Teacher Portal</Text>
      <Text style={styles.subText}>Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
  },
});
