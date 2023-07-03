import { StyleSheet } from "react-native";
import Auth from "./screens/Auth";
import { useCurrentUser } from "./hooks/useCurrentUser";
import StartVerification from "./screens/StartVerification";
import { ThemeProvider } from "@rneui/themed";
import theme, { colors } from "./styles/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import UserAccountButton from "./components/UserAccountButton";
import Verification from "./screens/Verification";
import Profile from "./screens/Profile";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import getUserData from "../cadence/scripts/get-user-data.cdc";
import LoadingScreen from "./components/LoadingScreen";
import PersonalData from "./screens/PersonalData";

const Stack = createNativeStackNavigator();

export default function App() {
  const account = useCurrentUser()!!;
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkVerification = useCallback(async (addr: string) => {
    try {
      setIsLoading(true);
      const verification = await fcl.query({
        cadence: getUserData,
        args: (arg, t) => [arg(addr, t.String)],
      });

      if (verification) setIsVerified(true);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (account?.address) {
      checkVerification(account?.address);
    }
  }, [account?.address]);

  if (isLoading) return <LoadingScreen />;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: null,
            headerRight: () => <UserAccountButton />,
            headerTransparent: true,
            headerStyle: { backgroundColor: colors.background },
          }}
        >
          {account ? (
            <>
              {!isVerified && (
                <>
                  <Stack.Screen
                    name="StartVerification"
                    component={StartVerification}
                  />
                  <Stack.Screen name="Verification" component={Verification} />
                </>
              )}
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="PersonalData" component={PersonalData} />
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
