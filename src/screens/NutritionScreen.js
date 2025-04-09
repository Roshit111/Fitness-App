import { useContext, useState } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { UserDataContext } from "../../context/UserDataContext";

const NutritionScreen = ({ navigation }) => {
  const context = useContext(UserDataContext);
  const [activeTab, setActiveTab] = useState("plans");

  // Log to debug context value
  // console.log("UserDataContext value in NutritionScreen:", context);

  // Fallback if context is undefined
  if (!context) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: NutritionScreen must be used within UserDataProvider</Text>
      </SafeAreaView>
    );
  }

  // Destructure after ensuring context exists
  const { nutrition, updateWaterIntake, resetWaterIntake } = context;

  // Fallback if nutrition is undefined (e.g., still loading)
  if (!nutrition) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading nutrition data...</Text>
      </SafeAreaView>
    );
  }

  const handleAddWater = async () => {
    const result = await updateWaterIntake(1);
    if (!result.success) {
      Alert.alert("Error", result.error);
    }
  };

  const handleResetWater = async () => {
    Alert.alert("Reset Water Intake", "Are you sure you want to reset your water intake for today?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reset",
        onPress: async () => {
          const result = await resetWaterIntake();
          if (!result.success) {
            Alert.alert("Error", result.error);
          }
        },
      },
    ]);
  };

  const renderPlansTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Meal Plans</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>+ Create New</Text>
        </TouchableOpacity>
      </View>
      {nutrition.mealPlans && nutrition.mealPlans.length > 0 ? (
        nutrition.mealPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={styles.planCard}
            onPress={() => navigation.navigate("MealPlan", { planId: plan.id })}
          >
            <View style={styles.planHeader}>
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.planMacros}>
                <Text style={styles.macroText}>
                  <Text style={styles.macroValue}>{plan.totalCalories}</Text> cal
                </Text>
                <Text style={styles.macroText}>
                  <Text style={styles.macroValue}>{plan.totalProtein}g</Text> protein
                </Text>
                <Text style={styles.macroText}>
                  <Text style={styles.macroValue}>{plan.totalCarbs}g</Text> carbs
                </Text>
                <Text style={styles.macroText}>
                  <Text style={styles.macroValue}>{plan.totalFat}g</Text> fat
                </Text>
              </View>
            </View>
            <View style={styles.mealList}>
              {plan.meals.map((meal, index) => (
                <View key={index} style={styles.mealItem}>
                  <Text style={styles.mealName}>{meal.name}</Text>
                  <Text style={styles.mealFoods}>{meal.foods.join(", ")}</Text>
                  <Text style={styles.mealCalories}>{meal.calories} calories</Text>
                </View>
              ))}
            </View>
            <View style={styles.planActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="create-outline" size={18} color="#4CAF50" />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="copy-outline" size={18} color="#4CAF50" />
                <Text style={styles.actionButtonText}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="trash-outline" size={18} color="#F44336" />
                <Text style={[styles.actionButtonText, { color: "#F44336" }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No meal plans available</Text>
      )}
    </View>
  );

  const renderWaterTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.waterContainer}>
        <Text style={styles.waterTitle}>Daily Water Intake</Text>
        <Text style={styles.waterSubtitle}>Goal: 8 cups</Text>
        <View style={styles.waterTracker}>
          {Array.from({ length: 8 }).map((_, index) => (
            <View
              key={index}
              style={[styles.waterCup, index < nutrition.waterIntake && styles.waterCupFilled]}
            >
              <Ionicons
                name="water"
                size={30}
                color={index < nutrition.waterIntake ? "#fff" : "#ccc"}
              />
            </View>
          ))}
        </View>
        <Text style={styles.waterProgress}>{nutrition.waterIntake} / 8 cups</Text>
        <View style={styles.waterActions}>
          <TouchableOpacity style={styles.waterButton} onPress={handleAddWater}>
            <Ionicons name="add-circle" size={20} color="#fff" />
            <Text style={styles.waterButtonText}>Add Cup</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.waterButton, styles.resetButton]} onPress={handleResetWater}>
            <Ionicons name="refresh" size={20} color="#fff" />
            <Text style={styles.waterButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.waterTips}>
          <Text style={styles.tipsTitle}>Hydration Tips</Text>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.tipIcon} />
            <Text style={styles.tipText}>Drink a glass of water first thing in the morning</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.tipIcon} />
            <Text style={styles.tipText}>Keep a water bottle with you throughout the day</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.tipIcon} />
            <Text style={styles.tipText}>Set reminders to drink water every hour</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCaloriesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.caloriesContainer}>
        <Text style={styles.caloriesTitle}>Daily Calorie Tracker</Text>
        <Text style={styles.caloriesSubtitle}>Goal: {nutrition.dailyCalorieGoal} calories</Text>
        <View style={styles.caloriesSummary}>
          <View style={styles.calorieStat}>
            <Text style={styles.calorieValue}>1,850</Text>
            <Text style={styles.calorieLabel}>Consumed</Text>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.calorieValue}>350</Text>
            <Text style={styles.calorieLabel}>Burned</Text>
          </View>
          <View style={styles.calorieStat}>
            <Text style={styles.calorieValue}>500</Text>
            <Text style={styles.calorieLabel}>Remaining</Text>
          </View>
        </View>
        <View style={styles.macroSummary}>
          <View style={styles.macroItem}>
            <View style={styles.macroCircle}>
              <Text style={styles.macroPercent}>30%</Text>
            </View>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroGrams}>140g</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={styles.macroCircle}>
              <Text style={styles.macroPercent}>45%</Text>
            </View>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroGrams}>210g</Text>
          </View>
          <View style={styles.macroItem}>
            <View style={styles.macroCircle}>
              <Text style={styles.macroPercent}>25%</Text>
            </View>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={styles.macroGrams}>52g</Text>
          </View>
        </View>
        <View style={styles.mealEntries}>
          <View style={styles.mealEntryHeader}>
            <Text style={styles.mealEntriesTitle}>Today's Meals</Text>
            <TouchableOpacity>
              <Text style={styles.addText}>+ Add Food</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mealEntry}>
            <View style={styles.mealEntryInfo}>
              <Text style={styles.mealEntryName}>Breakfast</Text>
              <Text style={styles.mealEntryItems}>Oatmeal, Greek yogurt, Banana</Text>
            </View>
            <Text style={styles.mealEntryCalories}>450 cal</Text>
          </View>
          <View style={styles.mealEntry}>
            <View style={styles.mealEntryInfo}>
              <Text style={styles.mealEntryName}>Lunch</Text>
              <Text style={styles.mealEntryItems}>Chicken salad, Whole grain bread</Text>
            </View>
            <Text style={styles.mealEntryCalories}>650 cal</Text>
          </View>
          <View style={styles.mealEntry}>
            <View style={styles.mealEntryInfo}>
              <Text style={styles.mealEntryName}>Dinner</Text>
              <Text style={styles.mealEntryItems}>Salmon, Brown rice, Vegetables</Text>
            </View>
            <Text style={styles.mealEntryCalories}>750 cal</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "plans" && styles.activeTabButton]}
          onPress={() => setActiveTab("plans")}
        >
          <Text style={[styles.tabButtonText, activeTab === "plans" && styles.activeTabButtonText]}>
            Meal Plans
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "water" && styles.activeTabButton]}
          onPress={() => setActiveTab("water")}
        >
          <Text style={[styles.tabButtonText, activeTab === "water" && styles.activeTabButtonText]}>
            Water
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "calories" && styles.activeTabButton]}
          onPress={() => setActiveTab("calories")}
        >
          <Text style={[styles.tabButtonText, activeTab === "calories" && styles.activeTabButtonText]}>
            Calories
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {activeTab === "plans" && renderPlansTab()}
        {activeTab === "water" && renderWaterTab()}
        {activeTab === "calories" && renderCaloriesTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  tabButtonText: {
    fontSize: 16,
    color: "#666",
  },
  activeTabButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  tabContent: {
    padding: 15,
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
  addText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  planHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  planName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  planMacros: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  macroText: {
    fontSize: 12,
    color: "#666",
  },
  macroValue: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  mealList: {
    padding: 15,
  },
  mealItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  mealFoods: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  mealCalories: {
    fontSize: 12,
    color: "#4CAF50",
    marginTop: 2,
  },
  planActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  actionButtonText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  waterContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  waterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  waterSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  waterTracker: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  waterCup: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f0f0",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  waterCupFilled: {
    backgroundColor: "#2196F3",
  },
  waterProgress: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
    marginBottom: 20,
  },
  waterActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  waterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  resetButton: {
    backgroundColor: "#FF9800",
  },
  waterButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  waterTips: {
    marginTop: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#666",
  },
  caloriesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  caloriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  caloriesSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  caloriesSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  calorieStat: {
    flex: 1,
    alignItems: "center",
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  calorieLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  macroSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  macroItem: {
    flex: 1,
    alignItems: "center",
  },
  macroCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f0f8f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  macroPercent: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  macroLabel: {
    fontSize: 14,
    color: "#333",
  },
  macroGrams: {
    fontSize: 12,
    color: "#666",
  },
  mealEntries: {
    marginTop: 10,
  },
  mealEntryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  mealEntriesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  mealEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  mealEntryInfo: {
    flex: 1,
  },
  mealEntryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  mealEntryItems: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  mealEntryCalories: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default NutritionScreen;