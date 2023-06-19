import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/theme";

const Button = ({
  children,
  onPress,
}: {
  children?: any;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <LinearGradient
      style={styles.buttonGradient}
      colors={[colors.primary, colors.secondary]}
      start={[0, 0]}
      end={[2, 0]}
    >
      {children}
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
});

export default Button;
