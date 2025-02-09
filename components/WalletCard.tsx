import { Button, Card, IconButton, Text } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { removeWallet, WalletStoredInfo } from "@/services/storage";
import { AppTheme, useTheme } from "@/services/theme";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Modal, ModalRef } from "./Modal";

type Props = {
  wallet: WalletStoredInfo;
  onWalletRemoved?: () => void;
};

export const WalletCard = ({ wallet, onWalletRemoved }: Props) => {
  const removeModal = useRef<null | ModalRef>(null);
  const theme = useTheme();
  const styles = stylesBuilder(theme);
  const { push } = useRouter();

  const onPress = () => {
    //@ts-ignore
    push(`/(tabs)/wallet/${wallet.id}/(tabs)/`);
  };

  const onRemove = () => {
    removeWallet(wallet.id).then(() => {
      onWalletRemoved?.();
      removeModal.current?.close();
    });
  };

  return (
    <>
      <Card
        // onLongPress={() =>
        //   // removeWallet(wallet.id).then(() => onWalletRemoved?.())
        // }
        onPress={onPress}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <View style={styles.titleLeftContainer}>
            <Ionicons
              name="wallet-outline"
              color={theme.colors.primary}
              size={theme.sizes.l}
            />
            <Text
              style={{ flexShrink: 1 }}
              variant="titleMedium"
              numberOfLines={1}
            >
              {wallet.name}
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeModal.current?.open()}>
            <Ionicons
              style={styles.close}
              name="close"
              color={theme.colors.error}
              size={theme.sizes.l}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
            type:
          </Text>
          <Text
            style={{ flexShrink: 1 }}
            variant="bodyMedium"
            numberOfLines={1}
          >
            {wallet.type}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
            address:
          </Text>
          <Text
            style={{ flexShrink: 1 }}
            variant="bodyMedium"
            numberOfLines={1}
          >
            {wallet.address}
          </Text>
          <IconButton
            style={styles.iconButton}
            mode="outlined"
            onPress={() => {
              Clipboard.setString(wallet.address);
              Toast.show({ type: "success", text1: "Address has been copied" });
            }}
            icon={() => (
              <Ionicons
                name={"clipboard"}
                size={theme.sizes.xm}
                color={theme.colors.primary}
              />
            )}
          />
        </View>
      </Card>
      <Modal ref={removeModal}>
        <Text>Are you sure you want to remove {wallet.name}?</Text>
        <View style={styles.buttonContainer}>
          <Button onPress={removeModal.current?.close}>No</Button>
          <Button
            onPress={onRemove}
            style={styles.yesButton}
            labelStyle={styles.yesLabelButton}
            mode="contained"
          >
            Yes
          </Button>
        </View>
      </Modal>
    </>
  );
};

const stylesBuilder = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: theme.sizes.m,
      backgroundColor: theme.colors.surface,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: theme.sizes.m,
      marginBottom: theme.sizes.m,
    },
    titleLeftContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.sizes.m,
      flexShrink: 1,
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.sizes.s,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
    },
    iconButton: {
      borderColor: theme.colors.primary,
    },
    close: {
      opacity: 0.3,
    },
    buttonContainer: {
      marginTop: theme.sizes.m,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    yesButton: {
      backgroundColor: theme.colors.errorContainer,
    },
    yesLabelButton: {
      color: theme.colors.onErrorContainer,
    },
  });
