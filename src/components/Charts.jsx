import { useContext } from "react";
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
    const dateMap = {};
    
    // First, collect all unique dates from transactions
    transactions.forEach((t) => {
      const transDate = t.date;
      if (!dateMap[transDate]) {
        dateMap[transDate] = { income: 0, expense: 0 };
      }
      
      if (t.type === "income") {
        dateMap[transDate].income += t.amount;
      } else {
        dateMap[transDate].expense += t.amount;
      }
    });
    
    // Sort dates
    const sortedDates = Object.keys(dateMap).sort((a, b) => {
      const [monthA, dayA, yearA] = a.split('/').map(Number);
      const [monthB, dayB, yearB] = b.split('/').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateA - dateB;
    });
    
    return { days: sortedDates, dateMap };
  };

  const { days, dateMap } = getTransactionsByDate();

  const lineData = {
    labels: days.length > 0 ? days : ["No Data"],
    datasets: [
      {
        label: "Income",
        data: days.length > 0 ? days.map(day => dateMap[day].income) : [0],
        borderColor: document.documentElement.classList.contains("dark") ? "#A3E635" : "#10b981",
        backgroundColor: document.documentElement.classList.contains("dark") ? "rgba(163, 230, 53, 0.1)" : "rgba(16, 185, 129, 0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Expense",
        data: days.length > 0 ? days.map(day => dateMap[day].expense) : [0],
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
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
      animateRotate: true,
      animateScale: true,
    },
    plugins: {
      legend: {
        labels: {
          color: textColor,
          font: {
            size: 14,
            weight: '500',
          },
          padding: 20,
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
        <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
          <span className="text-2xl">📈</span>
          Transaction Trend
        </h3>
        <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-8 rounded-2xl shadow-lg">
          <Line data={lineData} options={commonOptions} />
        </div>
      </motion.div>

      {/* Bar and Pie Charts - Side by Side */}
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          variants={chartVariants}
          whileHover={{ scale: 1.02 }}
          className="transition-all"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Income vs Expense
          </h3>
          <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-6 rounded-2xl shadow-lg">
            <Bar data={barData} options={commonOptions} />
          </div>
        </motion.div>

        <motion.div
          variants={chartVariants}
          whileHover={{ scale: 1.02 }}
          className="transition-all"
        >
          <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
            <span className="text-2xl">🥧</span>
            Distribution
          </h3>
          <div className="bg-gray-50 dark:bg-[#1A1F2E] border border-gray-200 dark:border-white/5 p-6 rounded-2xl shadow-lg">
            <Pie data={pieData} options={commonOptions} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
