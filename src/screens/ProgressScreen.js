"use client"

import { useContext, useState } from "react"
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { UserDataContext } from "../context/UserDataContext"

const ProgressScreen = () => {
  const { progress, addWeightEntry, addMeasurement } = useContext(UserDataContext)
  const [activeTab, setActiveTab] = useState("weight")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalType, setModalType] = useState("")
  const [measurementType, setMeasurementType] = useState("")
  const [measurementValue, setMeasurementValue] = useState("")

  const openAddModal = (type, measurementType = "") => {
    setModalType(type)
    setMeasurementType(measurementType)
    setMeasurementValue("")
    setModalVisible(true)
  }

  const handleAddEntry = async () => {
    if (!measurementValue) {
      Alert.alert("Error", "Please enter a value")
      return
    }

    let result
    if (modalType === "weight") {
      result = await addWeightEntry(Number.parseFloat(measurementValue))
    } else if (modalType === "measurement") {
      result = await addMeasurement(measurementType, Number.parseFloat(measurementValue))
    }

    if (result && result.success) {
      Alert.alert("Success", "Entry added successfully!")
      setModalVisible(false)
    } else if (result) {
      Alert.alert("Error", result.error)
    }
  }

  const renderWeightTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Weight Progress</Text>
        <TouchableOpacity onPress={() => openAddModal("weight")}>
          <Text style={styles.addText}>+ Add Entry</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {/* Placeholder for weight chart */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>Weight Chart</Text>
        </View>
      </View>

      <View style={styles.entriesContainer}>
        <Text style={styles.entriesTitle}>Recent Entries</Text>

        {progress.weight
          .slice(-5)
          .reverse()
          .map((entry, index) => (
            <View key={index} style={styles.entryItem}>
              <Text style={styles.entryDate}>{entry.date}</Text>
              <Text style={styles.entryValue}>{entry.value} kg</Text>
              {index > 0 && (
                <Text
                  style={[
                    styles.entryChange,
                    entry.value < progress.weight.slice(-5).reverse()[index - 1].value
                      ? styles.entryDecrease
                      : entry.value > progress.weight.slice(-5).reverse()[index - 1].value
                        ? styles.entryIncrease
                        : null,
                  ]}
                >
                  {entry.value < progress.weight.slice(-5).reverse()[index - 1].value
                    ? `↓ ${(progress.weight.slice(-5).reverse()[index - 1].value - entry.value).toFixed(1)}`
                    : entry.value > progress.weight.slice(-5).reverse()[index - 1].value
                      ? `↑ ${(entry.value - progress.weight.slice(-5).reverse()[index - 1].value).toFixed(1)}`
                      : "—"}
                </Text>
              )}
            </View>
          ))}
      </View>
    </View>
  )

  const renderMeasurementsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Body Measurements</Text>
      </View>

      <View style={styles.measurementCards}>
        <View style={styles.measurementCard}>
          <View style={styles.measurementHeader}>
            <Text style={styles.measurementTitle}>Chest</Text>
            <TouchableOpacity onPress={() => openAddModal("measurement", "chest")}>
              <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.measurementValue}>
            <Text style={styles.currentValue}>
              {progress.measurements.chest && progress.measurements.chest.length > 0
                ? `${progress.measurements.chest[progress.measurements.chest.length - 1].value} cm`
                : "—"}
            </Text>
            {progress.measurements.chest && progress.measurements.chest.length > 1 && (
              <Text
                style={[
                  styles.valueChange,
                  progress.measurements.chest[progress.measurements.chest.length - 1].value <
                  progress.measurements.chest[progress.measurements.chest.length - 2].value
                    ? styles.valueDecrease
                    : styles.valueIncrease,
                ]}
              >
                {progress.measurements.chest[progress.measurements.chest.length - 1].value <
                progress.measurements.chest[progress.measurements.chest.length - 2].value
                  ? `↓ ${(
                      progress.measurements.chest[progress.measurements.chest.length - 2].value -
                        progress.measurements.chest[progress.measurements.chest.length - 1].value
                    ).toFixed(1)}`
                  : `↑ ${(
                      progress.measurements.chest[progress.measurements.chest.length - 1].value -
                        progress.measurements.chest[progress.measurements.chest.length - 2].value
                    ).toFixed(1)}`}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.measurementCard}>
          <View style={styles.measurementHeader}>
            <Text style={styles.measurementTitle}>Waist</Text>
            <TouchableOpacity onPress={() => openAddModal("measurement", "waist")}>
              <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.measurementValue}>
            <Text style={styles.currentValue}>
              {progress.measurements.waist && progress.measurements.waist.length > 0
                ? `${progress.measurements.waist[progress.measurements.waist.length - 1].value} cm`
                : "—"}
            </Text>
            {progress.measurements.waist && progress.measurements.waist.length > 1 && (
              <Text
                style={[
                  styles.valueChange,
                  progress.measurements.waist[progress.measurements.waist.length - 1].value <
                  progress.measurements.waist[progress.measurements.waist.length - 2].value
                    ? styles.valueDecrease
                    : styles.valueIncrease,
                ]}
              >
                {progress.measurements.waist[progress.measurements.waist.length - 1].value <
                progress.measurements.waist[progress.measurements.waist.length - 2].value
                  ? `↓ ${(
                      progress.measurements.waist[progress.measurements.waist.length - 2].value -
                        progress.measurements.waist[progress.measurements.waist.length - 1].value
                    ).toFixed(1)}`
                  : `↑ ${(
                      progress.measurements.waist[progress.measurements.waist.length - 1].value -
                        progress.measurements.waist[progress.measurements.waist.length - 2].value
                    ).toFixed(1)}`}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.measurementCard}>
          <View style={styles.measurementHeader}>
            <Text style={styles.measurementTitle}>Arms</Text>
            <TouchableOpacity onPress={() => openAddModal("measurement", "arms")}>
              <Text style={styles.addText}>+ Add</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.measurementValue}>
            <Text style={styles.currentValue}>
              {progress.measurements.arms && progress.measurements.arms.length > 0
                ? `${progress.measurements.arms[progress.measurements.arms.length - 1].value} cm`
                : "—"}
            </Text>
            {progress.measurements.arms && progress.measurements.arms.length > 1 && (
              <Text
                style={[
                  styles.valueChange,
                  progress.measurements.arms[progress.measurements.arms.length - 1].value <
                  progress.measurements.arms[progress.measurements.arms.length - 2].value
                    ? styles.valueDecrease
                    : styles.valueIncrease,
                ]}
              >
                {progress.measurements.arms[progress.measurements.arms.length - 1].value <
                progress.measurements.arms[progress.measurements.arms.length - 2].value
                  ? `↓ ${(
                      progress.measurements.arms[progress.measurements.arms.length - 2].value -
                        progress.measurements.arms[progress.measurements.arms.length - 1].value
                    ).toFixed(1)}`
                  : `↑ ${(
                      progress.measurements.arms[progress.measurements.arms.length - 1].value -
                        progress.measurements.arms[progress.measurements.arms.length - 2].value
                    ).toFixed(1)}`}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity style={styles.addMeasurementButton}>
          <Ionicons name="add-circle" size={24} color="#4CAF50" />
          <Text style={styles.addMeasurementText}>Add New Measurement Type</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderWorkoutsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Workout Progress</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{progress.workoutHistory.length}</Text>
          <Text style={styles.statLabel}>Total Workouts</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {progress.workoutHistory.reduce((total, workout) => total + workout.duration, 0)}
          </Text>
          <Text style={styles.statLabel}>Total Minutes</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {progress.workoutHistory.length > 0
              ? Math.round(
                  progress.workoutHistory.reduce((total, workout) => total + workout.duration, 0) /
                    progress.workoutHistory.length,
                )
              : 0}
          </Text>
          <Text style={styles.statLabel}>Avg. Duration</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        {/* Placeholder for workout frequency chart */}
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartPlaceholderText}>Workout Frequency</Text>
        </View>
      </View>

      <View style={styles.entriesContainer}>
        <Text style={styles.entriesTitle}>Recent Workouts</Text>

        {progress.workoutHistory
          .slice(-5)
          .reverse()
          .map((workout, index) => (
            <View key={index} style={styles.workoutItem}>
              <View style={styles.workoutItemLeft}>
                <Text style={styles.workoutItemDate}>{workout.date}</Text>
                <Text style={styles.workoutItemName}>{workout.workout}</Text>
              </View>
              <Text style={styles.workoutItemDuration}>{workout.duration} min</Text>
            </View>
          ))}
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "weight" && styles.activeTabButton]}
          onPress={() => setActiveTab("weight")}
        >
          <Text style={[styles.tabButtonText, activeTab === "weight" && styles.activeTabButtonText]}>Weight</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "measurements" && styles.activeTabButton]}
          onPress={() => setActiveTab("measurements")}
        >
          <Text style={[styles.tabButtonText, activeTab === "measurements" && styles.activeTabButtonText]}>
            Measurements
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "workouts" && styles.activeTabButton]}
          onPress={() => setActiveTab("workouts")}
        >
          <Text style={[styles.tabButtonText, activeTab === "workouts" && styles.activeTabButtonText]}>Workouts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {activeTab === "weight" && renderWeightTab()}
        {activeTab === "measurements" && renderMeasurementsTab()}
        {activeTab === "workouts" && renderWorkoutsTab()}
      </ScrollView>

      {/* Add Entry Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {modalType === "weight"
                  ? "Add Weight Entry"
                  : `Add ${measurementType.charAt(0).toUpperCase() + measurementType.slice(1)} Measurement`}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{modalType === "weight" ? "Weight (kg)" : "Measurement (cm)"}</Text>
              <TextInput
                style={styles.input}
                value={measurementValue}
                onChangeText={setMeasurementValue}
                keyboardType="numeric"
                placeholder="Enter value"
              />
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddEntry}>
              <Text style={styles.addButtonText}>Add Entry</Text>
            </TouchableOpacity>
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
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  chartPlaceholderText: {
    color: "#999",
    fontSize: 16,
  },
  entriesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  entriesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  entryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  entryDate: {
    fontSize: 14,
    color: "#333",
  },
  entryValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  entryChange: {
    fontSize: 14,
    fontWeight: "bold",
  },
  entryIncrease: {
    color: "#F44336",
  },
  entryDecrease: {
    color: "#4CAF50",
  },
  measurementCards: {
    marginBottom: 15,
  },
  measurementCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  measurementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  measurementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  measurementValue: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  currentValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  valueChange: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  valueIncrease: {
    color: "#4CAF50",
  },
  valueDecrease: {
    color: "#F44336",
  },
  addMeasurementButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
  },
  addMeasurementText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  workoutItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  workoutItemLeft: {
    flex: 1,
  },
  workoutItemDate: {
    fontSize: 12,
    color: "#666",
  },
  workoutItemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 2,
  },
  workoutItemDuration: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
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
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ProgressScreen

