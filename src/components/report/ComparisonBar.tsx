import { cn } from "@/lib/utils";

interface ComparisonBarProps {
  entityValue: number;
  benchmarkValue: number;
  showLabels?: boolean;
  height?: "sm" | "md";
}

export function ComparisonBar({ 
  entityValue, 
  benchmarkValue, 
  showLabels = true,
  height = "md"
}: ComparisonBarProps) {
  return (
    <div className="w-full">
      <div className={cn(
        "relative w-full bg-muted rounded-full overflow-hidden",
        height === "sm" ? "h-2" : "h-3"
      )}>
        {/* Entity bar */}
        <div
          className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-500"
          style={{ width: `${entityValue}%` }}
        />
        {/* Benchmark marker */}
        <div
          className="absolute inset-y-0 w-1 bg-[hsl(var(--score-vhigh))] rounded-full transition-all duration-500"
          style={{ left: `${benchmarkValue}%`, transform: "translateX(-50%)" }}
        />
      </div>
      {showLabels && (
        <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
          <span>Salty: {entityValue}%</span>
          <span className="text-[hsl(var(--score-vhigh))]">Giva: {benchmarkValue}%</span>
        </div>
      )}
    </div>
  );
}
