import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white/90 dark:bg-[#0B1220]/90 border-t border-gray-200 dark:border-white/5 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 dark:text-gray-300">© {new Date().getFullYear()} Wealthifyr</div>
        <div className="flex items-center space-x-4">
          <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">About</Link>
          <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">Privacy</Link>
          <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
