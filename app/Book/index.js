import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import ClassesScreen from "../../src/screens/ClassesScreen";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <ClassesScreen />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
