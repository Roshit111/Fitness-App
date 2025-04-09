import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import {  AppProvider } from "../context/AppContext";
import { UserDataProvider } from "../context/UserDataContext";

export default function RootLayout() {
  return (
    <AppProvider>
    <AuthProvider>
      <UserDataProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="AuthScreen/index" options={{ headerShown: false }} />
          <Stack.Screen name="PinScreen/index" options={{ headerShown: false }} />
          <Stack.Screen name="ResetPassword/index" options={{ headerShown: false }} />
          <Stack.Screen name="Book/index" options={{ headerShown: false }} />
          <Stack.Screen name="Workout/index" options={{ headerShown: false }} />
          <Stack.Screen name="nutrition" options={{ headerShown: false }} />
        </Stack>
      </UserDataProvider>
    </AuthProvider>
    </AppProvider>
  );
}