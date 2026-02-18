import { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { motion, AnimatePresence } from "framer-motion";

export default function AddTransactionModal({ isOpen, onClose }) {
  const { addTransaction } = useContext(FinanceContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Education",
    "Salary",
    "Business",
    "Investment",
    "Other",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    addTransaction({
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date(date).toISOString(), // Store as ISO string for better parsing
    });

    setTitle("");
    setAmount("");
    setCategory("");
    setDate(new Date().toISOString().split('T')[0]);
    onClose();
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: -50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.3
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="
              bg-white dark:bg-[#1A1F2E]
              rounded-3xl
              p-10
              w-full
              max-w-lg
              shadow-2xl
              border border-gray-200
              dark:border-white/10
            "
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Transaction
              </h3>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <motion.div
                custom={0}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] focus:border-transparent transition-all text-gray-800 dark:text-white placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                custom={1}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] focus:border-transparent transition-all text-gray-800 dark:text-white placeholder-gray-400"
                />
              </motion.div>

              <motion.div
                custom={2}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full border-2 border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] focus:border-transparent transition-all text-gray-800 dark:text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </motion.div>

              <motion.div
                custom={3}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full border-2 border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] focus:border-transparent transition-all text-gray-800 dark:text-white"
                  />
                </div>
              </motion.div>

              <motion.div
                custom={4}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full border-2 border-gray-300 dark:border-white/10 bg-white dark:bg-[#0A0E1A] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] focus:border-transparent transition-all text-gray-800 dark:text-white"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </motion.div>

              <motion.div 
                className="flex gap-4 pt-6"
                custom={5}
                variants={formItemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-xl bg-gray-200 dark:bg-[#0A0E1A] text-gray-800 dark:text-white font-semibold transition-all hover:bg-gray-300 dark:hover:bg-white/5 border-2 border-transparent dark:border-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#A3E635] dark:to-[#A3E635] text-white font-semibold transition-all hover:from-indigo-700 hover:to-purple-700 dark:hover:from-[#8ec42a] dark:hover:to-[#8ec42a] shadow-lg dark:shadow-[#A3E635]/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Transaction
                </motion.button>
              </motion.div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
