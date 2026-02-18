import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthProvider from "./context/AuthContext";
import FinanceProvider from "./context/FinanceContext";
import BudgetProvider from "./context/BudgetContext";
import ThemeProvider from "./context/ThemeContext";

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
              </Routes>
            </BrowserRouter>
          </BudgetProvider>
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
