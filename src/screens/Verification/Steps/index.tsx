import React, { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useVerificationState } from "../VerificationContext";
import PersonalInfo from "./PersonalInfo";
import EmailVerification from "./EmailVerification";
import FaceIdentification from "./FaceIdentification";
import ConfirmDetails from "./ConfirmDetails";
import VerificationComplete from "./VerificationComplete";
import { colors } from "../../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const steps = [
  { title: "Personal information", Component: PersonalInfo },
  // { title: "Email verification", Component: EmailVerification },
  { title: "Face Idenfitication", Component: FaceIdentification },
  { title: "Confirm details", Component: ConfirmDetails },
  { title: "Verification complete", Component: VerificationComplete },
];

const Steps: React.FC = () => {
  const { currentStep } = useVerificationState();

  const { Component, title } = steps[currentStep];

  return (
    <View style={styles.container}>
      <MaskedView
        style={{ height: 30 }}
        maskElement={<Text style={styles.title}>{title}</Text>}
      >
        <LinearGradient
          colors={[colors.secondary, colors.primary]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>

      <ProgressBar
        progress={currentStep / (steps.length - 1)}
        color={colors.primary}
        style={styles.progress}
      />
      <Component />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },
  progress: {
    marginTop: 16,
    backgroundColor: colors.backgroundDarker,
  },
});

export default Steps;
