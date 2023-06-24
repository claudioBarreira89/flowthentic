import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";

import { ScrollView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { Input } from "@rneui/base";
import { Text } from "react-native";

const PersonalInfo: React.FC = () => {
  const { currentStep, setCurrentStep } = useVerificationState();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Here you can handle the form submission,
    // for example, validate the input, store the data, etc.
    console.log({ name, birthDate, email });
  };

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
          onChangeText={setName}
          style={styles.input}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          // Add this if you want to use the email keyboard
          keyboardType="email-address"
          style={styles.input}
        />
      </View>
      <Button
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
