import { ScrollView, Text } from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import LoadingIndicator from "../components/LoadingIndicator";
import NoWalletsView from "../components/NoWalletsView";
import WalletServiceCard from "../components/WalletServiceCard";
import WalletDiscoveryWrapper from "../components/WalletDiscoveryWrapper";

export default function Auth() {
  return (
    <ScrollView
      style={{
        flexDirection: "column",
      }}
      contentContainerStyle={{
        padding: 30,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginBottom: 10,
        }}
        numberOfLines={2}
        adjustsFontSizeToFit={true}
      >
        Flowthentic
      </Text>
      <Text
        style={{
          fontSize: 16,
          marginBottom: 10,
          lineHeight: 24,
        }}
      >
        Please choose a wallet to continue
      </Text>

      <fcl.ServiceDiscovery
        fcl={fcl}
        Loading={LoadingIndicator}
        Empty={NoWalletsView}
        ServiceCard={WalletServiceCard}
        Wrapper={WalletDiscoveryWrapper}
      />
    </ScrollView>
  );
}
