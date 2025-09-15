interface BudgetProgressProps {
  remaining: number;
  total: number;
  percentage: number;
}

const BudgetProgress = ({ remaining, total, percentage }: BudgetProgressProps) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="mb-4">
          <p className="text-3xl font-bold text-foreground">₹{remaining.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Remaining this month</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Spent</span>
            <span className="font-medium">₹{(total - remaining).toLocaleString()}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      <div className="ml-8">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="hsl(var(--muted))"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="hsl(var(--primary))"
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetProgress;