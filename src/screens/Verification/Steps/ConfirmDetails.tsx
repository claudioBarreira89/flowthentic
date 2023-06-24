import { colors } from "../../../styles/theme";
import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";

import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native";

const ConfirmDetails: React.FC = () => {
  const { currentStep, setCurrentStep, verificationState } =
    useVerificationState();

  const { name, birthDate, email, image } = verificationState;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Please confirm your details</Text>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        {/* 
        <View style={styles.detailItem}>
          <Text style={styles.label}>Birth Date:</Text>
          <Text style={styles.value}>{birthDate}</Text>
        </View> */}

        <View style={styles.detailItem}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Selfie:</Text>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.noImage}>No image selected</Text>
          )}
        </View>
      </View>

      <Button onPress={() => setCurrentStep(currentStep + 1)}>
        Confirm and Proceed
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  details: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 30,
  },
  detailItem: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  noImage: {
    marginTop: 10,
    color: "#999",
  },
});
export default ConfirmDetails;
