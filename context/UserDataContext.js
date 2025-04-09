import { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "./AuthContext"; // Ensure this file exists

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [workouts, setWorkouts] = useState([]);
  const [classes, setClasses] = useState([]);
  const [nutrition, setNutrition] = useState({
    mealPlans: [],
    waterIntake: 0,
    dailyCalorieGoal: 2000,
  });
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({
    weight: [],
    measurements: {},
    workoutHistory: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      // Load workouts
      const workoutsData = await AsyncStorage.getItem("workouts");
      if (workoutsData) {
        setWorkouts(JSON.parse(workoutsData));
      } else {
        const defaultWorkouts = [
          {
            id: "1",
            name: "Full Body Workout",
            exercises: [
              { name: "Push-ups", sets: 3, reps: 10 },
              { name: "Squats", sets: 3, reps: 15 },
              { name: "Lunges", sets: 3, reps: 10 },
              { name: "Plank", sets: 3, duration: "30 seconds" },
            ],
            duration: 45,
            caloriesBurned: 300,
          },
          {
            id: "2",
            name: "Cardio Blast",
            exercises: [
              { name: "Jumping Jacks", sets: 3, reps: 20 },
              { name: "Mountain Climbers", sets: 3, reps: 15 },
              { name: "Burpees", sets: 3, reps: 10 },
              { name: "High Knees", sets: 3, duration: "30 seconds" },
            ],
            duration: 30,
            caloriesBurned: 250,
          },
        ];
        setWorkouts(defaultWorkouts);
        await AsyncStorage.setItem("workouts", JSON.stringify(defaultWorkouts));
      }

      // Load classes
      const classesData = await AsyncStorage.getItem("classes");
      if (classesData) {
        setClasses(JSON.parse(classesData));
      } else {
        const defaultClasses = [
          {
            id: "1",
            name: "Yoga Flow",
            instructor: "Sarah Johnson",
            time: "08:00 AM",
            day: "Monday",
            duration: 60,
            capacity: 15,
            enrolled: 8,
            description: "A gentle flow yoga class suitable for all levels.",
          },
          {
            id: "2",
            name: "HIIT Challenge",
            instructor: "Mike Peterson",
            time: "06:00 PM",
            day: "Tuesday",
            duration: 45,
            capacity: 20,
            enrolled: 15,
            description: "High-intensity interval training to boost your metabolism.",
          },
          {
            id: "3",
            name: "Spin Class",
            instructor: "Emma Roberts",
            time: "07:30 AM",
            day: "Wednesday",
            duration: 45,
            capacity: 12,
            enrolled: 10,
            description: "Indoor cycling class with energetic music.",
          },
        ];
        setClasses(defaultClasses);
        await AsyncStorage.setItem("classes", JSON.stringify(defaultClasses));
      }

      // Load nutrition data
      const nutritionData = await AsyncStorage.getItem("nutrition");
      if (nutritionData) {
        setNutrition(JSON.parse(nutritionData));
      } else {
        const defaultNutrition = {
          mealPlans: [
            {
              id: "1",
              name: "Weight Loss Plan",
              meals: [
                {
                  name: "Breakfast",
                  foods: ["Oatmeal with berries", "Greek yogurt"],
                  calories: 350,
                  protein: 20,
                  carbs: 45,
                  fat: 10,
                },
                {
                  name: "Lunch",
                  foods: ["Grilled chicken salad", "Whole grain bread"],
                  calories: 450,
                  protein: 35,
                  carbs: 30,
                  fat: 15,
                },
                {
                  name: "Dinner",
                  foods: ["Baked salmon", "Steamed vegetables", "Brown rice"],
                  calories: 550,
                  protein: 40,
                  carbs: 40,
                  fat: 20,
                },
                {
                  name: "Snack",
                  foods: ["Apple", "Almonds"],
                  calories: 200,
                  protein: 5,
                  carbs: 25,
                  fat: 10,
                },
              ],
              totalCalories: 1550,
              totalProtein: 100,
              totalCarbs: 140,
              totalFat: 55,
            },
            {
              id: "2",
              name: "Muscle Gain Plan",
              meals: [
                {
                  name: "Breakfast",
                  foods: ["Protein pancakes", "Scrambled eggs", "Banana"],
                  calories: 550,
                  protein: 35,
                  carbs: 60,
                  fat: 15,
                },
                {
                  name: "Lunch",
                  foods: ["Turkey wrap", "Cottage cheese", "Mixed fruit"],
                  calories: 650,
                  protein: 45,
                  carbs: 50,
                  fat: 20,
                },
                {
                  name: "Dinner",
                  foods: ["Steak", "Sweet potato", "Broccoli"],
                  calories: 750,
                  protein: 50,
                  carbs: 45,
                  fat: 30,
                },
                {
                  name: "Snack",
                  foods: ["Protein shake", "Peanut butter sandwich"],
                  calories: 400,
                  protein: 30,
                  carbs: 35,
                  fat: 15,
                },
              ],
              totalCalories: 2350,
              totalProtein: 160,
              totalCarbs: 190,
              totalFat: 80,
            },
          ],
          waterIntake: 0,
          dailyCalorieGoal: 2000,
        };
        setNutrition(defaultNutrition);
        await AsyncStorage.setItem("nutrition", JSON.stringify(defaultNutrition));
      }

      // Load goals
      const goalsData = await AsyncStorage.getItem("goals");
      if (goalsData) {
        setGoals(JSON.parse(goalsData));
      } else {
        const defaultGoals = [
          {
            id: "1",
            name: "Run 5K",
            target: "5 kilometers",
            progress: "3.2 kilometers",
            percentComplete: 64,
            deadline: "2024-06-30",
          },
          {
            id: "2",
            name: "Lose Weight",
            target: "10 kg",
            progress: "3 kg",
            percentComplete: 30,
            deadline: "2024-08-15",
          },
          {
            id: "3",
            name: "Bench Press",
            target: "100 kg",
            progress: "80 kg",
            percentComplete: 80,
            deadline: "2024-07-01",
          },
        ];
        setGoals(defaultGoals);
        await AsyncStorage.setItem("goals", JSON.stringify(defaultGoals));
      }

      // Load progress data
      const progressData = await AsyncStorage.getItem("progress");
      if (progressData) {
        setProgress(JSON.parse(progressData));
      } else {
        const defaultProgress = {
          weight: [
            { date: "2024-01-01", value: 80 },
            { date: "2024-01-15", value: 79 },
            { date: "2024-02-01", value: 78 },
            { date: "2024-02-15", value: 77.5 },
            { date: "2024-03-01", value: 77 },
          ],
          measurements: {
            chest: [
              { date: "2024-01-01", value: 100 },
              { date: "2024-02-01", value: 99 },
              { date: "2024-03-01", value: 98 },
            ],
            waist: [
              { date: "2024-01-01", value: 85 },
              { date: "2024-02-01", value: 84 },
              { date: "2024-03-01", value: 83 },
            ],
            arms: [
              { date: "2024-01-01", value: 35 },
              { date: "2024-02-01", value: 36 },
              { date: "2024-03-01", value: 37 },
            ],
          },
          workoutHistory: [
            { date: "2024-03-01", workout: "Full Body Workout", duration: 45 },
            { date: "2024-03-03", workout: "Cardio Blast", duration: 30 },
            { date: "2024-03-05", workout: "Full Body Workout", duration: 50 },
            { date: "2024-03-07", workout: "Cardio Blast", duration: 35 },
          ],
        };
        setProgress(defaultProgress);
        await AsyncStorage.setItem("progress", JSON.stringify(defaultProgress));
      }
    } catch (error) {
      console.log("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Workout functions
  const addWorkout = async (workout) => {
    try {
      const newWorkout = {
        id: Date.now().toString(),
        ...workout,
      };
      const updatedWorkouts = [...workouts, newWorkout];
      setWorkouts(updatedWorkouts);
      await AsyncStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return { success: true };
    } catch (error) {
      console.log("Error adding workout:", error);
      return { success: false, error: "Failed to add workout" };
    }
  };

  const logWorkout = async (workoutId, duration, caloriesBurned) => {
    try {
      const workout = workouts.find((w) => w.id === workoutId);
      if (!workout) {
        return { success: false, error: "Workout not found" };
      }

      const workoutLog = {
        date: new Date().toISOString().split("T")[0],
        workout: workout.name,
        duration,
        caloriesBurned,
      };

      const updatedProgress = {
        ...progress,
        workoutHistory: [...progress.workoutHistory, workoutLog],
      };

      setProgress(updatedProgress);
      await AsyncStorage.setItem("progress", JSON.stringify(updatedProgress));
      return { success: true };
    } catch (error) {
      console.log("Error logging workout:", error);
      return { success: false, error: "Failed to log workout" };
    }
  };

  // Class booking functions
  const bookClass = async (classId) => {
    try {
      const updatedClasses = classes.map((c) => {
        if (c.id === classId && c.enrolled < c.capacity) {
          return { ...c, enrolled: c.enrolled + 1, isBooked: true };
        }
        return c;
      });

      setClasses(updatedClasses);
      await AsyncStorage.setItem("classes", JSON.stringify(updatedClasses));
      return { success: true };
    } catch (error) {
      console.log("Error booking class:", error);
      return { success: false, error: "Failed to book class" };
    }
  };

  const cancelClass = async (classId) => {
    try {
      const updatedClasses = classes.map((c) => {
        if (c.id === classId && c.isBooked) {
          return { ...c, enrolled: c.enrolled - 1, isBooked: false };
        }
        return c;
      });

      setClasses(updatedClasses);
      await AsyncStorage.setItem("classes", JSON.stringify(updatedClasses));
      return { success: true };
    } catch (error) {
      console.log("Error canceling class:", error);
      return { success: false, error: "Failed to cancel class" };
    }
  };

  // Nutrition functions
  const updateWaterIntake = async (amount) => {
    try {
      const updatedNutrition = {
        ...nutrition,
        waterIntake: nutrition.waterIntake + amount,
      };

      setNutrition(updatedNutrition);
      await AsyncStorage.setItem("nutrition", JSON.stringify(updatedNutrition));
      return { success: true };
    } catch (error) {
      console.log("Error updating water intake:", error);
      return { success: false, error: "Failed to update water intake" };
    }
  };

  const resetWaterIntake = async () => {
    try {
      const updatedNutrition = {
        ...nutrition,
        waterIntake: 0,
      };

      setNutrition(updatedNutrition);
      await AsyncStorage.setItem("nutrition", JSON.stringify(updatedNutrition));
      return { success: true };
    } catch (error) {
      console.log("Error resetting water intake:", error);
      return { success: false, error: "Failed to reset water intake" };
    }
  };

  // Goals functions
  const addGoal = async (goal) => {
    try {
      const newGoal = {
        id: Date.now().toString(),
        ...goal,
        progress: "0",
        percentComplete: 0,
      };

      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
      return { success: true };
    } catch (error) {
      console.log("Error adding goal:", error);
      return { success: false, error: "Failed to add goal" };
    }
  };

  const updateGoalProgress = async (goalId, progress, percentComplete) => {
    try {
      const updatedGoals = goals.map((g) => {
        if (g.id === goalId) {
          return { ...g, progress, percentComplete };
        }
        return g;
      });

      setGoals(updatedGoals);
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
      return { success: true };
    } catch (error) {
      console.log("Error updating goal progress:", error);
      return { success: false, error: "Failed to update goal progress" };
    }
  };

  // Progress tracking functions
  const addWeightEntry = async (weight) => {
    try {
      const entry = {
        date: new Date().toISOString().split("T")[0],
        value: weight,
      };

      const updatedProgress = {
        ...progress,
        weight: [...progress.weight, entry],
      };

      setProgress(updatedProgress);
      await AsyncStorage.setItem("progress", JSON.stringify(updatedProgress));
      return { success: true };
    } catch (error) {
      console.log("Error adding weight entry:", error);
      return { success: false, error: "Failed to add weight entry" };
    }
  };

  const addMeasurement = async (type, value) => {
    try {
      const entry = {
        date: new Date().toISOString().split("T")[0],
        value,
      };

      const updatedMeasurements = {
        ...progress.measurements,
        [type]: progress.measurements[type]
          ? [...progress.measurements[type], entry]
          : [entry],
      };

      const updatedProgress = {
        ...progress,
        measurements: updatedMeasurements,
      };

      setProgress(updatedProgress);
      await AsyncStorage.setItem("progress", JSON.stringify(updatedProgress));
      return { success: true };
    } catch (error) {
      console.log("Error adding measurement:", error);
      return { success: false, error: "Failed to add measurement" };
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        workouts,
        classes,
        nutrition,
        goals,
        progress,
        loading,
        addWorkout,
        logWorkout,
        bookClass,
        cancelClass,
        updateWaterIntake,
        resetWaterIntake,
        addGoal,
        updateGoalProgress,
        addWeightEntry,
        addMeasurement,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};