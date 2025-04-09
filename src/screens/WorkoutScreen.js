"use client"

import { useContext, useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { UserDataContext } from "../../context/UserDataContext"

const WorkoutScreen = ({ navigation }) => {
  const { workouts, addWorkout, logWorkout } = useContext(UserDataContext)
  const [activeTab, setActiveTab] = useState("workouts")
  const [logModalVisible, setLogModalVisible] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [duration, setDuration] = useState("")
  const [caloriesBurned, setCaloriesBurned] = useState("")

  const handleLogWorkout = (workout) => {
    setSelectedWorkout(workout)
    setDuration(workout.duration.toString())
    setCaloriesBurned(workout.caloriesBurned.toString())
    setLogModalVisible(true)
  }

  const submitLogWorkout = async () => {
    if (!duration || !caloriesBurned) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    const result = await logWorkout(selectedWorkout.id, Number.parseInt(duration), Number.parseInt(caloriesBurned))

    if (result.success) {
      Alert.alert("Success", "Workout logged successfully!")
      setLogModalVisible(false)
    } else {
      Alert.alert("Error", result.error)
    }
  }

  const renderWorkoutsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Workouts</Text>
        <TouchableOpacity>
          <Text style={styles.addText}>+ Create New</Text>
        </TouchableOpacity>
      </View>

      {workouts.map((workout) => (
        <View key={workout.id} style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <Text style={styles.workoutName}>{workout.name}</Text>
            <View style={styles.workoutMeta}>
              <Text style={styles.workoutMetaText}>
                <Ionicons name="time-outline" size={14} color="#666" /> {workout.duration} min
              </Text>
              <Text style={styles.workoutMetaText}>
                <Ionicons name="flame-outline" size={14} color="#666" /> {workout.caloriesBurned} cal
              </Text>
            </View>
          </View>

          <View style={styles.exerciseList}>
            {workout.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetails}>
                  {exercise.sets} sets × {exercise.reps ? `${exercise.reps} reps` : exercise.duration}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.workoutActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate("WorkoutDetail", { workoutId: workout.id })}
            >
              <Ionicons name="eye-outline" size={18} color="#4CAF50" />
              <Text style={styles.actionButtonText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={() => handleLogWorkout(workout)}>
              <Ionicons name="add-circle-outline" size={18} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Log</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="create-outline" size={18} color="#4CAF50" />
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Workout History</Text>
      </View>

      {/* Calendar view could be added here */}
      <View style={styles.historyList}>
        {/* Sample history items */}
        <View style={styles.historyItem}>
          <View style={styles.historyDate}>
            <Text style={styles.historyDay}>15</Text>
            <Text style={styles.historyMonth}>MAR</Text>
          </View>
          <View style={styles.historyDetails}>
            <Text style={styles.historyWorkout}>Full Body Workout</Text>
            <Text style={styles.historyMeta}>45 min • 300 calories</Text>
          </View>
          <TouchableOpacity style={styles.historyAction}>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.historyItem}>
          <View style={styles.historyDate}>
            <Text style={styles.historyDay}>13</Text>
            <Text style={styles.historyMonth}>MAR</Text>
          </View>
          <View style={styles.historyDetails}>
            <Text style={styles.historyWorkout}>Cardio Blast</Text>
            <Text style={styles.historyMeta}>30 min • 250 calories</Text>
          </View>
          <TouchableOpacity style={styles.historyAction}>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.historyItem}>
          <View style={styles.historyDate}>
            <Text style={styles.historyDay}>10</Text>
            <Text style={styles.historyMonth}>MAR</Text>
          </View>
          <View style={styles.historyDetails}>
            <Text style={styles.historyWorkout}>Full Body Workout</Text>
            <Text style={styles.historyMeta}>50 min • 320 calories</Text>
          </View>
          <TouchableOpacity style={styles.historyAction}>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "workouts" && styles.activeTabButton]}
          onPress={() => setActiveTab("workouts")}
        >
          <Text style={[styles.tabButtonText, activeTab === "workouts" && styles.activeTabButtonText]}>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "history" && styles.activeTabButton]}
          onPress={() => setActiveTab("history")}
        >
          <Text style={[styles.tabButtonText, activeTab === "history" && styles.activeTabButtonText]}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>{activeTab === "workouts" ? renderWorkoutsTab() : renderHistoryTab()}</ScrollView>

      {/* Log Workout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logModalVisible}
        onRequestClose={() => setLogModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Workout</Text>
              <TouchableOpacity onPress={() => setLogModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            {selectedWorkout && (
              <>
                <Text style={styles.workoutNameModal}>{selectedWorkout.name}</Text>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Duration (minutes)</Text>
                  <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="number-pad"
                    placeholder="Enter duration"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Calories Burned</Text>
                  <TextInput
                    style={styles.input}
                    value={caloriesBurned}
                    onChangeText={setCaloriesBurned}
                    keyboardType="number-pad"
                    placeholder="Enter calories burned"
                  />
                </View>

                <TouchableOpacity style={styles.logButton} onPress={submitLogWorkout}>
                  <Text style={styles.logButtonText}>Log Workout</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

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
  workoutCard: {
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
  workoutHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  workoutMeta: {
    flexDirection: "row",
  },
  workoutMetaText: {
    fontSize: 14,
    color: "#666",
    marginRight: 15,
  },
  exerciseList: {
    padding: 15,
  },
  exerciseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  exerciseName: {
    fontSize: 16,
    color: "#333",
  },
  exerciseDetails: {
    fontSize: 14,
    color: "#666",
  },
  workoutActions: {
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
  historyList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  historyDate: {
    width: 50,
    alignItems: "center",
  },
  historyDay: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  historyMonth: {
    fontSize: 12,
    color: "#666",
  },
  historyDetails: {
    flex: 1,
    marginLeft: 15,
  },
  historyWorkout: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  historyMeta: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  historyAction: {
    padding: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  workoutNameModal: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  logButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default WorkoutScreen

