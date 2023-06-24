import { StyleSheet, View } from "react-native";
import { colors } from "../../styles/theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { VerificationProvider } from "./VerificationContext";
import Steps from "./Steps";

export default function Verification({ navigation }) {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{ ...styles.container, paddingTop: headerHeight }}>
      <VerificationProvider>
        <Steps />
      </VerificationProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
  scrollView: {
    height: "100%",
    backgroundColor: colors.background,
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  // HERO
  hero: {
    marginTop: 10,
    marginBottom: 40,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 45,
    marginBottom: 5,
  },
  subTitle: {
    lineHeight: 22,
    fontSize: 20,
    color: "white",
  },
  logoutButton: {
    marginTop: 10,
  },
  // BODY
  verificationStatus: {
    marginBottom: 20,
    gap: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "white",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
