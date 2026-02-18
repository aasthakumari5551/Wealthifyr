import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SummaryCard({ title, amount, index = 0 }) {
  const [displayAmount, setDisplayAmount] = useState(0);

  // Animate the number counting up
  useEffect(() => {
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = amount / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= amount) {
        setDisplayAmount(amount);
        clearInterval(timer);
      } else {
        setDisplayAmount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [amount]);

  // Choose accent color based on title
  const getAccent = () => {
    if (title === "Income") return "text-emerald-500 dark:text-emerald-400";
    if (title === "Expense") return "text-red-500 dark:text-red-400";
    return "text-indigo-500 dark:text-[#A3E635]"; // Balance
  };

  const getIcon = () => {
    if (title === "Income") return "📈";
    if (title === "Expense") return "📉";
    return "💰";
  };

  const getIconBg = () => {
    if (title === "Income") return "bg-emerald-100 dark:bg-emerald-500/20";
    if (title === "Expense") return "bg-red-100 dark:bg-red-500/20";
    return "bg-indigo-100 dark:bg-[#A3E635]/20";
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      className="
        bg-gradient-to-br from-white to-gray-50
        dark:from-[#1A1F2E] dark:to-[#1A1F2E]
        rounded-2xl
        p-8
        shadow-xl shadow-gray-200/50
        dark:shadow-none
        transition-all
        duration-300
        hover:shadow-2xl hover:shadow-gray-300/50
        dark:hover:shadow-none
        hover:-translate-y-2
        border border-gray-200/50
        dark:border-white/5
        overflow-hidden
        relative
      "
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon at top-right */}
      <motion.div 
        className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center ${getIconBg()}`}
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <span className="text-3xl">{getIcon()}</span>
      </motion.div>

      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3 uppercase tracking-wide">
        {title}
      </p>

      <motion.h2 
        className={`text-4xl font-bold mt-2 ${getAccent()}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
      >
        ₹ {displayAmount.toLocaleString()}
      </motion.h2>

    </motion.div>
  );
}
