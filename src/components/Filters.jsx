import { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { motion } from "framer-motion";

export default function Filters({ setFiltered }) {
  const { transactions } = useContext(FinanceContext);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const handleFilter = () => {
    let filtered = transactions;

    if (type !== "all") {
      filtered = filtered.filter((t) => t.type === type);
    }

    if (search) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filtered);
  };

  return (
    <motion.div 
      className="bg-white/95 dark:bg-[#1A1F2E] backdrop-blur-xl border border-gray-200/50 dark:border-white/10 p-6 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none hover:shadow-2xl dark:hover:shadow-none transition-all duration-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search transactions..."
            className="flex-1 w-full p-4 bg-gray-50 dark:bg-[#0A0E1A] border-2 border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all duration-300 hover:border-indigo-500/50 dark:hover:border-[#A3E635]/50 focus:scale-[1.01]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-4 bg-gray-50 dark:bg-[#0A0E1A] border-2 border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-[#A3E635] transition-all duration-300 min-w-[160px] hover:border-indigo-500/50 dark:hover:border-[#A3E635]/50 cursor-pointer font-medium"
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all" className="bg-white dark:bg-[#0A0E1A] text-gray-900 dark:text-white">All Types</option>
          <option value="income" className="bg-white dark:bg-[#0A0E1A] text-gray-900 dark:text-white">Income</option>
          <option value="expense" className="bg-white dark:bg-[#0A0E1A] text-gray-900 dark:text-white">Expense</option>
        </select>

        <motion.button
          onClick={handleFilter}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#A3E635] dark:to-[#A3E635] text-white font-semibold px-10 py-4 rounded-xl hover:shadow-lg dark:hover:shadow-[#A3E635]/20 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          Filter
        </motion.button>
      </div>
    </motion.div>
  );
}
