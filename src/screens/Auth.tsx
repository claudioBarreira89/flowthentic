import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { LoadingIndicator } from "../ui";
import NoWalletsView from "../components/NoWalletsView";
import WalletServiceCard from "../components/WalletServiceCard";
import WalletDiscoveryWrapper from "../components/WalletDiscoveryWrapper";
import { Logo } from "../../assets";
import { colors } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";

export default function Auth({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Logo style={styles.logo} height={100} />
      </View>
      <View style={styles.buttonsSection}>
        <Text style={styles.text}>Connect your wallet to begin</Text>

        <fcl.ServiceDiscovery
          fcl={fcl}
          Loading={LoadingIndicator}
          Empty={NoWalletsView}
          ServiceCard={WalletServiceCard}
          Wrapper={WalletDiscoveryWrapper}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: colors.background,
  },
  logoSection: {
    flex: 1,
    justifyContent: "flex-end",
  },
  logo: {
    marginBottom: 70,
  },
  buttonsSection: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
});
