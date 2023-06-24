import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";

import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
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
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Please fill out your personal details.</Text>
      <Text style={styles.text}>
        This information is crucial to ensure the unique identification of each
        user and will be used for the purpose of identity verification.
      </Text>

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
      <Button
        disabled={!name || !email}
        style={styles.button}
        onPress={() => setCurrentStep(currentStep + 1)}
      >
        Next
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  button: {
    marginTop: 30,
  },
});

export default PersonalInfo;
