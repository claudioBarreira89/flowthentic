import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { colors } from "../styles/theme";

export default function Profile() {
  const [userName, setUserName] = useState("User Name");
  const [userAddress, setUserAddress] = useState("FLOW-123-ABC");

  function verifyAddress() {}

  function editUserName() {}

  function logout() {}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>

      <Text style={styles.userName}>{userName}</Text>
      <Button title="Edit User Name" onPress={editUserName} />

      <Text style={styles.address}>Address: {userAddress}</Text>
      <Button title="Verify Address" onPress={verifyAddress} />

      <Text style={styles.sectionTitle}>Activity History</Text>
      {/* Display user's activity history here */}

      <Text style={styles.sectionTitle}>Notifications</Text>
      {/* Display notifications here */}

      <Text style={styles.sectionTitle}>Security Settings</Text>
      {/* Security settings options go here */}

      <Text style={styles.sectionTitle}>Contact or Support</Text>
      {/* Contact or support information goes here */}

      <Button title="Log Out" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
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
});
