import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import NutritionScreen from "../../src/screens/NutritionScreen";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <NutritionScreen />
    </SafeAreaView>
  );
};

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
