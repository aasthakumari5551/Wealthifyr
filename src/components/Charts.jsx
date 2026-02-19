import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

export default function Charts() {
  const { transactions } = useContext(FinanceContext);
  const [timePeriod, setTimePeriod] = useState("monthly"); // "7days", "30days", "monthly"

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  const textColor = document.documentElement.classList.contains("dark")
    ? "#e5e7eb"
    : "#374151";

  const pieData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        data: [income, expense, Math.abs(balance)],
        backgroundColor: [
          "#10b981", 
          "#ef4444",
          "#8b5cf6"
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense, balance],
        backgroundColor: [
          document.documentElement.classList.contains("dark") ? "#A3E635" : "#10b981",
          "#ef4444",
          "#8b5cf6"
        ],
        borderRadius: 12,
      },
    ],
  };

  // Line chart data - group all transactions by date
  const getTransactionsByDate = () => {
    const now = new Date();
    const labels = [];
    const incomeData = [];
    const expenseData = [];

    if (timePeriod === "7days") {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayLabel = `${date.getDate()}/${date.getMonth() + 1}`;
        
        labels.push(dayLabel);
        
        const dayIncome = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "income" && 
                   tDate.getDate() === date.getDate() &&
                   tDate.getMonth() === date.getMonth() &&
                   tDate.getFullYear() === date.getFullYear();
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        const dayExpense = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "expense" && 
                   tDate.getDate() === date.getDate() &&
                   tDate.getMonth() === date.getMonth() &&
                   tDate.getFullYear() === date.getFullYear();
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        incomeData.push(dayIncome);
        expenseData.push(dayExpense);
      }
    } else if (timePeriod === "30days") {
      // Last 30 days - group by week
      for (let i = 4; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 6) - 5);
        const weekEnd = new Date(now);
        weekEnd.setDate(weekEnd.getDate() - (i * 6));
        
        const label = `${weekStart.getDate()}/${weekStart.getMonth() + 1}`;
        labels.push(label);
        
        const weekIncome = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "income" && tDate >= weekStart && tDate <= weekEnd;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        const weekExpense = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "expense" && tDate >= weekStart && tDate <= weekEnd;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        incomeData.push(weekIncome);
        expenseData.push(weekExpense);
      }
    } else {
      // Monthly (Jan-Dec)
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentYear = now.getFullYear();
      
      months.forEach((month, index) => {
        labels.push(month);
        
        const monthIncome = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "income" && 
                   tDate.getMonth() === index &&
                   tDate.getFullYear() === currentYear;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        const monthExpense = transactions
          .filter(t => {
            const tDate = new Date(t.date);
            return t.type === "expense" && 
                   tDate.getMonth() === index &&
                   tDate.getFullYear() === currentYear;
          })
          .reduce((sum, t) => sum + t.amount, 0);
        
        incomeData.push(monthIncome);
        expenseData.push(monthExpense);
      });
    }

    return { labels, incomeData, expenseData };
  };

  const { labels, incomeData, expenseData } = getTransactionsByDate();

  const lineData = {
    labels: labels.length > 0 ? labels : ["No Data"],
    datasets: [
      {
        label: "Income",
        data: incomeData.length > 0 ? incomeData : [0],
        borderColor: document.documentElement.classList.contains("dark") ? "#A3E635" : "#10b981",
        backgroundColor: document.documentElement.classList.contains("dark") ? "rgba(163, 230, 53, 0.1)" : "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expense",
        data: expenseData.length > 0 ? expenseData : [0],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: textColor,
          font: {
            size: window.innerWidth < 640 ? 11 : 14,
            weight: '500',
          },
          padding: window.innerWidth < 640 ? 8 : 12,
          boxWidth: window.innerWidth < 640 ? 30 : 40,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: textColor,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(156,163,175,0.15)",
        },
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Line Chart - Full Width */}
      <motion.div
        variants={chartVariants}
        whileHover={{ scale: 1.01 }}
        className="transition-all"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            Transaction Trend
          </h3>
          
          {/* Time Period Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setTimePeriod("7days")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                timePeriod === "7days"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimePeriod("30days")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                timePeriod === "30days"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimePeriod("monthly")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                timePeriod === "monthly"
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg">
          <div className="w-full h-64 sm:h-72 md:h-80">
            <Line data={lineData} options={commonOptions} />
          </div>
        </div>
      </motion.div>

      {/* Bar and Pie Charts - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          variants={chartVariants}
          whileHover={{ scale: 1.02 }}
          className="transition-all"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
            Income vs Expense
          </h3>
          <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="w-full h-64 sm:h-72 md:h-80">
              <Bar data={barData} options={commonOptions} />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={chartVariants}
          whileHover={{ scale: 1.02 }}
          className="transition-all"
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800 dark:text-white">
            Distribution
          </h3>
          <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="w-full h-64 sm:h-72 md:h-80">
              <Pie data={pieData} options={commonOptions} />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
