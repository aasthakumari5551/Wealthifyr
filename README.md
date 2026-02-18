# 💰 Wealthifyr

**Author:** Aastha Kumari

A modern, feature-rich personal finance tracker built with React, Firebase, and Tailwind CSS. Track expenses, set budgets, and achieve your financial goals with style.

![React](https://img.shields.io/badge/React-18-blue) ![Firebase](https://img.shields.io/badge/Firebase-10-orange) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3-cyan) ![Vite](https://img.shields.io/badge/Vite-5-purple)

## ✨ Features

### 📊 **Core Functionality**
- **Dashboard Overview** - Real-time balance, income, and expense tracking
- **Transaction Management** - Add, edit, delete transactions with categories
- **Budget Goals** - Set monthly budgets with visual progress rings
- **Data Visualization** - Interactive charts (Line, Bar, Pie)
- **Smart Filtering** - Filter by type, category, date range

### 🎨 **Premium UI/UX**
- **Dark/Light Theme** - Persistent theme with smooth transitions
- **Axio-Inspired Navbar** - Pill-shaped floating navigation
- **Animated Components** - Framer Motion for smooth interactions
- **Responsive Design** - Mobile-first, works on all devices
- **Glassmorphism Effects** - Modern frosted glass aesthetics

### 🚀 **Advanced Features**
- **Budget Tracking** - Circular progress indicators with color-coded alerts
- **Offline Support** - localStorage caching for instant loading
- **Real-time Sync** - Firestore integration for cross-device access
- **Smart Categorization** - Pre-defined expense categories
- **Monthly Analytics** - Track spending patterns over time

## 🛠️ Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Firebase (Firestore + Authentication)
- **Charts:** Chart.js + react-chartjs-2
- **Routing:** React Router DOM v6
- **State Management:** Context API

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup Steps

1. **Clone the repository**
   `ash
   git clone https://github.com/yourusername/wealthifyr.git
   cd wealthifyr
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Firebase Configuration**
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Firestore and Authentication (Email/Password)
   - Update `src/firebase/config.js` with your credentials

4. **Run development server**
   `ash
   npm run dev
   `

5. **Build for production**
   `ash
   npm run build
   `

## 🎯 Usage

1. **Sign Up/Login** - Create account with email and password
2. **Add Transactions** - Click the floating `+` button
3. **Set Budgets** - Click "+ Set Budget" in Budget Goals section
4. **Track Progress** - Watch circular progress rings update in real-time
5. **View Analytics** - Scroll to Charts section for visual insights
6. **Toggle Theme** - Click profile icon → Toggle Light/Dark

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation with theme toggle
│   ├── SummaryCard.jsx # Balance/Income/Expense cards
│   ├── BudgetCard.jsx  # Budget progress rings
│   ├── Charts.jsx      # Data visualization
│   └── ...
├── context/            # Global state management
│   ├── AuthContext.jsx
│   ├── FinanceContext.jsx
│   ├── BudgetContext.jsx
│   └── ThemeContext.jsx
├── pages/              # Route pages
│   ├── Login.jsx
│   └── Dashboard.jsx
├── firebase/           # Firebase configuration
└── App.jsx            # Root component
```

## 🎨 Key Features Explained

### Budget Goals System
Set monthly spending limits per category. Visual progress rings show:
- **Green (0-70%)** - On track ✅
- **Yellow (71-90%)** - Caution 💡
- **Orange (91-99%)** - Almost over ⚠️
- **Red (100%+)** - Over budget 🚨

### Smart Categories
Pre-defined categories ensure consistency:
Food, Transport, Entertainment, Shopping, Bills, Healthcare, Education, Salary, Business, Investment, Other

### Data Persistence
- **Firebase Firestore** - Real-time cloud sync
- **localStorage** - Instant offline access
- **Auto-sync** - Updates sync automatically

## 🔐 Authentication

Uses Firebase Authentication with email/password. User data is isolated per account for privacy.

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Fork the repo and submit a pull request.

---

**Made with ❤️ using React + Firebase**

