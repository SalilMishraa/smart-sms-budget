import { useState } from "react";
import { Bell, Wallet, TrendingUp, ShoppingBag, Car, Coffee, Users } from "lucide-react";
import MetricCard from "../components/MetricCard";
import BudgetProgress from "../components/BudgetProgress";
import SpendingChart from "../components/SpendingChart";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const [userName] = useState("Priya");
  const [monthlyBudget] = useState(15000);
  const [spentAmount] = useState(8750);

  const remainingBudget = monthlyBudget - spentAmount;
  const spentPercentage = (spentAmount / monthlyBudget) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-6 gradient-hero text-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello, {userName}! 👋</h1>
            <p className="text-white/80 mt-1">Ready to manage your finances?</p>
          </div>
          <button className="p-2 bg-white/20 rounded-xl">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 -mt-8 space-y-6">
        {/* Budget Progress Card */}
        <div className="financial-card bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-8 translate-x-8" />
          <div className="relative">
            <h2 className="text-lg font-semibold text-foreground mb-4">Monthly Budget</h2>
            <BudgetProgress
              remaining={remainingBudget}
              total={monthlyBudget}
              percentage={spentPercentage}
            />
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-3">
          <MetricCard
            title="Spent"
            value={`₹${spentAmount.toLocaleString()}`}
            icon={<Wallet size={20} />}
            bgColor="bg-red-500"
          />
          <MetricCard
            title="Top Category"
            value="Food"
            icon={<Coffee size={20} />}
            bgColor="bg-orange-500"
          />
          <MetricCard
            title="Daily Avg"
            value="₹291"
            icon={<TrendingUp size={20} />}
            bgColor="bg-primary"
          />
        </div>

        {/* Spending Breakdown */}
        <div className="financial-card">
          <h2 className="text-lg font-semibold mb-4">Spending Breakdown</h2>
          <SpendingChart />
        </div>

        {/* Recent Transactions */}
        <div className="financial-card">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;