import { Card, Chip, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { UTXO } from "@/types/global";
import { AppTheme, useTheme } from "@/services/theme";
import { AccountBTC } from "@/services/AccountBTC";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  utxo: UTXO;
  small?: boolean;
  selected?: boolean;
};

export const UtxoCard = ({ utxo, small, selected }: Props) => {
  const theme = useTheme();
  const styles = stylesBuilder(theme);

  return (
    <>
      <Card
        style={[
          styles.container,
          selected ? styles.selectedContainer : undefined,
          small ? styles.smallContainer : undefined,
        ]}
      >
        <View style={styles.chipContainer}>
          <Chip
            style={{
              backgroundColor:
                utxo.status === "mined"
                  ? theme.colors.success
                  : theme.colors.tertiary,
            }}
          >
            {utxo.status}
          </Chip>
          {selected && (
            <Ionicons
              name="checkbox"
              color={theme.colors.success}
              size={theme.sizes.l}
            />
          )}
        </View>
        <View style={styles.section}>
          {!small && (
            <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
              TX id
            </Text>
          )}
          <Text
            style={{ flexShrink: 1 }}
            variant="bodyMedium"
            numberOfLines={1}
          >
            {utxo.tx_id}
          </Text>
        </View>
        <View style={styles.section}>
          {!small && (
            <>
              <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
                Value:
              </Text>
              <Text
                style={{ flexShrink: 1 }}
                variant="bodyMedium"
                numberOfLines={1}
              >
                {`${utxo.value} satoshi`}
              </Text>
            </>
          )}
          <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
            {`${utxo.value / Math.pow(10, AccountBTC.decimals)} btc`}
          </Text>
        </View>
        {!small && (
          <View style={styles.section}>
            <Text style={styles.label} variant="bodyMedium" numberOfLines={1}>
              Confirmations
            </Text>
            <Text
              style={{ flexShrink: 1 }}
              variant="bodyMedium"
              numberOfLines={1}
            >
              {utxo.confirmations}
            </Text>
          </View>
        )}
      </Card>
    </>
  );
};

const stylesBuilder = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: theme.sizes.m,
      backgroundColor: theme.colors.surface,
    },
    selectedContainer: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.success,
    },
    smallContainer: {
      width: "48.5%",
      marginBottom: "2.5%",
    },
    chipContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: theme.sizes.m,
    },
    section: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.sizes.s,
    },
    label: {
      color: theme.colors.onSurfaceVariant,
    },
  });
