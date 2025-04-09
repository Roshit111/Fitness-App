"use client";

import { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { UserDataContext } from "../../context/UserDataContext";

const ClassesScreen = ({ navigation }) => {
  const { classes, bookClass, cancelClass } = useContext(UserDataContext);

  const [selectedDay, setSelectedDay] = useState("Monday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const filteredClasses = classes.filter((c) => c.day === selectedDay);

  const handleBookClass = async (classId) => {
    const result = await bookClass(classId);
    if (result.success) {
      Alert.alert("Success", "Class booked successfully!");
    } else {
      Alert.alert("Error", result.error);
    }
  };

  const handleCancelClass = async (classId) => {
    Alert.alert("Cancel Class", "Are you sure you want to cancel this class?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          const result = await cancelClass(classId);
          if (result.success) {
            Alert.alert("Success", "Class canceled successfully!");
          } else {
            Alert.alert("Error", result.error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Day Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daySelector}
        contentContainerStyle={styles.daySelectorContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.selectedDayButton,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayButtonText,
                selectedDay === day && styles.selectedDayButtonText,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.classesContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Classes for {selectedDay}</Text>
        </View>

        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <TouchableOpacity
              key={classItem.id}
              style={styles.classCard}
              onPress={() =>
                navigation.navigate("ClassDetail", { classId: classItem.id })
              }
            >
              <View style={styles.classCardHeader}>
                <View style={styles.classTime}>
                  <Text style={styles.timeText}>{classItem.time}</Text>
                  <Text style={styles.durationText}>
                    {classItem.duration} min
                  </Text>
                </View>

                <View style={styles.classInfo}>
                  <Text style={styles.className}>{classItem.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TrainerProfile", {
                        trainer: classItem.instructor,
                      })
                    }
                  >
                    <Text style={styles.instructorName}>
                      with {classItem.instructor}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.classCardBody}>
                <Text style={styles.classDescription}>
                  {classItem.description}
                </Text>

                <View style={styles.classCapacity}>
                  <Text style={styles.capacityText}>
                    {classItem.enrolled}/{classItem.capacity} spots filled
                  </Text>
                  <View style={styles.capacityBarContainer}>
                    <View
                      style={[
                        styles.capacityBar,
                        {
                          width: `${
                            (classItem.enrolled / classItem.capacity) * 100
                          }%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.classCardFooter}>
                {classItem.isBooked ? (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelClass(classItem.id)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[
                      styles.bookButton,
                      classItem.enrolled >= classItem.capacity &&
                        styles.disabledButton,
                    ]}
                    onPress={() => handleBookClass(classItem.id)}
                    disabled={classItem.enrolled >= classItem.capacity}
                  >
                    <Text style={styles.bookButtonText}>
                      {classItem.enrolled >= classItem.capacity
                        ? "Full"
                        : "Book"}
                    </Text>
                  </TouchableOpacity>
                )}

                {classItem.enrolled >= classItem.capacity &&
                  !classItem.isBooked && (
                    <TouchableOpacity style={styles.waitlistButton}>
                      <Text style={styles.waitlistButtonText}>
                        Join Waitlist
                      </Text>
                    </TouchableOpacity>
                  )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color="#ccc" />
            <Text style={styles.emptyText}>
              No classes scheduled for {selectedDay}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  daySelector: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  daySelectorContent: {
    paddingHorizontal: 10,
  },
  dayButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  selectedDayButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#4CAF50",
  },
  dayButtonText: {
    fontSize: 16,
    color: "#666",
  },
  selectedDayButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  classesContainer: {
    flex: 1,
    padding: 15,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  classCard: {
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
  classCardHeader: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  classTime: {
    backgroundColor: "#f0f8f0",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    minWidth: 80,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  classInfo: {
    flex: 1,
    justifyContent: "center",
  },
  className: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  instructorName: {
    fontSize: 14,
    color: "#4CAF50",
    marginTop: 2,
  },
  classCardBody: {
    padding: 15,
  },
  classDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  classCapacity: {
    marginTop: 5,
  },
  capacityText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  capacityBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
    overflow: "hidden",
  },
  capacityBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  classCardFooter: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bookButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  waitlistButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  waitlistButtonText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
  },
});

export default ClassesScreen;
