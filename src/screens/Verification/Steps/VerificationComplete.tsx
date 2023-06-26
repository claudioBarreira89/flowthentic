import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native";
import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";
import { colors } from "../../../styles/theme";
import { SuccessIllustration } from "../../../../assets";
import { CommonActions, useNavigation } from "@react-navigation/native";

const VerificationComplete: React.FC = () => {
  const navigation = useNavigation();
  const { setCurrentStep } = useVerificationState();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.image}>
          <SuccessIllustration />
        </View>
        <View>
          <Text style={styles.text}>
            You're now verified on-chain, affirming your unique identity in the
            blockchain world. Embrace the decentralized future!
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Profile" }],
              })
            );
          }}
        >
          Done
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.primary,
  },
  image: {
    height: 240,
    marginBottom: 40,
  },
  text: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 80,
    color: "white",
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 100,
    backgroundColor: "#3498db",
    borderRadius: 5,
  },
});

export default VerificationComplete;
