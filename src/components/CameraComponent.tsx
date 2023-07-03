import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

async function getCameraPermission() {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("Sorry, we need camera permissions to make this work!");
    return false;
  }
  return true;
}

const CameraComponent = ({ cameraRef }: any) => {
  const [hasPermission, setHasPermission] = useState(null);

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
      <Camera
        style={{ flex: 1 }}
        // @ts-ignore
        type={Camera.Constants.Type.front}
        ref={cameraRef}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginTop: 20,
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default CameraComponent;
