import * as ImageManipulator from "expo-image-manipulator";

async function resizeImage(image) {
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    image.uri,
    [{ resize: { width: 300 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
  );

  return resizedPhoto;
}

export default resizeImage;
