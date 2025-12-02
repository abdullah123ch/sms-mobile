import { SignInForm } from "@/components/sign-in-form";
import { Link } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="flex-1 items-center justify-center p-4 py-8 sm:py-4 sm:p-6"
        keyboardDismissMode="interactive"
      >
        {/* Header */}
        <View className="items-center mb-8">
          <Text className="text-4xl font-bold mb-2 text-gray-900">
            School LMS
          </Text>
          <Text className="text-lg text-center text-gray-600">
            Welcome to our Learning Management System
          </Text>
        </View>

        {/* Sign In Form */}
        <View className="w-full max-w-sm">
          <SignInForm />
        </View>

        {/* Alternative Continue Option */}
        <View className="mt-6 w-full max-w-sm">
          <Text className="text-center mb-4 text-gray-600">
            Or continue without signing in
          </Text>

          <Link href="/role-selection" asChild>
            <TouchableOpacity className="py-3 rounded-xl border bg-gray-50 border-gray-200">
              <Text className="text-center font-semibold text-gray-900">
                Continue as Guest →
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Support Section */}
        <View className="mt-8 items-center">
          <Text className="text-center mb-1 text-gray-600">Need help?</Text>
          <Text className="text-blue-500 font-medium">
            support@school-lms.edu
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
