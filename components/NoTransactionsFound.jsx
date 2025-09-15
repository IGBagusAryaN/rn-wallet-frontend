import { useRouter } from "expo-router";
import { Text ,TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

const NoTransactionsFound = () => {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <Ionicons
        name="receipt-outline"
        size={60}
        // style={styles.emptyState}
        color={COLORS.textLight}
      />
      <Text style={styles.emptyStateTitle}>No transactions yet</Text>
      <Text style={styles.emptyStateText}>
        Start tracking your finances by adding your first transaction
      </Text>
      <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}>
        <Ionicons name="add-circle" size={18} color={COLORS.white}/>
        <Text style={styles.emptyStateButtonText}>Add Transactions</Text>

      </TouchableOpacity>
    </View>
  );
};

export default NoTransactionsFound;
