import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { useBudgets } from "../context/BudgetContext";

export default function BudgetCard({ budget, index = 0 }) {
  const { transactions } = useContext(FinanceContext);
  const { deleteBudget } = useBudgets();
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Delete budget for ${budget.category}?`)) {
      await deleteBudget(budget.id);
    }
  };

  // Calculate spent amount for this category this month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const spent = transactions
    .filter((t) => {
      if (t.type !== "expense") return false;
      
      // Case-insensitive category matching
      if (t.category?.toLowerCase() !== budget.category?.toLowerCase()) return false;
      
      // Parse date - handle both date objects and string formats
      let transactionDate;
      if (t.date instanceof Date) {
        transactionDate = t.date;
      } else if (typeof t.date === 'string') {
        // Try parsing the date string
        transactionDate = new Date(t.date);
      } else {
        return false;
      }
      
      // Check if date is valid
      if (isNaN(transactionDate.getTime())) return false;
      
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    })
    .reduce((acc, t) => acc + t.amount, 0);

  const percentage = Math.min((spent / budget.amount) * 100, 100);
  const remaining = Math.max(budget.amount - spent, 0);
  const isOverBudget = spent > budget.amount;
  const overAmount = isOverBudget ? spent - budget.amount : 0;

  // Get status color
  const getStatusColor = () => {
    if (percentage >= 100) return "text-red-500 dark:text-red-400";
    if (percentage >= 90) return "text-orange-500 dark:text-orange-400";
    if (percentage >= 70) return "text-yellow-500 dark:text-yellow-400";
    return "text-emerald-500 dark:text-emerald-400";
  };

  const getProgressColor = () => {
    if (percentage >= 100) return "#ef4444"; // red
    if (percentage >= 90) return "#f97316"; // orange
    if (percentage >= 70) return "#eab308"; // yellow
    return "#10b981"; // emerald
  };

  const getRingColor = () => {
    if (percentage >= 100) return "#7f1d1d"; // dark red
    if (percentage >= 90) return "#7c2d12"; // dark orange
    if (percentage >= 70) return "#713f12"; // dark yellow
    return "#064e3b"; // dark emerald
  };

  // SVG Circle values
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="
        bg-white dark:bg-[#1A1F2E] 
        rounded-2xl p-6
        shadow-lg shadow-gray-200/50 dark:shadow-none
        border border-gray-200 dark:border-white/5
        hover:shadow-xl hover:scale-105
        transition-all duration-300
        relative
      "
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      {/* Delete Button */}
      <motion.button
        onClick={handleDelete}
        className="absolute top-4 right-4 w-8 h-8 bg-red-100 dark:bg-red-500/20 hover:bg-red-200 dark:hover:bg-red-500/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 transition-all z-10"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showDelete ? 1 : 0, scale: showDelete ? 1 : 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Delete Budget"
      >
        <span className="text-lg">🗑️</span>
      </motion.button>

      <div className="flex items-center justify-between gap-4">
        {/* Left: Progress Ring */}
        <div className="relative w-32 h-32 flex-shrink-0">
          <svg className="transform -rotate-90 w-32 h-32">
            {/* Background Circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke={getRingColor()}
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="64"
              cy="64"
              r={radius}
              stroke={getProgressColor()}
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              strokeLinecap="round"
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className={`text-2xl font-bold ${getStatusColor()}`}>
              {Math.round(percentage)}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">used</span>
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 truncate">
            {budget.category}
          </h3>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Spent:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ₹{spent.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Budget:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                ₹{budget.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-white/10">
              {isOverBudget ? (
                <>
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    Over by:
                  </span>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    ₹{overAmount.toLocaleString()}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Remaining:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    ₹{remaining.toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-3">
            {isOverBudget ? (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                🚨 Over budget! Reduce spending.
              </p>
            ) : percentage >= 90 ? (
              <p className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                ⚠️ Almost at limit! Be careful.
              </p>
            ) : percentage >= 70 ? (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                💡 You're on track, watch spending.
              </p>
            ) : (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                ✅ Great! You're doing well.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
