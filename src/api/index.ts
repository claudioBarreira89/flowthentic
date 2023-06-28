import axios from "axios";
import Constants from "expo-constants";

import * as FileSystem from "expo-file-system";

const devHost = Constants.expoConfig.extra?.devHost;

const serverUrl = `http://${devHost}:9000/api`;

export const postFaceDetection = async (data) => {
  try {
    // const base64 = await FileSystem.readAsStringAsync(data.image, {
    //   encoding: "base64",
    // });

    const response = await axios.post(serverUrl + "/face/detect", {
      image: data.image,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const encryptData = async (data) => {
  const response = await axios.post(serverUrl + "/encrypt", {
    data,
  });

  return response.data;
};
