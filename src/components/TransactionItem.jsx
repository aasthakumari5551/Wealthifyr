import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { motion, AnimatePresence } from "framer-motion";

// Format date to readable format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export default function TransactionItem({ transaction, index }) {
  const { deleteTransaction, editTransaction } =
    useContext(FinanceContext);

  const [editing, setEditing] = useState(false);

  const [newTitle, setNewTitle] = useState(transaction.title);
  const [newAmount, setNewAmount] = useState(transaction.amount);
  const [newCategory, setNewCategory] = useState(transaction.category);
  const [newType, setNewType] = useState(transaction.type);

  const handleUpdate = () => {
    editTransaction(transaction.id, {
      title: newTitle,
      amount: Number(newAmount),
      category: newCategory,
      type: newType,
    });
    setEditing(false);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="
        bg-white dark:bg-[#1A1F2E]
        rounded-2xl
        p-6
        shadow-lg shadow-gray-200/50
        dark:shadow-none
        transition-all
        duration-300
        hover:shadow-xl hover:shadow-gray-300/50
        dark:hover:shadow-none
        hover:-translate-y-1
        border border-gray-200/50 dark:border-white/5
        hover:border-indigo-300/50 dark:hover:border-[#A3E635]/20
      "
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover={{ scale: 1.01 }}
    >

      <AnimatePresence mode="wait">
        {editing ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all text-gray-900 dark:text-white"
              placeholder="Title"
            />

            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all text-gray-900 dark:text-white"
              placeholder="Amount"
            />

            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all text-gray-900 dark:text-white"
              placeholder="Category"
            />

            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
              className="w-full border border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all text-gray-900 dark:text-white"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            <div className="flex gap-4 pt-3">
              <motion.button
                onClick={handleUpdate}
                className="flex-1 bg-indigo-600 dark:bg-[#A3E635] text-white px-5 py-3 rounded-xl hover:bg-indigo-700 dark:hover:bg-[#8ec42a] transition-all font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Save
              </motion.button>

              <motion.button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-200 dark:bg-[#0A0E1A] dark:border dark:border-white/10 px-5 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-white/5 transition-all font-semibold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex justify-between items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* Left */}
            <div className="flex-1">
              <p className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                {transaction.title}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {transaction.category} • {formatDate(transaction.date)}
              </p>
            </div>

            {/* Right */}
            <div className="text-right space-y-3">
              <motion.p
                className={
                  transaction.type === "income"
                    ? "text-emerald-500 font-bold text-xl"
                    : "text-red-500 font-bold text-xl"
                }
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                ₹ {transaction.amount}
              </motion.p>

              <div className="flex gap-5 justify-end text-sm">
                <motion.button
                  onClick={() => setEditing(true)}
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-[#A3E635] transition-all font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Edit
                </motion.button>

                <motion.button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="text-gray-500 hover:text-red-600 transition-all font-medium"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
