import { RoleCard } from "@/components/role-card";
import { router } from "expo-router";
import { ArrowLeft, GraduationCap, UserCheck } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelection(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1 bg-blue-50">
      {/* Header with Back Button */}
      <View className="flex-row items-center px-6 pt-4">
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="mr-4 p-2"
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#374151" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        className="px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Message */}
        <View className="items-center mb-12">
          <View className="bg-blue-600 p-3 rounded-xl mb-4">
            <GraduationCap size={32} color="white" />
          </View>
          <Text className="text-4xl font-bold mb-4 text-center text-gray-900">
            School LMS
          </Text>
          <Text className="text-lg text-center leading-7 max-w-md text-gray-600">
            Welcome to our Learning Management System. Please select your role
            to continue.
          </Text>
        </View>

        {/* Role Cards using reusable component */}
        <RoleCard
          title="Student Portal"
          description="Access your courses, assignments, grades, and learning materials. Track your progress and submit assignments."
          icon={<GraduationCap size={24} color="#3b82f6" />}
          href="/(tabs)/student"
          color="blue"
        />

        <RoleCard
          title="Teacher Portal"
          description="Manage courses, students, assignments, and track academic progress. Create and grade assignments efficiently."
          icon={<UserCheck size={24} color="#8b5cf6" />}
          href="/(tabs)/teacher"
          color="purple"
        />

        {/* Support Section */}
        <View className="mt-auto py-8 items-center">
          <Text className="text-center mb-2 text-gray-600">
            Need help? Contact our support team at
          </Text>
          <Text className="text-blue-500 font-medium text-base">
            support@school-lms.edu
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
