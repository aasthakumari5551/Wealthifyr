import { useContext, useState, useEffect } from "react";
import { FinanceContext } from "../context/FinanceContext";
import TransactionItem from "./TransactionItem";
import Filters from "./Filters";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionList() {
  const { transactions } = useContext(FinanceContext);
  const [filtered, setFiltered] = useState(transactions);

  // Update filtered transactions when transactions change
  useEffect(() => {
    setFiltered(transactions);
  }, [transactions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <Filters setFiltered={setFiltered} />

      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            All Transactions
          </h3>
          <motion.span 
            className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={(filtered.length ? filtered : transactions).length}
          >
            {(filtered.length ? filtered : transactions).length} transaction{(filtered.length ? filtered : transactions).length !== 1 ? 's' : ''}
          </motion.span>
        </div>

        <AnimatePresence mode="wait">
          {(filtered.length ? filtered : transactions).length === 0 ? (
            <motion.div 
              className="mx-4 p-16 text-center bg-white/50 dark:bg-[#1A1F2E] backdrop-blur-lg border border-gray-200 dark:border-white/5 rounded-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">No transactions yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Add your first transaction to get started!</p>
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence>
                {(filtered.length ? filtered : transactions).map(
                  (transaction, index) => (
                    <TransactionItem
                      key={transaction.id}
                      transaction={transaction}
                      index={index}
                    />
                  )
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
