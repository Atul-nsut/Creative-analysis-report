import { cn } from "@/lib/utils";

interface ValuesChartProps {
  values: Record<string, number>;
  variant?: "entity" | "benchmark";
}

const barColors = [
  "bg-primary",
  "bg-[hsl(var(--chart-1))]",
  "bg-[hsl(var(--chart-2))]",
  "bg-[hsl(var(--chart-3))]",
  "bg-[hsl(var(--chart-4))]",
];

export function ValuesChart({ values, variant = "entity" }: ValuesChartProps) {
  const entries = Object.entries(values);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);
  
  return (
    <div className="space-y-2">
      {/* Stacked bar */}
      <div className="flex h-4 w-full rounded-full overflow-hidden bg-muted">
        {entries.map(([key, value], index) => {
          const percentage = (value / total) * 100;
          return (
            <div
              key={key}
              className={cn(
                "h-full transition-all duration-300",
                barColors[index % barColors.length],
                variant === "benchmark" && "opacity-80"
              )}
              style={{ width: `${percentage}%` }}
              title={`${key}: ${value} (${percentage.toFixed(1)}%)`}
            />
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {entries.map(([key, value], index) => {
          const percentage = ((value / total) * 100).toFixed(0);
          return (
            <div key={key} className="flex items-center gap-1.5 text-xs">
              <div
                className={cn(
                  "w-2.5 h-2.5 rounded-sm",
                  barColors[index % barColors.length]
                )}
              />
              <span className="text-muted-foreground">
                {key}: <span className="text-foreground font-medium">{value}</span>
                <span className="text-muted-foreground/70 ml-1">({percentage}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
