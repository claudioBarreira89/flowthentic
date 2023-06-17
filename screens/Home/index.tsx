import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Image, Text } from "@rneui/base";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://yourwebsite.com/logo.png" }}
        style={styles.logo}
        PlaceholderContent={<ActivityIndicator />}
      />

      <Text h1>Flowthentic</Text>

      <Text style={styles.info}>
        Flowthentic is a decentralized identity verification platform powered by
        Flow blockchain. Connect your wallet to start.
      </Text>

      <Button
        title="Connect Your Wallet"
        buttonStyle={styles.button}
        onPress={() => {}}
      />

      <View style={styles.footer}>
        <Text>Terms of Service</Text>
        <Text>Privacy Policy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#444",
  },
  logo: {
    width: 100,
    height: 100,
  },
  info: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    backgroundColor: "#3498db",
    marginTop: 20,
  },
  footer: {
    position: "absolute",
    bottom: 10,
  },
});

export default Home;
