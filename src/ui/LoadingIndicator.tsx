import { ActivityIndicator } from "react-native";
import { colors } from "../styles/theme";

export default function LoadingIndicator() {
  return <ActivityIndicator size="large" color={colors.primary} />;
}
