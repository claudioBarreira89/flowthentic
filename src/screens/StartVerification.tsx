import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useState } from "react";
import { CompositeSignature } from "@onflow/typedefs";

import { Button } from "../ui";
import { LinearGradient } from "expo-linear-gradient";
import { Defs, RadialGradient, Rect, Stop, Svg } from "react-native-svg";
import { colors } from "../styles/theme";
import { Avatar, Card, Icon, color } from "@rneui/base";
import { truncateAddress } from "../utils";
import { IdentityIllustration } from "../../assets";
import { useHeaderHeight } from "@react-navigation/elements";

export default function StartVerification() {
  const headerHeight = useHeaderHeight();

  // Hook to obtain information about the current user
  const user = useCurrentUser();
  // Determines whether modal for transaction arguments is visible
  const [modalVisible, setModalVisible] = useState(false);
  // State for transaction argument (value of foo to set)
  const [fooInput, setFooInput] = useState("Placeholder text");

  // Commands to be displayed in the UI
  const commands = [
    {
      name: "Log Out",
      onPress: () => fcl.unauthenticate(),
    },
  ];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
    >
      {/* <View style={styles.header}>
          <TouchableOpacity
            style={styles.account}
            onPress={() => fcl.unauthenticate()}
          >
            <LinearGradient
              style={styles.buttonGradient}
              colors={[colors.primary, colors.secondary]}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Avatar
                rounded
                icon={{
                  name: "user",
                  type: "font-awesome",
                  color: colors.secondary,
                }}
                overlayContainerStyle={{ backgroundColor: "white" }}
              />
              <Text style={{ fontSize: 14, marginLeft: 10, paddingRight: 10 }}>
                {user?.address ? truncateAddress(user?.address) : "Loading..."}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View> */}
      {/* <View
          style={{
            padding: 15,
            borderRadius: 10,
            backgroundColor: "white",
            marginBottom: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: "bold" }}>
            Your Account
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14 }}>Address</Text>
            <Text style={{ fontSize: 14 }}>
              {user?.address ?? "Loading..."}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 14 }}>Balance</Text>
            <Text style={{ fontSize: 14 }}>
              {user ? `${user.balance / 10 ** 8} FLOW` : "Loading..."}
            </Text>
          </View>

          <View style={styles.logoutButton}>
            <Button onPress={() => fcl.unauthenticate()}>
              <Text style={{ fontSize: 16 }}>Logout</Text>
            </Button>
          </View>
        </View> */}

      <View>
        <View style={styles.hero}>
          <Text style={styles.title}>Flowthentic</Text>
          <Text style={styles.subTitle}>
            Decentralized Identity Verification
          </Text>
        </View>

        <View style={styles.verificationStatus}>
          <View style={{ height: 200, marginBottom: 60 }}>
            <IdentityIllustration color={colors.primary} />
          </View>

          {/* <Text style={styles.text}>Not verified</Text> */}
        </View>

        <View>
          <Text style={styles.text}>
            Embrace the future of secure digital identity. Click below to begin
            your journey
          </Text>
          <Button>
            <Text style={styles.buttonText}>Start your verification here!</Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.background,
  },
  scrollView: {
    height: "100%",
    backgroundColor: colors.background,
    padding: 20,
    flex: 1,
    flexDirection: "column",
  },
  // HERO
  hero: {
    marginTop: 10,
    marginBottom: 40,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 45,
    marginBottom: 5,
  },
  subTitle: {
    lineHeight: 22,
    fontSize: 20,
    color: "white",
  },
  logoutButton: {
    marginTop: 10,
  },
  // BODY
  verificationStatus: {
    marginBottom: 20,
    gap: 20,
  },

  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "white",
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
