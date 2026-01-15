import { cn } from "@/lib/utils";
import { Eye, Users, Brain, Zap } from "lucide-react";
import type { PillarKey } from "@/data/mockReportData";
import { PILLAR_CONFIG } from "@/data/mockReportData";

interface PillarBadgeProps {
  pillar: PillarKey;
  size?: "sm" | "md";
}

const iconMap = {
  Eye,
  Users,
  Brain,
  Zap,
};

export function PillarBadge({ pillar, size = "sm" }: PillarBadgeProps) {
  const config = PILLAR_CONFIG[pillar];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-md bg-muted text-muted-foreground",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm"
      )}
    >
      <Icon className={cn(size === "sm" ? "h-3 w-3" : "h-4 w-4")} />
      {config.label}
    </span>
  );
}
