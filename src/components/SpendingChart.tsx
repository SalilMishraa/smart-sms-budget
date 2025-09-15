import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const spendingData = [
  { name: "Food & Dining", value: 2800, color: "#F97316" },
  { name: "Transportation", value: 1200, color: "#3B82F6" },
  { name: "Shopping", value: 2400, color: "#8B5CF6" },
  { name: "Entertainment", value: 800, color: "#EC4899" },
  { name: "Bills & Utilities", value: 1550, color: "#10B981" },
];

const SpendingChart = () => {
  const total = spendingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={spendingData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {spendingData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {spendingData.map((category) => (
          <div key={category.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm font-medium">{category.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold">₹{category.value.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground ml-2">
                {Math.round((category.value / total) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;