import { Coffee, Car, ShoppingBag, Gamepad2, Utensils } from "lucide-react";

const recentTransactions = [
  {
    id: "1",
    merchant: "Swiggy",
    amount: 450,
    category: "food",
    time: "2 hours ago",
    icon: Coffee,
  },
  {
    id: "2",
    merchant: "Ola",
    amount: 180,
    category: "transport",
    time: "5 hours ago",
    icon: Car,
  },
  {
    id: "3",
    merchant: "Amazon",
    amount: 1200,
    category: "shopping",
    time: "Yesterday",
    icon: ShoppingBag,
  },
  {
    id: "4",
    merchant: "BookMyShow",
    amount: 600,
    category: "entertainment",
    time: "Yesterday",
    icon: Gamepad2,
  },
];

const categoryColors = {
  food: "bg-orange-500",
  transport: "bg-blue-500",
  shopping: "bg-purple-500",
  entertainment: "bg-pink-500",
};

const RecentTransactions = () => {
  return (
    <div className="space-y-3">
      {recentTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${categoryColors[transaction.category as keyof typeof categoryColors]} rounded-xl flex items-center justify-center text-white`}>
              <transaction.icon size={16} />
            </div>
            <div>
              <p className="font-medium text-foreground">{transaction.merchant}</p>
              <p className="text-sm text-muted-foreground">{transaction.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-foreground">₹{transaction.amount}</p>
          </div>
        </div>
      ))}
      
      <button className="w-full text-center py-3 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;