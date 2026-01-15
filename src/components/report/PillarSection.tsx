import { Eye, Users, Brain, Zap } from "lucide-react";
import { ComparisonBar } from "./ComparisonBar";
import { MetricComparisonCard } from "./MetricComparisonCard";
import { calculateGap } from "./GapTag";
import type { PillarKey, MetricData } from "@/data/mockReportData";
import { PILLAR_CONFIG, SCORE_VALUES } from "@/data/mockReportData";

interface PillarSectionProps {
  pillar: PillarKey;
  entityMetrics: Record<string, MetricData>;
  benchmarkMetrics: Record<string, MetricData>;
  tagFilter: string;
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

export function PillarSection({
  pillar,
  entityMetrics,
  benchmarkMetrics,
  tagFilter,
}: PillarSectionProps) {
  const config = PILLAR_CONFIG[pillar];
  const Icon = iconMap[config.icon as keyof typeof iconMap];
  const entityScore = calculatePillarScore(entityMetrics);
  const benchmarkScore = calculatePillarScore(benchmarkMetrics);

  // Count gaps
  const metricKeys = Object.keys(entityMetrics);
  let criticalCount = 0;
  let upgradeCount = 0;
  let bestCount = 0;

  metricKeys.forEach((key) => {
    const gap = calculateGap(entityMetrics[key].score, benchmarkMetrics[key].score);
    if (gap === "CRITICAL GAP") criticalCount++;
    else if (gap === "NEEDS UPGRADE") upgradeCount++;
    else bestCount++;
  });

  // Filter metrics
  const filteredMetrics = metricKeys.filter((key) => {
    if (tagFilter === "All") return true;
    const gap = calculateGap(entityMetrics[key].score, benchmarkMetrics[key].score);
    if (tagFilter === "Critical Gaps") return gap === "CRITICAL GAP";
    if (tagFilter === "Needs Upgrade") return gap === "NEEDS UPGRADE";
    if (tagFilter === "Best-in-Class") return gap === "BEST-IN-CLASS";
    return true;
  });

  if (filteredMetrics.length === 0) return null;

  return (
    <section id={pillar} className="scroll-mt-32">
      {/* Pillar Header */}
      <div className="mb-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground">{config.label} Pillar</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex-1 min-w-[200px] max-w-[300px]">
              <ComparisonBar
                entityValue={entityScore}
                benchmarkValue={benchmarkScore}
                height="sm"
              />
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-2 py-1 rounded-md bg-[hsl(var(--gap-critical)/0.1)] text-[hsl(var(--gap-critical))] font-medium">
                {criticalCount} Critical
              </span>
              <span className="px-2 py-1 rounded-md bg-[hsl(var(--gap-upgrade)/0.1)] text-[hsl(var(--gap-upgrade))] font-medium">
                {upgradeCount} Upgrade
              </span>
              <span className="px-2 py-1 rounded-md bg-[hsl(var(--gap-best)/0.1)] text-[hsl(var(--gap-best))] font-medium">
                {bestCount} Best
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="space-y-3">
        {filteredMetrics.map((key) => (
          <MetricComparisonCard
            key={key}
            metricKey={key}
            pillar={pillar}
            entityData={entityMetrics[key]}
            benchmarkData={benchmarkMetrics[key]}
          />
        ))}
      </div>
    </section>
  );
}
