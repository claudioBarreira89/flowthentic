import { Modal, StyleSheet, Text, View } from "react-native";
import { Input } from "@rneui/base";
import { Button } from "../ui";
import { useCallback, useEffect, useRef, useState } from "react";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import getUserData from "../../cadence/scripts/get-user-data.cdc";
import { useCurrentUser } from "../hooks/useCurrentUser";
import sha256 from "crypto-js/sha256";
import { resizeImage } from "../utils";
import * as FileSystem from "expo-file-system";
import { decryptData, postFaceVerification } from "../api";
import { useNavigation } from "@react-navigation/native";
import CameraComponent from "./CameraComponent";

export default function ValidationModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const account = useCurrentUser()!!;
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  const [validationStep, setValidationStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState<{
    hashedData: string;
    encryptedImage: string;
  }>();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const validateData = useCallback(
    async (addr) => {
      const data = await fcl.query({
        cadence: getUserData,
        args: (arg, t) => [arg(addr, t.String)],
      });

      setUserData(data);

      const userData = {
        name: name?.toLocaleLowerCase(),
        email: email?.toLocaleLowerCase(),
      };

      const userDataString = JSON.stringify(userData);
      const userDataHash = sha256(userDataString).toString();

      console.log(userDataHash);
      console.log(data.hashedData);

      if (userDataHash === data.hashedData) {
        setValidationStep(1);
      }
    },
    [name, email]
  );

  const validateImage = useCallback(async () => {
    const photo: any = await cameraRef.current.takePictureAsync();
    const resizedImage = await resizeImage(photo);

    const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
      encoding: "base64",
    });

    const { data: originalBase64 } = await decryptData(userData.encryptedImage);

    const { data } = await postFaceVerification({
      image1: base64,
      image2: originalBase64,
    });

    const { similarPercent } = data;

    if (similarPercent > 0.85) {
      setOpen(false);
      navigation.navigate("PersonalData" as never);
    }
  }, [userData]);

  const handleValidate = useCallback(
    async (addr: string) => {
      setIsLoading(true);

      try {
        if (validationStep === 0) await validateData(addr);
        if (validationStep === 1) await validateImage();

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [validationStep, validateData, validateImage]
  );

  useEffect(() => {
    setName("");
    setEmail("");
    setValidationStep(0);
  }, [open]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Confirm your details to show your private data
          </Text>

          <View style={styles.steps}>
            <Text
              style={{
                ...styles.text,
                ...(validationStep === 0 && styles.active),
              }}
            >
              Data confirmation
            </Text>
            <Text
              style={{
                ...styles.text,
                ...(validationStep === 1 && styles.active),
              }}
            >
              Face confirmation
            </Text>
          </View>

          {validationStep === 0 && (
            <View style={styles.fields}>
              <Input label="Name" value={name} onChangeText={setName} />
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
          )}

          {validationStep === 1 && <CameraComponent cameraRef={cameraRef} />}

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={() => handleValidate(account?.address)}
              disabled={isLoading}
            >
              Validate
            </Button>
            <Button
              style={styles.button}
              type="secondary"
              onPress={() => setOpen(false)}
            >
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    color: "red",
  },
  steps: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
    color: "gray",
    opacity: 0.3,
  },
  active: {
    opacity: 1,
  },
  fields: {
    marginTop: 20,
  },

  button: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
