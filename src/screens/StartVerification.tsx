import { Text, StyleSheet, View, ScrollView } from "react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Button } from "../ui";
import { colors } from "../styles/theme";
import { IdentityIllustration } from "../../assets";
import { useHeaderHeight } from "@react-navigation/elements";

export default function StartVerification({ navigation }) {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      <View>
        <View style={styles.hero}>
          <Text style={styles.title}>Flowthentic</Text>
          <Text style={styles.subTitle}>
            Decentralized Identity Verification
          </Text>
        </View>

        <View style={styles.verificationStatus}>
          <View style={{ height: 200, marginBottom: 60 }}>
            <IdentityIllustration color={colors.primary} />
          </View>
        </View>

        <View>
          <Text style={styles.text}>
            Embrace the future of secure digital identity. Click below to begin
            your journey
          </Text>
          <Button onPress={() => navigation.navigate("Verification")}>
            <Text style={styles.buttonText}>Start your verification here!</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
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
