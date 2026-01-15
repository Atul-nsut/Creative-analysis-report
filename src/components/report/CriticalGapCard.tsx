import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScoreChip } from "./ScoreChip";
import { GapTag, type GapType } from "./GapTag";
import { PillarBadge } from "./PillarBadge";
import type { MetricData, PillarKey } from "@/data/mockReportData";

interface CriticalGapCardProps {
  metricKey: string;
  pillar: PillarKey;
  entityData: MetricData;
  benchmarkData: MetricData;
  gap: GapType;
}

function formatMetricName(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function CriticalGapCard({
  metricKey,
  pillar,
  entityData,
  benchmarkData,
  gap,
}: CriticalGapCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedComment = entityData.comment.split(".")[0] + ".";

  return (
    <Card className="p-4 border border-[hsl(var(--gap-critical)/0.3)] bg-[hsl(var(--gap-critical)/0.02)]">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="font-semibold text-foreground mb-1.5">
            {formatMetricName(metricKey)}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <PillarBadge pillar={pillar} size="sm" />
            <GapTag gap={gap} size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ScoreChip score={entityData.score} size="sm" />
          <span className="text-muted-foreground">→</span>
          <ScoreChip score={benchmarkData.score} size="sm" />
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {isExpanded ? entityData.comment : truncatedComment}
        {entityData.comment.length > truncatedComment.length && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center ml-1 text-primary hover:underline"
          >
            {isExpanded ? (
              <>
                Less <ChevronUp className="h-3 w-3 ml-0.5" />
              </>
            ) : (
              <>
                More <ChevronDown className="h-3 w-3 ml-0.5" />
              </>
            )}
          </button>
        )}
      </div>
    </Card>
  );
}
