import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_9e-pFwuu31mFxVdaQkPeC7p2yL-BMfU",
  authDomain: "finance-847a0.firebaseapp.com",
  projectId: "finance-847a0",
  storageBucket: "finance-847a0.firebasestorage.app",
  messagingSenderId: "459534134633",
  appId: "1:459534134633:web:6bbe505170f2c44ab461f8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
