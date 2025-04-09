import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getUserTasks } from "../services/productServices";

const ActivityScreen = () => {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // console.log("Fetching tasks for EMP-011...");
        const res = await getUserTasks(null, null, "EMP-011"); // Use null for optional params
        // console.log("API Response:", JSON.stringify(res, null, 2));

        if (res && res.data) {
          const tasks = Array.isArray(res.data) ? res.data : [res.data];
          console.log("Tasks to Set:", tasks.length, JSON.stringify(tasks, null, 2));
          setDatas(tasks);
        } else {
          console.log("No data in response:", res);
          setDatas([]);
        }
      } catch (error) {
        console.error("Fetch error:", error.message, error.stack);
        setDatas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("datas state updated:", datas.length, JSON.stringify(datas, null, 2));
  }, [datas]);

  const renderItem = ({ item, index }) => {
    const owner = item.owner || {};
    console.log(`Rendering Item ${index}:`, JSON.stringify(item, null, 2));
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          console.log("Selected Task:", JSON.stringify(item, null, 2));
          setSelectedTask(item);
        }}
      >
        <View style={styles.row}>
          <Image
            source={{ uri: owner.image || "https://via.placeholder.com/60" }}
            style={styles.avatar}
            onError={(e) => console.log(`Image error for ${owner.user_name}:`, e.nativeEvent.error)}
          />
          <View style={styles.info}>
            <Text style={styles.name}>{owner.user_name || "Unknown User"}</Text>
            <Text style={styles.sub}>{owner.user_nick_name || "N/A"}</Text>
            <Text style={styles.sub}>
              📅 {item.task_date || "N/A"} | ⏰ {item.start_time || "N/A"}
            </Text>
          </View>
        </View>
        <Text style={styles.tag}>Task Type: {item.task_type_display || "N/A"}</Text>
      </TouchableOpacity>
    );
  };

  const renderDetailsModal = () => {
    if (!selectedTask) return null;
    const owner = selectedTask.owner || {};

    return (
      <Modal
        visible={!!selectedTask}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedTask(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Task Details</Text>
              <Image
                source={{ uri: owner.image || "https://via.placeholder.com/100" }}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>👤 User Name: {owner.user_name || "N/A"}</Text>
              <Text style={styles.modalText}>📞 Nick Name: {owner.user_nick_name || "N/A"}</Text>
              <Text style={styles.modalText}>🆔 User ID: {owner.id || "N/A"}</Text>
              <Text style={styles.modalText}>📅 Date: {selectedTask.task_date || "N/A"}</Text>
              <Text style={styles.modalText}>⏰ Start Time: {selectedTask.start_time || "N/A"}</Text>
              <Text style={styles.modalText}>⏱ End Time: {selectedTask.end_time || "N/A"}</Text>
              <Text style={styles.modalText}>📌 Status: {selectedTask.task_status || "N/A"}</Text>
              <Text style={styles.modalText}>📞 Task Type: {selectedTask.task_type_display || "N/A"}</Text>
              <Text style={styles.modalText}>🔥 Priority: {selectedTask.priority || "N/A"}</Text>
              <Text style={styles.modalText}>💬 Remarks: {selectedTask.remarks || "N/A"}</Text>
              <Text style={styles.modalText}>👥 Emp Assigned: {selectedTask.emp_assigned || "EMP-011"}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedTask(null)}
              >
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Activity Screen</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : datas.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        <>
          <Text style={styles.debugText}>Tasks Loaded: {datas.length}</Text>
          <FlatList
            data={datas}
            keyExtractor={(item, index) => `${item.id || index}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </>
      )}
      {renderDetailsModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  debugText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  sub: {
    fontSize: 13,
    color: "#555",
  },
  tag: {
    marginTop: 10,
    fontSize: 13,
    color: "#1C6DD0",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  closeButton: {
    backgroundColor: "#1C6DD0",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  closeText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});

export default ActivityScreen;