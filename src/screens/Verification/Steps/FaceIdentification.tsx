import { Button } from "../../../ui";
import { useVerificationState } from "../VerificationContext";

import { ScrollView, StyleSheet, View, Image } from "react-native";
import { useState } from "react";
import { Text } from "react-native";

const FaceIdentification: React.FC = () => {
  const { currentStep, setCurrentStep } = useVerificationState();

  const [image, setImage] = useState(null);

  const handleCaptureImage = () => {
    // Here you can handle the image capturing logic,
    // for example, open the camera, capture the image, and store the image URI.
  };

  const handleUploadImage = () => {
    // Here you can handle the image uploading logic,
    // for example, open the file picker, select the image, and store the image URI.
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>Please take or upload a clear selfie.</Text>
      <Text style={styles.text}>
        This image will be used for facial recognition verification.
      </Text>

      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>No image selected</Text>
        )}
      </View>

      <Button
        type="secondary"
        style={styles.photoButton}
        onPress={handleCaptureImage}
      >
        Capture Selfie
      </Button>

      <Button
        type="secondary"
        style={styles.photoButton}
        onPress={handleUploadImage}
      >
        Upload Selfie
      </Button>

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
  imageContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderColor: "gray",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  photoButton: {
    marginTop: 15,
  },
  button: {
    marginTop: 40,
  },
});

export default FaceIdentification;
