import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input } from "@rneui/base";
import { Text } from "react-native";

const PersonalInfo: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    verificationState,
    setVerificationState,
  } = useVerificationState();

  const { name, email } = verificationState;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text}>
            Please fill out your personal details.
          </Text>
          <Text style={styles.text}>
            This information is crucial to ensure the unique identification of
            each user and will be used for the purpose of identity verification.
          </Text>
        </View>

        <View style={styles.fields}>
          <Input
            label="Name"
            value={name}
            onChangeText={(value) =>
              setVerificationState((state) => ({ ...state, name: value }))
            }
            style={styles.input}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={(value) =>
              setVerificationState((state) => ({ ...state, email: value }))
            }
            keyboardType="email-address"
            style={styles.input}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          disabled={!name || !email}
          style={styles.button}
          onPress={() => setCurrentStep(currentStep + 1)}
        >
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    paddingTop: 20,
  },
  text: {
    marginBottom: 10,
    color: "white",
    fontSize: 15,
    lineHeight: 22,
  },
  fields: {
    marginTop: 20,
  },
  input: {
    color: "white",
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  button: {
    marginTop: 30,
  },
});

export default PersonalInfo;
