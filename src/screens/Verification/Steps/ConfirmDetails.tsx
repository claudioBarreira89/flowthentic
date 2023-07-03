import { useCallback } from "react";
import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";
import sha256 from "crypto-js/sha256";
import { ScrollView, StyleSheet, View, Image } from "react-native";
import { Text } from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import setUserData from "../../../../cadence/transactions/set-user-data.cdc";
import { encryptData } from "../../../api";

const ConfirmDetails: React.FC<any> = ({ user }) => {
  const { currentStep, setCurrentStep, verificationState } =
    useVerificationState();

  const { name, email, image } = verificationState;

  const onConfirm = useCallback(async () => {
    const userData = {
      name: name.toLocaleLowerCase(),
      email: email.toLocaleLowerCase(),
    };

    const userDataString = JSON.stringify(userData);
    const userDataHash = sha256(userDataString).toString();

    const { data: encryptedImage } = await encryptData(image);

    try {
      await fcl.mutate({
        cadence: setUserData,
        args: (arg, t) => [
          arg(user.address, t.String),
          arg(userDataHash, t.String),
          arg(encryptedImage, t.String),
        ],
        limit: 999,
      });

      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Please confirm your details</Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{name}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{email}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.label}>Image:</Text>
            <Image
              source={{
                uri: `data:image/jpeg;base64,${image}`,
              }}
              style={{ width: 100, height: 100 }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button onPress={onConfirm}>Confirm and Proceed</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    paddingVertical: 10,
  },
});
export default ConfirmDetails;
