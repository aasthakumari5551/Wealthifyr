import { createContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export const FinanceContext = createContext();

const STORAGE_KEY = "wealthifyr-transactions";

export default function FinanceProvider({ children }) {
  // Load from localStorage on mount
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load transactions from localStorage:", error);
      return [];
    }
  });

  // Real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "transactions"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          amount: Number(doc.data().amount), // 🔥 force number
        }));
        setTransactions(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions to localStorage:", error);
    }
  }, [transactions]);

  // Add transaction
  const addTransaction = async (transaction) => {
    await addDoc(collection(db, "transactions"), {
      ...transaction,
      amount: Number(transaction.amount), // 🔥 force number
    });
  };

  // Delete transaction
  const deleteTransaction = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  // Edit transaction
  const editTransaction = async (id, updatedData) => {
    await updateDoc(doc(db, "transactions", id), {
      ...updatedData,
      amount: Number(updatedData.amount), // 🔥 force number
    });
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
