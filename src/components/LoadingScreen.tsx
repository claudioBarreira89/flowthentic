import { StyleSheet, View } from "react-native";
import { LoadingIndicator } from "../ui";
import { colors } from "../styles/theme";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <LoadingIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 15,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
});
