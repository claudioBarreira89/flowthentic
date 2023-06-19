import { SafeAreaView, StyleSheet, View } from "react-native";
import Auth from "./screens/Auth";
import { useCurrentUser } from "./hooks/useCurrentUser";
import Core from "./screens/Core";

import { ThemeProvider } from "@rneui/themed";
import theme, { colors } from "./styles/theme";

export default function App() {
  // Determine whether user is logged in
  // If logged in, display app core
  // If not logged in, display auth screen
  const isLoggedIn = useCurrentUser()!!;

  return (
    <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <SafeAreaView style={{ height: "100%" }}>
          {isLoggedIn ? <Core /> : <Auth />}
        </SafeAreaView>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "#fff",
    backgroundColor: colors.background,
  },
});
