import { useCallback } from "react";
import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";
import sha256 from "crypto-js/sha256";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import setHashedData from "../../../../cadence/transactions/set-hashed-data.cdc";

const ConfirmDetails: React.FC<any> = ({ user }) => {
  const { currentStep, setCurrentStep, verificationState } =
    useVerificationState();

  const { name, birthDate, email, image } = verificationState;

  const onConfirm = useCallback(async () => {
    const userData = { name, email };

    const userDataString = JSON.stringify(userData);
    const userDataHash = sha256(userDataString).toString();

    try {
      await fcl.mutate({
        cadence: setHashedData,
        args: (arg, t) => [
          arg(user.address, t.String),
          arg(userDataHash, t.String),
        ],
        limit: 999,
      });

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log(error);
    }
  }, []);

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

      <Button onPress={onConfirm}>Confirm and Proceed</Button>
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
