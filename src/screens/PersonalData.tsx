import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { colors } from "../styles/theme";
import { useHeaderHeight } from "@react-navigation/elements";
import { Button } from "../ui";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import { useCurrentUser } from "../hooks/useCurrentUser";
import getUserData from "../../cadence/scripts/get-user-data.cdc";
import { decryptData } from "../api";
import LoadingScreen from "../components/LoadingScreen";

export default function PersonalData() {
  const headerHeight = useHeaderHeight();
  const account = useCurrentUser()!!;

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<{
    hashedData: string;
    image: string;
  }>();

  const fetchUserData = useCallback(async (addr: string) => {
    try {
      setIsLoading(true);
      const data = await fcl.query({
        cadence: getUserData,
        args: (arg, t) => [arg(addr, t.String)],
      });

      const { data: originalBase64 } = await decryptData(data.encryptedImage);

      setUserData({
        hashedData: data.hashedData,
        image: originalBase64,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (account?.address) {
      fetchUserData(account?.address);
    }
  }, [account?.address]);

  const { hashedData, image } = userData || {};

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: headerHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        />
        <Text style={styles.text}>This is the hash of your data</Text>
        <View style={styles.hashBox}>
          <Text style={styles.hashText}>{hashedData}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.background,
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
    marginBottom: 60,
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    color: "white",
  },
  hashBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    width: "85%",
  },
  hashText: {
    fontSize: 16,
    color: "grey",
  },
});
