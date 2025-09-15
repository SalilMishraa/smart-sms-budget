import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  bgColor: string;
}

const MetricCard = ({ title, value, icon, bgColor }: MetricCardProps) => {
  return (
    <div className="metric-card">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgColor} rounded-xl flex items-center justify-center text-white shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-lg font-bold text-foreground truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;