import React from "react";
import { Text } from "react-native";
import ScreenHeader from "./ScreenHeader";

const NutritionScreen = () => {
  return (
    <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
      <ScreenHeader />
      Nutrition Screen
    </Text>
  );
};

export default NutritionScreen;
