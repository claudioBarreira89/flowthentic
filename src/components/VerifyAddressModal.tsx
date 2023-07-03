import { Modal, StyleSheet, Text, View } from "react-native";
import { Input } from "@rneui/base";
import { Button } from "../ui";
import { useCallback, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl/dist/fcl-react-native";
import verifyAddress from "../../cadence/scripts/verify-address.cdc";

export default function VerifyAddressModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [isAuthentic, setIsAuthentic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState<string>("");

  const handleSubmit = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fcl.query({
        cadence: verifyAddress,
        args: (arg, t) => [arg(address?.toLocaleLowerCase(), t.String)],
      });

      setIsAuthentic(data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    setAddress("");
  }, []);

  useEffect(() => {
    setIsAuthentic(null);
  }, [address]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Paste an address to verify it's authenticity
          </Text>

          <View style={styles.fields}>
            <Input label="Address" value={address} onChangeText={setAddress} />
          </View>
          {isAuthentic === true && (
            <Text style={styles.authentic}>
              Address belongs to an authentic user
            </Text>
          )}
          {isAuthentic === false && (
            <Text style={styles.notAuthentic}>Address is not authentic</Text>
          )}

          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              Validate
            </Button>
            <Button
              style={styles.button}
              type="secondary"
              onPress={() => setOpen(false)}
            >
              Close
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  authentic: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
  },
  notAuthentic: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  fields: {
    marginTop: 20,
  },
  button: {
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
