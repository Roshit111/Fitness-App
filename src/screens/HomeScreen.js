"use client";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios"; // Add axios for HTTP requests
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router"; // Import router for Expo Router
// import Colors from "../../constants/Colors";
import { getproductlist } from "../services/productServices";
import { getemployelistview } from "../services/productServices";
import { getProfileInfo } from "../services/authServices";

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
  name: "ANIKET",
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

const HomeScreen = () => {
  const router = useRouter(); // Use Expo Router
  const [hasMore, setHasMore] = useState(true);
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainers, setTrainers] = useState([]);

  // Exerciselist
  useEffect(() => {
    // console.log("useEffect: Starting fetch...");
    setLoading(true);
    getproductlist("")
      .then((res) => {
        // console.log("useEffect: Raw API Response:", res);
        const newProducts = Array.isArray(res?.data) ? res.data : [];
        // console.log("useEffect: Setting products to:", newProducts);
        setProducts(newProducts);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("useEffect: Error fetching product list:", error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getemployelistview()
      .then((res) => {
        setTrainers(res.data);
        // console.log("Trainers data:", res.data);
      })
      .catch((error) => console.error("trainer load failed:", error));
  }, []);

  const safeProduct = Array.isArray(product) ? product : [];

  // console.log("Render: Loading state:", loading);
  // console.log("Render: Product state:", product);
  // console.log("Render: Safe product:", safeProduct);

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
          onPress={() => router.push("/Profile")}
        >
          <Image source={{ uri: DEFAULT_AVATAR }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("Book")}
          >
            <Ionicons name="calendar" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Book Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("Workout")}
          >
            <Ionicons name="fitness" size={24} color="#4CAF50" />
            <Text style={styles.actionText}>Start Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("Progress")}
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
            <TouchableOpacity onPress={() => router.push("/Classes")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {upcomingClasses.length > 0 ? (
            upcomingClasses.map((classItem) => (
              <TouchableOpacity
                key={classItem.id}
                style={styles.classCard}
                onPress={() =>
                  router.push({
                    pathname: "/ClassDetail",
                    params: { classId: classItem.id },
                  })
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

        {/* Recent Workouts */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            <Text style={styles.seeAllText}>See All</Text>
          </View>
          {recentWorkouts.length > 0 ? (
            recentWorkouts.map((workout, index) => (
              <View key={index} style={styles.workoutCard}>
                <Ionicons
                  name="fitness-outline"
                  size={24}
                  color="#4CAF50"
                  style={styles.workoutIcon}
                />
                <View style={styles.workoutInfo}>
                  <Text style={styles.workoutName}>{workout.workout}</Text>
                  <Text style={styles.workoutDate}>{workout.date}</Text>
                </View>
                <View style={styles.workoutStats}>
                  <Text style={styles.workoutDuration}>
                    {workout.duration} min
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No recent workouts</Text>
          )}
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Goals In Progress</Text>
            <TouchableOpacity onPress={() => router.push("/Goals")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {inProgressGoals.length > 0 ? (
            inProgressGoals.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={styles.goalCard}
                onPress={() => router.push("/Goals")}
              >
                <View style={styles.goalInfo}>
                  <Text style={styles.goalName}>{goal.name}</Text>
                  <Text style={styles.goalTarget}>
                    Target: {goal.target} • Due: {goal.deadline}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${goal.percentComplete}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {goal.progress} ({goal.percentComplete}% complete)
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No goals in progress</Text>
          )}
        </View>

        {/* Our Trainers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Trainers</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trainers}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.trainerList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.trainerCard}
                onPress={() =>
                  router.push({
                    pathname: "/TrainerDetail",
                    params: { trainer: JSON.stringify(item) },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.trainerImage}
                />
                <Text style={styles.trainerName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No trainers available</Text>
            }
          />
        </View>

        {/* Exercise List */}
        <View style={styles.safeContainer1}>
          <Text style={styles.title1}>Select Your Fitness Areas</Text>
          <View style={styles.container1}>
            {safeProduct.length === 0 ? (
              <Text style={styles.emptyText1}>No fitness areas available</Text>
            ) : (
              <FlatList
                data={safeProduct}
                numColumns={2}
                keyExtractor={(item, index) =>
                  `${item?.id || item?.name || "item"}-${index}`
                }
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.columnWrapper}
                renderItem={({ item, index }) => (
                  <BodyPartCard router={router} index={index} item={item} />
                )}
                onEndReachedThreshold={0.8}
                ListFooterComponent={
                  loading ? (
                    <Text>Loading...</Text>
                  ) : !hasMore ? (
                    <Text>No more items</Text>
                  ) : null
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const BodyPartCard = ({ router, index, item }) => {
  // console.log("BodyPartCard: Rendering item at index", index, ":", item);

  if (!item) {
    // console.warn("BodyPartCard: item is undefined at index", index);
    return (
      <View style={styles.bodyPartCard}>
        <Text style={styles.bodyPartText}>Invalid Item</Text>
      </View>
    );
  }

  // Handle different image formats
  const imageSource =
    item.image && typeof item.image === "object" && item.image.uri
      ? item.image
      : item.image && typeof item.image === "string"
      ? { uri: item.image }
      : item.imageUrl
      ? { uri: item.imageUrl }
      : { uri: DEFAULT_AVATAR }; // Fallback to default avatar

  // Handle different name formats
  const displayName = item.name || item.title || "Unnamed";

  return (
    <TouchableOpacity onPress={() => router.push("/Workout")}>
      <View style={styles.bodyPartCard}>
        <Image source={imageSource} style={styles.bodyPartImage} />
        <Text style={styles.bodyPartText}>{displayName}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  safeContainer: {
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
    color: "#FFFFFF",
  },
  membershipInfo: {
    fontSize: 14,
    color: "#FFFFFF",
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
    paddingVertical: 10,
  },
  workoutCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutIcon: {
    marginRight: 10,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  workoutDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  workoutStats: {
    alignItems: "flex-end",
  },
  workoutDuration: {
    fontSize: 12,
    color: "#666",
  },
  goalCard: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  goalInfo: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  goalTarget: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  trainerCard: {
    alignItems: "center",
    marginRight: 15,
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
  },
  trainerName: {
    fontSize: 14,
    color: "#333",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  bodyPartCard: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 120,
    maxWidth: width / 2 - 30,
  },
  bodyPartImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
    backgroundColor: "#e0e0e0",
  },
  bodyPartText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },

  // Exercise List
  safeContainer1: {
    backgroundColor: "#F5F5F5",
  },
  container1: {
    paddingHorizontal: 4,
    paddingTop: hp(2),
  },
  title1: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#404040",
    marginBottom: hp(2),
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: hp(14), // Adjusted for better scrolling
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  bodyPartCard: {
    width: wp(100),
    height: hp(18),
    flexDirection: "row",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bodyPartImage: {
    width: wp(18), // Adjusted to fit within the card
    height: hp(14),
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#e0e0e0",
  },
  bodyPartInfo: {
    flex: 1,
    justifyContent: "center",
  },
  bodyPartText: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  bodyPartDescription: {
    fontSize: hp(1.6),
    color: "#666",
    marginBottom: 2,
    lineHeight: hp(2),
  },
  bodyPartCharge: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: "#4CAF50",
  },
  emptyText1: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    paddingVertical: 10,
  },

  card1: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    elevation: 3,
  },
  cardTitle1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardPrice1: {
    fontSize: 16,
    color: "#4caf50",
    marginBottom: 4,
  },
  cardDescription1: {
    fontSize: 14,
    color: "#555",
  },
});

export default HomeScreen;
