import { Button } from "@rneui/base";
import { useVerificationState } from "../VerificationContext";

import { ScrollView, Text } from "react-native";

const EmailVerification: React.FC = () => {
  const { currentStep, setCurrentStep } = useVerificationState();

  return (
    <ScrollView>
      <Button onPress={() => setCurrentStep(currentStep + 1)}>Click</Button>
    </ScrollView>
  );
};

export default EmailVerification;
