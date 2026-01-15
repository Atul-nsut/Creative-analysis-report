import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreChip } from "./ScoreChip";
import { PillarBadge } from "./PillarBadge";
import type { MetricData, PillarKey } from "@/data/mockReportData";
import { cn } from "@/lib/utils";

interface ActionPlanCardProps {
  metricKey: string;
  pillar: PillarKey;
  entityData: MetricData;
  benchmarkData: MetricData;
  impact: "High" | "Medium";
}

function formatMetricName(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getActionTitle(metricKey: string): string {
  const actions: Record<string, string> = {
    cta_strength: "Add explicit CTAs to all creatives",
    visual_hierarchy: "Redesign templates with clear focal points",
    value_proposition: "Develop compelling value propositions",
    emotional_appeal: "Incorporate emotional storytelling elements",
    landing_alignment: "Create dedicated landing pages for campaigns",
    color_consistency: "Establish strict brand color guidelines",
    message_clarity: "Lead with single key message per creative",
    trust_signals: "Integrate prominent trust signals",
    typography_readability: "Standardize typography for mobile",
    relevance_targeting: "Implement dynamic creative optimization",
  };
  return actions[metricKey] || `Improve ${formatMetricName(metricKey)}`;
}

function getEffort(metricKey: string): "Low" | "Medium" | "High" {
  const lowEffort = ["cta_strength", "trust_signals"];
  const highEffort = ["visual_hierarchy", "landing_alignment"];
  if (lowEffort.includes(metricKey)) return "Low";
  if (highEffort.includes(metricKey)) return "High";
  return "Medium";
}

export function ActionPlanCard({
  metricKey,
  pillar,
  entityData,
  benchmarkData,
  impact,
}: ActionPlanCardProps) {
  const [isPlanned, setIsPlanned] = useState(false);
  const effort = getEffort(metricKey);

  const firstRecommendation = entityData.actions_next_steps_recommendations
    .split(".")
    .slice(0, 2)
    .join(".") + ".";

  const evidenceSummary = Object.entries(entityData.values)
    .slice(0, 2)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  return (
    <Card className={cn(
      "p-4 border transition-all",
      isPlanned 
        ? "border-[hsl(var(--score-vhigh)/0.5)] bg-[hsl(var(--score-vhigh)/0.02)]" 
        : "border-border/50"
    )}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="font-semibold text-foreground mb-1">
            {getActionTitle(metricKey)}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <PillarBadge pillar={pillar} size="sm" />
            <span className={cn(
              "px-2 py-0.5 text-xs font-medium rounded-md",
              impact === "High" 
                ? "bg-[hsl(var(--gap-critical)/0.1)] text-[hsl(var(--gap-critical))]"
                : "bg-[hsl(var(--gap-upgrade)/0.1)] text-[hsl(var(--gap-upgrade))]"
            )}>
              {impact} Impact
            </span>
            <span className="px-2 py-0.5 text-xs font-medium rounded-md bg-muted text-muted-foreground">
              {effort} Effort
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreChip score={entityData.score} size="sm" />
          <span className="text-muted-foreground">→</span>
          <ScoreChip score={benchmarkData.score} size="sm" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-0.5">
            Current Evidence
          </p>
          <p className="text-sm text-foreground line-clamp-2">
            {evidenceSummary}. {entityData.comment.split(".")[0]}.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-0.5">
            Recommended Fix
          </p>
          <p className="text-sm text-foreground line-clamp-2">
            {firstRecommendation}
          </p>
        </div>
      </div>

      <Button
        variant={isPlanned ? "secondary" : "outline"}
        size="sm"
        onClick={() => setIsPlanned(!isPlanned)}
        className="w-full"
      >
        {isPlanned ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-1.5 text-[hsl(var(--score-vhigh))]" />
            Planned
          </>
        ) : (
          <>
            <Circle className="h-4 w-4 mr-1.5" />
            Mark as Planned
          </>
        )}
      </Button>
    </Card>
  );
}
