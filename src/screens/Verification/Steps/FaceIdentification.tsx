import { Button, LoadingIndicator } from "../../../ui";
import { useVerificationState } from "../VerificationContext";
import { Camera } from "expo-camera";
import { ScrollView, StyleSheet, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { postFaceDetection, encryptData } from "../../../api";
import * as FileSystem from "expo-file-system";
import { resizeImage } from "../../../utils";

let camera: Camera;

async function getCameraPermission() {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return false;
  }
  return true;
}

const FaceIdentification: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const {
    currentStep,
    setCurrentStep,
    verificationState,
    setVerificationState,
  } = useVerificationState();

  const handleCaptureImage = async () => {
    setIsLoading(true);
    const photo: any = await camera.takePictureAsync();

    const resizedImage = await resizeImage(photo);

    const base64 = await FileSystem.readAsStringAsync(resizedImage.uri, {
      encoding: "base64",
    });

    const response = await postFaceDetection({ image: base64 });

    setIsLoading(false);

    if (response.data.length) {
      if (response.data[0].faceRectangle) {
        setVerificationState({ ...verificationState, image: base64 });
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const startCameraFn = async () => {
    const hasPermission = await getCameraPermission();
    setHasPermission(hasPermission);
  };

  useEffect(() => {
    startCameraFn();
  }, []);

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>;
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Please take or upload a clear selfie.</Text>
        <Text style={styles.text}>
          This image will be used for facial recognition verification.
        </Text>

        <View style={styles.imageContainer}>
          <CameraComponent />
        </View>
        <View style={{ padding: 20 }}>{isLoading && <LoadingIndicator />}</View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          disabled={isLoading}
          // onPress={() => setCurrentStep(currentStep + 1)}
          onPress={handleCaptureImage}
        >
          Capture photo
        </Button>
      </View>
    </View>
  );
};

const CameraComponent = ({ type }: any) => (
  <Camera
    style={{ flex: 1 }}
    // @ts-ignore
    type={Camera.Constants.Type.front}
    ref={(r) => {
      camera = r;
    }}
  >
    <View
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "transparent",
        flexDirection: "row",
      }}
    ></View>
  </Camera>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  text: {
    marginBottom: 10,
    color: "white",
    fontSize: 15,
    lineHeight: 22,
  },
  imageContainer: {
    height: 300,
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  photoButton: {
    marginTop: 15,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
});

export default FaceIdentification;
