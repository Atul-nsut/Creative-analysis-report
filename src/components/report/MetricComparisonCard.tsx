import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { ScoreChip } from "./ScoreChip";
import { GapTag, calculateGap, type GapType } from "./GapTag";
import { PillarBadge } from "./PillarBadge";
import { ValuesChart } from "./ValuesChart";
import type { MetricData, PillarKey } from "@/data/mockReportData";

interface MetricComparisonCardProps {
  metricKey: string;
  pillar: PillarKey;
  entityData: MetricData;
  benchmarkData: MetricData;
}

function formatMetricName(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getTakeaway(gap: GapType): string {
  switch (gap) {
    case "CRITICAL GAP":
      return "Close this gap first to unlock conversion impact.";
    case "NEEDS UPGRADE":
      return "Improve this to reach benchmark consistency.";
    case "BEST-IN-CLASS":
      return "Maintain; consider testing small variants.";
  }
}

export function MetricComparisonCard({
  metricKey,
  pillar,
  entityData,
  benchmarkData,
}: MetricComparisonCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const gap = calculateGap(entityData.score, benchmarkData.score);

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3 flex-wrap min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {formatMetricName(metricKey)}
          </h4>
          <PillarBadge pillar={pillar} />
          <GapTag gap={gap} size="sm" />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <ScoreChip score={entityData.score} size="sm" />
            <span className="text-muted-foreground">→</span>
            <ScoreChip score={benchmarkData.score} size="sm" />
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Card Body */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Entity Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Bombay Shaving Company</span>
                <ScoreChip score={entityData.score} size="sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Evidence Distribution
                </p>
                <ValuesChart values={entityData.values} variant="entity" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Bombay Shaving Company Commentary
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {entityData.comment}
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Recommendations
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {entityData.actions_next_steps_recommendations}
                </p>
              </div>
            </div>

            {/* Benchmark Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">Gillette</span>
                <ScoreChip score={benchmarkData.score} size="sm" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Evidence Distribution
                </p>
                <ValuesChart values={benchmarkData.values} variant="benchmark" />
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  Gillette Commentary
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {benchmarkData.comment}
                </p>
              </div>

              <div className="bg-[hsl(var(--score-vhigh)/0.05)] rounded-lg p-3 border border-[hsl(var(--score-vhigh)/0.2)]">
                <p className="text-xs font-medium text-[hsl(var(--score-vhigh))] mb-1">
                  Gillette Playbook
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {benchmarkData.actions_next_steps_recommendations}
                </p>
              </div>
            </div>
          </div>

          {/* Strategist Takeaway */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-primary mb-0.5">
                  Strategist Takeaway
                </p>
                <p className="text-sm text-foreground">{getTakeaway(gap)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
