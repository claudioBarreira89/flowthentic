import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/theme";

const Button = ({
  type = "primary",
  disabled,
  children,
  style,
  onPress,
}: {
  type?: string;
  disabled?: boolean;
  children?: any;
  style?: any;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={{ ...styles.button, ...style, ...(disabled && styles.disabled) }}
    onPress={onPress}
    disabled={disabled}
  >
    <LinearGradient
      style={styles.buttonGradient}
      {...(type === "primary" && {
        colors: [colors.primary, colors.secondary],
      })}
      {...(type === "secondary" && {
        colors: [colors.secondaryLighter, colors.secondary],
      })}
      start={[0, 0]}
      end={[2, 0]}
    >
      <Text style={styles.text}>{children}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 40,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
