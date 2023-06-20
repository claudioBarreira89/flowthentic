import { Service } from "@onflow/typedefs";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/theme";

export default function WalletDiscoveryServiceCard({
  service,
  onPress,
}: {
  service: Service;
  onPress: () => void;
}) {
  const provider: any = service.provider;
  const name = provider?.name || "Unknown";
  const icon = provider?.icon || "https://placekitten.com/200/200";

  return (
    <View style={{ marginVertical: 10, flexDirection: "row" }}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <LinearGradient
          style={styles.buttonGradient}
          colors={[colors.primary, colors.secondary]}
          start={[0, 0]}
          end={[1, 0]}
        >
          <Image
            source={{ uri: icon }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 5,
              marginRight: 15,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            {name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "70%",
    borderRadius: 40,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 10,
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
