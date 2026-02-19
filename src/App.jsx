import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import MainLayout from "./components/MainLayout";
import AuthProvider from "./context/AuthContext";
import FinanceProvider from "./context/FinanceContext";
import BudgetProvider from "./context/BudgetContext";
import ThemeProvider from "./context/ThemeContext";
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <BudgetProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/about" element={<MainLayout><About /></MainLayout>} />
                <Route path="/privacy" element={<MainLayout><Privacy /></MainLayout>} />
                <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </BudgetProvider>
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
