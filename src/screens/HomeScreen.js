"use client";

import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");
const DEFAULT_AVATAR =
  "https://cdn-icons-png.freepik.com/256/6997/6997484.png?semt=ais_hybrid";

const STRINGS = {
  greeting: (name) =>
    name ? (name.length > 20 ? `${name.slice(0, 17)}...` : name) : "User",
  searchPlaceholder: "Search here...",
  workoutHeader: "Popular Workout",
  caloriesBurned: (calories) => `🔥 ${calories} Cal`,
  workoutDuration: (time) => `⏳ ${time}`,
};

const user = {
  name: "John Doe",
  membershipType: "Gold",
  visitsLeft: 12,
};

const classes = [
  {
    id: 1,
    day: "Monday",
    time: "6 PM",
    name: "Yoga",
    instructor: "Sarah",
    enrolled: 5,
    capacity: 10,
  },
  {
    id: 2,
    day: "Wednesday",
    time: "7 AM",
    name: "HIIT",
    instructor: "Mike",
    enrolled: 8,
    capacity: 12,
  },
  {
    id: 3,
    day: "Friday",
    time: "5 PM",
    name: "Pilates",
    instructor: "Anna",
    enrolled: 4,
    capacity: 8,
  },
];

const progress = {
  workoutHistory: [
    {
      workout: "Cardio Blast",
      caloriesBurned: 250,
      duration: 30,
      date: "2025-04-03",
    },
    {
      workout: "Strength Training",
      caloriesBurned: 300,
      duration: 45,
      date: "2025-04-02",
    },
  ],
};

const goals = [
  {
    id: 1,
    name: "Lose 5kg",
    target: "70kg",
    deadline: "2025-05-01",
    percentComplete: 60,
    progress: "3kg lost",
  },
  {
    id: 2,
    name: "Run 10km",
    target: "10km",
    deadline: "2025-04-20",
    percentComplete: 40,
    progress: "4km run",
  },
];

const nutrition = {
  waterIntake: 6,
};

const loading = false;

const HomeScreen = ({ navigation }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const upcomingClasses = classes.slice(0, 3);
  const recentWorkouts = progress.workoutHistory.slice(-2).reverse();
  const inProgressGoals = goals
    .filter((goal) => goal.percentComplete < 100)
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name}</Text>
          <Text style={styles.membershipInfo}>
            {user?.membershipType} Membership • {user?.visitsLeft} visits left
          </Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation?.navigate("Profile")}
        >
          <Image
            source={{
              uri: DEFAULT_AVATAR,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate("Classes")}
          >
            <Ionicons name="calendar" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Book Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate("Workout")}
          >
            <Ionicons name="fitness" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation?.navigate("Progress")}
          >
            <Ionicons name="trending-up" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Track Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Summary</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryItem}>
              <Ionicons name="water" size={24} color="#2196F3" />
              <Text style={styles.summaryValue}>
                {nutrition.waterIntake} / 8
              </Text>
              <Text style={styles.summaryLabel}>Water (cups)</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="flame" size={24} color="#FF5722" />
              <Text style={styles.summaryValue}>
                {recentWorkouts[0]?.caloriesBurned || 0}
              </Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="time" size={24} color="#9C27B0" />
              <Text style={styles.summaryValue}>
                {recentWorkouts[0]?.duration || 0}
              </Text>
              <Text style={styles.summaryLabel}>Minutes</Text>
            </View>
          </View>
        </View>

        {/* Upcoming Classes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity onPress={() => navigation?.navigate("Classes")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                onPress={() =>
                  navigation?.navigate("ClassDetail", { classId: classItem.id })
                }
              >
                <View style={styles.classInfo}>
                  <Text style={styles.classTime}>
                    {classItem.day}, {classItem.time}
                  </Text>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <Text style={styles.classInstructor}>
                    with {classItem.instructor}
                  </Text>
                </View>
                <View style={styles.classCapacity}>
                  <Text style={styles.capacityText}>
                    {classItem.enrolled}/{classItem.capacity}
                  </Text>
                  <Text style={styles.capacityLabel}>Spots</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No upcoming classes</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  membershipInfo: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  seeAllText: {
    color: "#4CAF50",
    fontSize: 14,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  classCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  classInfo: {
    flex: 1,
  },
  classTime: {
    fontSize: 12,
    color: "#666",
  },
  className: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  classInstructor: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  classCapacity: {
    alignItems: "center",
  },
  capacityText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  capacityLabel: {
    fontSize: 12,
    color: "#666",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
  },
});

export default HomeScreen;
