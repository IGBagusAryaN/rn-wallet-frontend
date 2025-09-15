import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

// const API_URL = "http://localhost:5001/api"; for simulator
// const API_URL = "http://192.168.18.166:5001/api";
// const API_URL = "http://rn-wallet-backend-rosy.vercel.app/api"; 
// api deploy

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // useCallback is used for performance reasons, it will memorize the function
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Errot loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = async (id) => {
    try {
        const response = await fetch(`${API_URL}/transactions/${id}`, {method: "DELETE"});
        if (!response.ok) throw new Error("Failed to delete transaction");

        // Refresh data after deletion
        loadData()
        Alert.alert("Success", "Transaction deleted successfully")
    } catch (error) {
        console.error("Error deleting transactions", error);
        Alert.alert("Error", error.message)        
    }
  }

  return { transactions, summary, isLoading, loadData, deleteTransaction}
};
