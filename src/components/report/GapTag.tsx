import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingUp, Award } from "lucide-react";

export type GapType = "CRITICAL GAP" | "NEEDS UPGRADE" | "BEST-IN-CLASS";

interface GapTagProps {
  gap: GapType;
  size?: "sm" | "md";
}

const gapStyles = {
  "CRITICAL GAP": {
    bg: "bg-[hsl(var(--gap-critical)/0.1)]",
    text: "text-[hsl(var(--gap-critical))]",
    border: "border-[hsl(var(--gap-critical)/0.3)]",
    Icon: AlertTriangle,
  },
  "NEEDS UPGRADE": {
    bg: "bg-[hsl(var(--gap-upgrade)/0.1)]",
    text: "text-[hsl(var(--gap-upgrade))]",
    border: "border-[hsl(var(--gap-upgrade)/0.3)]",
    Icon: TrendingUp,
  },
  "BEST-IN-CLASS": {
    bg: "bg-[hsl(var(--gap-best)/0.1)]",
    text: "text-[hsl(var(--gap-best))]",
    border: "border-[hsl(var(--gap-best)/0.3)]",
    Icon: Award,
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-3 py-1 text-sm gap-1.5",
};

export function GapTag({ gap, size = "md" }: GapTagProps) {
  const style = gapStyles[gap];
  const Icon = style.Icon;
  
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-md border",
        style.bg,
        style.text,
        style.border,
        sizeStyles[size]
      )}
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      {gap}
    </span>
  );
}

export function calculateGap(entityScore: string, benchmarkScore: string): GapType {
  const order = ["Low", "Medium", "High", "V High"];
  const entityIndex = order.indexOf(entityScore);
  const benchmarkIndex = order.indexOf(benchmarkScore);
  const diff = benchmarkIndex - entityIndex;
  
  if (diff >= 2) return "CRITICAL GAP";
  if (diff === 1) return "NEEDS UPGRADE";
  return "BEST-IN-CLASS";
}
