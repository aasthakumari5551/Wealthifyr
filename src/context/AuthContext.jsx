import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

const USER_STORAGE_KEY = "wealthifyr-user";

export default function AuthProvider({ children }) {
  // Load user from localStorage on mount
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      // Save to localStorage
      try {
        if (currentUser) {
          // Store only serializable user data
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          };
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } else {
          // Clear on logout
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Failed to save user to localStorage:", error);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}
