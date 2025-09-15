import { useState } from "react";
import { Search, Filter, Coffee, Car, ShoppingBag, Utensils, Gamepad2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: Date;
  type: "debit" | "credit";
  description?: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    merchant: "Swiggy",
    amount: 450,
    category: "food",
    date: new Date("2024-01-15"),
    type: "debit",
    description: "Dinner order",
  },
  {
    id: "2",
    merchant: "Ola",
    amount: 180,
    category: "transport",
    date: new Date("2024-01-15"),
    type: "debit",
    description: "Cab ride home",
  },
  {
    id: "3",
    merchant: "Amazon",
    amount: 1200,
    category: "shopping",
    date: new Date("2024-01-14"),
    type: "debit",
    description: "Electronics purchase",
  },
  {
    id: "4",
    merchant: "Salary Credit",
    amount: 25000,
    category: "income",
    date: new Date("2024-01-14"),
    type: "credit",
    description: "Monthly salary",
  },
  {
    id: "5",
    merchant: "Starbucks",
    amount: 320,
    category: "food",
    date: new Date("2024-01-13"),
    type: "debit",
    description: "Coffee with friends",
  },
];

const categoryIcons = {
  food: Coffee,
  transport: Car,
  shopping: ShoppingBag,
  entertainment: Gamepad2,
  income: Plus,
};

const categoryColors = {
  food: "bg-orange-500",
  transport: "bg-blue-500",
  shopping: "bg-purple-500",
  entertainment: "bg-pink-500",
  income: "bg-green-500",
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions] = useState(mockTransactions);

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || ShoppingBag;
    return IconComponent;
  };

  const getCategoryColor = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 pt-12 pb-6 bg-white border-b border-border">
        <h1 className="text-2xl font-bold mb-4">All Transactions</h1>
        
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
      </header>

      {/* Transactions List */}
      <div className="px-4 py-2">
        {filteredTransactions.map((transaction) => {
          const IconComponent = getCategoryIcon(transaction.category);
          return (
            <div key={transaction.id} className="transaction-item">
              <div className="flex items-center gap-3">
                <div className={`category-icon ${getCategoryColor(transaction.category)}`}>
                  <IconComponent size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{transaction.merchant}</h3>
                  <p className="text-sm text-muted-foreground">
                    {transaction.description} • {transaction.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold text-lg ${
                    transaction.type === "credit" ? "text-success" : "text-foreground"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{transaction.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;