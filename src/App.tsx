import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Auth from "./screens/Auth";
import { useCurrentUser } from "./hooks/useCurrentUser";
import StartVerification from "./screens/StartVerification";
import { ThemeProvider } from "@rneui/themed";
import theme, { colors } from "./styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import UserAccountButton from "./components/UserAccountButton";

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerTransparent: true,
  headerTitleStyle: {
    fontWeight: "600",
    color: "white",
  },
};

export default function App() {
  const isLoggedIn = useCurrentUser()!!;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{}}>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="StartVerification"
                component={StartVerification}
                options={{
                  title: null,
                  headerLeft: () => <UserAccountButton />,
                  headerTransparent: true,
                  headerStyle: { backgroundColor: colors.background },
                }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
});
