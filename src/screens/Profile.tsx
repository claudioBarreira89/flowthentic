import React, { useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles/theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button } from "../ui";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";

export default function Profile() {
  const headerHeight = useHeaderHeight();
  const [userName, setUserName] = useState("User Name");
  const [userAddress, setUserAddress] = useState("FLOW-123-ABC");

  function verifyAddress() {}

  function editUserName() {}

  function logout() {}

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hey there 👋🏻</Text>
          <Text style={styles.title}>You are an authentic user!</Text>
        </View>

        <View style={styles.section}>
          <Button>Check personal data</Button>
        </View>
        <View style={styles.section}>
          <Button>Verify address authenticity</Button>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button type="secondary" onPress={() => fcl.unauthenticate()}>
          Disconnect wallet
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  container: {
    padding: 15,
    backgroundColor: colors.background,
    flex: 1,
  },
  titleContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    color: "white",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
  address: {
    fontSize: 14,
    textAlign: "center",
    margin: 10,
  },
  sectionTitle: {
    fontSize: 16,
    textAlign: "center",
    margin: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
  },
  section: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
});
