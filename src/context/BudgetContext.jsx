import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";

export const BudgetContext = createContext();

const STORAGE_KEY = "wealthifyr-budgets";

export default function BudgetProvider({ children }) {
  // Load from localStorage on mount
  const [budgets, setBudgets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load budgets from localStorage:", error);
      return [];
    }
  });

  // Real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "budgets"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          amount: Number(doc.data().amount),
        }));
        setBudgets(data);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save to localStorage whenever budgets change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    } catch (error) {
      console.error("Failed to save budgets to localStorage:", error);
    }
  }, [budgets]);

  // Add budget
  const addBudget = async (budget) => {
    await addDoc(collection(db, "budgets"), {
      ...budget,
      amount: Number(budget.amount),
    });
  };

  // Delete budget
  const deleteBudget = async (id) => {
    await deleteDoc(doc(db, "budgets", id));
  };

  // Edit budget
  const editBudget = async (id, updatedData) => {
    await updateDoc(doc(db, "budgets", id), {
      ...updatedData,
      amount: Number(updatedData.amount),
    });
  };

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        deleteBudget,
        editBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

// Custom hook
export const useBudgets = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error("useBudgets must be used within BudgetProvider");
  }
  return context;
};
