import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import AddTransactionModal from "../components/AddTransactionModal";
import SetBudgetModal from "../components/SetBudgetModal";
import BudgetCard from "../components/BudgetCard";
import Charts from "../components/Charts";
import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { BudgetContext } from "../context/BudgetContext";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { transactions } = useContext(FinanceContext);
  const { budgets } = useContext(BudgetContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-[#0A0E1A] dark:via-[#0f1420] dark:to-[#0A0E1A] transition-colors duration-300 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-10 w-96 h-96 bg-purple-300 dark:bg-[#A3E635] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-40 -right-10 w-96 h-96 bg-yellow-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-pink-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <Navbar onAddTransaction={() => setIsModalOpen(true)} />

      <motion.div 
        className="max-w-6xl mx-auto px-6 py-12 space-y-12 pb-28 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Welcome Section */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-gray-800 dark:text-white">Track spends.</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] via-[#8ec42a] to-[#A3E635] animate-gradient">Save smart.</span>
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Your complete financial overview at a glance
          </motion.p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <SummaryCard title="Balance" amount={balance} index={0} />
          <SummaryCard title="Income" amount={income} index={1} />
          <SummaryCard title="Expense" amount={expense} index={2} />
        </motion.div>

        {/* Budget Goals Section */}
        <motion.div 
          className="space-y-6"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              💰 Budget Goals
            </h2>
            <motion.button
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#A3E635] to-[#8ec42a] text-[#0A0E1A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#A3E635]/30 transition-all text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + Set Budget
            </motion.button>
          </div>

          {budgets.length === 0 ? (
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/10 dark:to-indigo-500/10 border-2 border-dashed border-blue-300 dark:border-blue-500/30 rounded-2xl p-12 text-center"
              variants={itemVariants}
            >
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                No Budgets Set Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Set monthly budgets to track your spending and stay on target!
              </p>
              <motion.button
                onClick={() => setIsBudgetModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-[#A3E635] to-[#8ec42a] text-[#0A0E1A] font-bold rounded-xl hover:shadow-lg hover:shadow-[#A3E635]/30 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your First Budget
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {budgets.map((budget, index) => (
                <BudgetCard key={budget.id} budget={budget} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Charts */}
        <motion.div 
          className="bg-white/95 dark:bg-[#1A1F2E] rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none p-8 transition-all duration-300 hover:shadow-2xl dark:hover:shadow-none border border-gray-200/50 dark:border-white/5"
          variants={itemVariants}
        >
          <Charts />
        </motion.div>

        {/* Transactions */}
        <motion.div 
          id="transactions-section"
          className="space-y-6"
          variants={itemVariants}
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white px-2">
            Recent Transactions
          </h2>
          <TransactionList />
        </motion.div>

      </motion.div>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="
          fixed bottom-8 right-8
          w-16 h-16
          bg-[#A3E635]
          hover:bg-[#A3E635]/90
          text-[#0A0E1A] text-3xl font-bold
          rounded-full
          shadow-xl shadow-[#A3E635]/50
          flex items-center justify-center
          z-40
        "
        title="Add Transaction"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        +
      </motion.button>

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Budget Modal */}
      <SetBudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
    </div>
  );
}
