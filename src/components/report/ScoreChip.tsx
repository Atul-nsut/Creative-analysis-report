import { cn } from "@/lib/utils";

interface ScoreChipProps {
  score: "Low" | "Medium" | "High" | "V High";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const scoreStyles = {
  "V High": "bg-[hsl(var(--score-vhigh))] text-primary-foreground",
  "High": "bg-[hsl(var(--score-high))] text-primary-foreground",
  "Medium": "bg-[hsl(var(--score-medium))] text-primary",
  "Low": "bg-[hsl(var(--score-low))] text-primary-foreground",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function ScoreChip({ score, size = "md", showLabel = true }: ScoreChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap",
        scoreStyles[score],
        sizeStyles[size]
      )}
    >
      {showLabel ? score : null}
    </span>
  );
}
