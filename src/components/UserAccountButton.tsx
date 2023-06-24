import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../styles/theme";
import { Avatar } from "@rneui/base";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { truncateAddress } from "../utils";

const UserAccountButton = () => {
  // Hook to obtain information about the current user
  const user = useCurrentUser();

  return (
    <TouchableOpacity
      style={styles.account}
      onPress={() => fcl.unauthenticate()}
    >
      <View style={styles.buttonGradient}>
        <Text style={styles.text}>
          {user?.address ? truncateAddress(user?.address) : "Loading..."}
        </Text>
        <Avatar
          rounded
          icon={{
            name: "user",
            type: "font-awesome",
            color: colors.secondary,
          }}
          overlayContainerStyle={{ backgroundColor: "white" }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  account: {
    alignSelf: "flex-end",
    width: "auto",
    borderRadius: 40,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 5,
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
    color: colors.primary,
    fontSize: 14,
    marginRight: 10,
  },
});

export default UserAccountButton;
