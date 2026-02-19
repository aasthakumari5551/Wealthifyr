import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Navbar({ onAddTransaction }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  const handleLogout = async () => {
    await signOut(auth);
    // Clear user-specific data from localStorage
    localStorage.removeItem("wealthifyr-user");
    localStorage.removeItem("wealthifyr-transactions");
    localStorage.removeItem("wealthifyr-budgets");
    navigate("/");
  };

  const scrollToTransactions = () => {
    const section = document.getElementById("transactions-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 }
    },
    exit: { opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.15 } }
  };

  return (
    <div className="sticky top-0 z-50 py-6 px-6">
      {/* Enhanced Pill Navbar */}
      <motion.div
        className="max-w-7xl mx-auto bg-white/90 dark:bg-[#1A1F2E]/95 backdrop-blur-xl rounded-full px-8 py-4 flex justify-between items-center shadow-2xl border border-gray-200/50 dark:border-white/10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Logo */}
        <motion.h1
          onClick={() => navigate("/dashboard")}
          className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#A3E635] to-[#8ec42a] cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Wealthifyr
        </motion.h1>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-gray-800 dark:text-white hover:text-[#A3E635] transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
        </motion.button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">

          <motion.button
            onClick={() => navigate("/dashboard")}
            className="text-gray-700 dark:text-white hover:text-[#A3E635] transition-all font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dashboard
          </motion.button>

          <motion.button
            onClick={scrollToTransactions}
            className="text-gray-700 dark:text-white hover:text-[#A3E635] transition-all font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Transactions
          </motion.button>

          {/* Profile Dropdown */}
          <div className="relative">
            <motion.button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-9 h-9 rounded-full bg-[#A3E635]/20 border border-[#A3E635]/40 flex items-center justify-center text-[#A3E635] text-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              👤
            </motion.button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  className="absolute right-0 mt-3 w-48 bg-white/95 dark:bg-[#1A1F2E] backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-white/10 p-2 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.button
                    onClick={() => {
                      toggleTheme();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-gray-800 dark:text-white hover:text-[#A3E635] font-medium flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
                    <span>Toggle {isDark ? "Light" : "Dark"}</span>
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      handleLogout();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-all text-gray-800 dark:text-white hover:text-red-400 font-medium flex items-center gap-2"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">🚪</span>
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-full left-6 right-6 mt-3 md:hidden bg-white/95 dark:bg-[#1A1F2E]/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-white/10"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-4 space-y-2">
                <motion.button
                  onClick={() => {
                    navigate("/dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-white hover:text-[#A3E635] font-bold transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  Dashboard
                </motion.button>

                <motion.button
                  onClick={() => {
                    scrollToTransactions();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-white hover:text-[#A3E635] font-bold transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  Transactions
                </motion.button>

                <motion.button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-white hover:text-[#A3E635] font-medium transition-all flex items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
                  <span>Toggle {isDark ? "Light" : "Dark"}</span>
                </motion.button>

                <motion.button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 text-white hover:text-red-400 font-medium transition-all flex items-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-lg">🚪</span>
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
