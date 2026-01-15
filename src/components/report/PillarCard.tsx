import { Eye, Users, Brain, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ComparisonBar } from "./ComparisonBar";
import type { PillarKey } from "@/data/mockReportData";
import { PILLAR_CONFIG, SCORE_VALUES } from "@/data/mockReportData";
import type { MetricData } from "@/data/mockReportData";
import { calculateGap } from "./GapTag";
import { cn } from "@/lib/utils";

interface PillarCardProps {
  pillar: PillarKey;
  entityMetrics: Record<string, MetricData>;
  benchmarkMetrics: Record<string, MetricData>;
  onClick?: () => void;
}

const iconMap = {
  Eye,
  Users,
  Brain,
  Zap,
};

function calculatePillarScore(metrics: Record<string, MetricData>): number {
  const scores = Object.values(metrics).map(
    (metric) => SCORE_VALUES[metric.score]
  );
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function getPillarStatus(
  entityMetrics: Record<string, MetricData>,
  benchmarkMetrics: Record<string, MetricData>
): { label: string; className: string } {
  const metricKeys = Object.keys(entityMetrics);
  let critical = 0;
  let upgrade = 0;

  metricKeys.forEach((key) => {
    const gap = calculateGap(entityMetrics[key].score, benchmarkMetrics[key].score);
    if (gap === "CRITICAL GAP") critical++;
    else if (gap === "NEEDS UPGRADE") upgrade++;
  });

  const total = metricKeys.length;
  if (critical / total > 0.5) {
    return { label: "Critical", className: "bg-[hsl(var(--gap-critical)/0.1)] text-[hsl(var(--gap-critical))]" };
  }
  if ((critical + upgrade) / total > 0.5) {
    return { label: "Upgrade", className: "bg-[hsl(var(--gap-upgrade)/0.1)] text-[hsl(var(--gap-upgrade))]" };
  }
  return { label: "Strong", className: "bg-[hsl(var(--gap-best)/0.1)] text-[hsl(var(--gap-best))]" };
}

export function PillarCard({
  pillar,
  entityMetrics,
  benchmarkMetrics,
  onClick,
}: PillarCardProps) {
  const config = PILLAR_CONFIG[pillar];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  const entityScore = calculatePillarScore(entityMetrics);
  const benchmarkScore = calculatePillarScore(benchmarkMetrics);
  const status = getPillarStatus(entityMetrics, benchmarkMetrics);

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow border border-border/50"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground">{config.label}</h3>
        </div>
        <span className={cn("px-2 py-0.5 text-xs font-medium rounded-md", status.className)}>
          {status.label}
        </span>
      </div>
      
      <ComparisonBar
        entityValue={entityScore}
        benchmarkValue={benchmarkScore}
        height="sm"
      />
    </Card>
  );
}
