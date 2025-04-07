import React from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Colors from "../../constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileScreen from "../../src/screens/ProfileScreen";

const home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <ProfileScreen />
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
