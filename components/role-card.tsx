import { Link } from "expo-router";
import { ReactNode, cloneElement, isValidElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface RoleCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  color?: "blue" | "purple" | "green" | "orange";
  status?: string;
  statusColor?: string;
}

export function RoleCard({
  title,
  description,
  icon,
  href,
  color = "blue",
  status = "Available",
  statusColor = "text-green-500",
}: RoleCardProps): React.JSX.Element {
  // Get styles based on color and theme
  const getStyles = () => {
    const colorMap = {
      blue: {
        button: "bg-blue-600",
        iconBg: "bg-blue-50",
        iconColor: "#2563eb",
        statusDot: "bg-green-500",
      },
      purple: {
        button: "bg-purple-600",
        iconBg: "bg-purple-50",
        iconColor: "#9333ea",
        statusDot: "bg-green-500",
      },
      green: {
        button: "bg-emerald-600",
        iconBg: "bg-emerald-50",
        iconColor: "#059669",
        statusDot: "bg-green-500",
      },
      orange: {
        button: "bg-orange-600",
        iconBg: "bg-orange-50",
        iconColor: "#ea580c",
        statusDot: "bg-green-500",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  const styles = getStyles();
  const bgColor = "bg-white";
  const textColor = "text-gray-900";

  // Clone icon with specific color safely
  const coloredIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<any>, { color: styles.iconColor })
    : icon;

  return (
    <Link href={href as any} asChild>
      <TouchableOpacity
        className={`${bgColor} rounded-2xl p-6 mb-6 shadow-sm active:opacity-90`}
        activeOpacity={0.9}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 3.84,
          elevation: 2,
        }}
      >
        <View className="flex-row items-start mb-6">
          <View className={`${styles.iconBg} p-4 rounded-2xl mr-4`}>
            {coloredIcon}
          </View>
          <View className="flex-1">
            <Text className={`text-xl font-bold mb-1 ${textColor}`}>
              {title}
            </Text>
            <View className="flex-row items-center">
              <View
                className={`w-2 h-2 rounded-full ${styles.statusDot} mr-2`}
              />
              <Text className="text-gray-500 font-medium text-sm">
                {status}
              </Text>
            </View>
          </View>
        </View>

        <View
          className={`w-full py-4 rounded-xl items-center flex-row justify-center ${styles.button}`}
        >
          <Text className="text-white font-bold text-base mr-2">
            Enter Portal
          </Text>
          <Text className="text-white font-bold text-base">→</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
