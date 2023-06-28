import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar } from "react-native-paper";
import { useVerificationState } from "../VerificationContext";
import PersonalInfo from "./PersonalInfo";
import FaceIdentification from "./FaceIdentification";
import ConfirmDetails from "./ConfirmDetails";
import VerificationComplete from "./VerificationComplete";
import { colors } from "../../../styles/theme";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { Account } from "@onflow/typedefs";

export type Steps = {
  title: string;
  Component: (props: { user?: Account }) => JSX.Element;
};

const Steps: React.FC = () => {
  const user = useCurrentUser();
  const { currentStep } = useVerificationState();

  const steps: Steps[] = [
    { title: "Personal information", Component: PersonalInfo },
    { title: "Face Idenfitication", Component: FaceIdentification },
    { title: "Confirm details", Component: ConfirmDetails },
    { title: "Verification complete", Component: VerificationComplete },
  ];

  const { Component, title } = steps[currentStep];

  const props = { user };
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
      <Component {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    paddingBottom: 40,
    flex: 1,
    flexDirection: "column",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary,
  },
  progress: {
    marginTop: 16,
    backgroundColor: colors.backgroundDarker,
    borderRadius: 40,
  },
});

export default Steps;
