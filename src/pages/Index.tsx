import { useState, useMemo } from "react";
import { FileText, Download, ChevronDown, Eye, Users, Brain, Zap, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScoreChip } from "@/components/report/ScoreChip";
import { PillarCard } from "@/components/report/PillarCard";
import { CriticalGapCard } from "@/components/report/CriticalGapCard";
import { PillarSection } from "@/components/report/PillarSection";
import { ActionPlanCard } from "@/components/report/ActionPlanCard";
import { calculateGap } from "@/components/report/GapTag";
import {
  entityReportJSON,
  benchmarkReportJSON,
  PILLAR_CONFIG,
  SCORE_VALUES,
  type PillarKey,
  type MetricData,
} from "@/data/mockReportData";
import { cn } from "@/lib/utils";

const pillarOrder: PillarKey[] = [
  "V_visual",
  "A_audience_resonance",
  "L_logic_and_clarity",
  "E_execution_and_action",
];

const iconMap = {
  Eye,
  Users,
  Brain,
  Zap,
};

const tagFilters = ["All", "Critical Gaps", "Needs Upgrade", "Best-in-Class"];

function getScoreDistribution(report: typeof entityReportJSON) {
  const counts = { "V High": 0, High: 0, Medium: 0, Low: 0 };
  const summary = report[0].summary;

  pillarOrder.forEach((pillar) => {
    const metrics = summary[pillar];
    Object.values(metrics).forEach((metric) => {
      counts[metric.score]++;
    });
  });

  return counts;
}

function getAllGapMetrics(
  entitySummary: typeof entityReportJSON[0]["summary"],
  benchmarkSummary: typeof benchmarkReportJSON[0]["summary"]
) {
  const gaps: Array<{
    key: string;
    pillar: PillarKey;
    entityData: MetricData;
    benchmarkData: MetricData;
    gap: ReturnType<typeof calculateGap>;
    severity: number;
  }> = [];

  pillarOrder.forEach((pillar) => {
    const entityMetrics = entitySummary[pillar];
    const benchmarkMetrics = benchmarkSummary[pillar];

    Object.keys(entityMetrics).forEach((key) => {
      const gap = calculateGap(entityMetrics[key].score, benchmarkMetrics[key].score);
      const severity =
        gap === "CRITICAL GAP" ? 3 : gap === "NEEDS UPGRADE" ? 2 : 1;
      gaps.push({
        key,
        pillar,
        entityData: entityMetrics[key],
        benchmarkData: benchmarkMetrics[key],
        gap,
        severity,
      });
    });
  });

  return gaps.sort((a, b) => b.severity - a.severity);
}

export default function Index() {
  const [selectedPillar, setSelectedPillar] = useState<PillarKey | "all">("all");
  const [tagFilter, setTagFilter] = useState("All");

  const entitySummary = entityReportJSON[0].summary;
  const benchmarkSummary = benchmarkReportJSON[0].summary;

  const entityDistribution = getScoreDistribution(entityReportJSON);
  const benchmarkDistribution = getScoreDistribution(benchmarkReportJSON);

  const allGaps = useMemo(
    () => getAllGapMetrics(entitySummary, benchmarkSummary),
    [entitySummary, benchmarkSummary]
  );

  const topGaps = allGaps.filter((g) => g.gap !== "BEST-IN-CLASS").slice(0, 3);

  const actionableMetrics = allGaps.filter((g) => g.gap !== "BEST-IN-CLASS");

  const scrollToPillar = (pillar: PillarKey) => {
    setSelectedPillar(pillar);
    const element = document.getElementById(pillar);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Executive Summary
              </h1>
              <p className="text-sm text-muted-foreground">
                Q4 2024 · Creative Analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1.5" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1.5" />
                CSV
              </Button>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Entity Card */}
            <Card className="p-4 border border-border/50">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Primary Entity (Report A)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Your Brand · 14 metrics analyzed
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["V High", "High", "Medium", "Low"] as const).map((score) => (
                  <div key={score} className="flex items-center gap-1.5">
                    <ScoreChip score={score} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      {entityDistribution[score]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Benchmark Card */}
            <Card className="p-4 border border-[hsl(var(--score-vhigh)/0.3)] bg-[hsl(var(--score-vhigh)/0.02)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">
                    Industry Benchmark (Report B)
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Best-in-class · 14 metrics
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["V High", "High", "Medium", "Low"] as const).map((score) => (
                  <div key={score} className="flex items-center gap-1.5">
                    <ScoreChip score={score} size="sm" />
                    <span className="text-xs text-muted-foreground">
                      {benchmarkDistribution[score]}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-[185px] z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Pillar Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-between min-w-[160px]">
                  <span className="flex items-center gap-2">
                    {selectedPillar === "all" ? (
                      <>
                        <Filter className="h-4 w-4" />
                        All Pillars
                      </>
                    ) : (
                      <>
                        {(() => {
                          const Icon =
                            iconMap[
                              PILLAR_CONFIG[selectedPillar].icon as keyof typeof iconMap
                            ];
                          return <Icon className="h-4 w-4" />;
                        })()}
                        {PILLAR_CONFIG[selectedPillar].label}
                      </>
                    )}
                  </span>
                  <ChevronDown className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px] bg-popover">
                <DropdownMenuItem onClick={() => setSelectedPillar("all")}>
                  <Filter className="h-4 w-4 mr-2" />
                  All Pillars
                </DropdownMenuItem>
                {pillarOrder.map((pillar) => {
                  const config = PILLAR_CONFIG[pillar];
                  const Icon = iconMap[config.icon as keyof typeof iconMap];
                  return (
                    <DropdownMenuItem
                      key={pillar}
                      onClick={() => scrollToPillar(pillar)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {config.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tag Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              {tagFilters.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setTagFilter(tag)}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-full transition-colors",
                    tagFilter === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8 space-y-10">
        {/* Critical Performance Gaps */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Critical Performance Gaps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topGaps.map((item) => (
              <CriticalGapCard
                key={`${item.pillar}-${item.key}`}
                metricKey={item.key}
                pillar={item.pillar}
                entityData={item.entityData}
                benchmarkData={item.benchmarkData}
                gap={item.gap}
              />
            ))}
          </div>
        </section>

        {/* Creative Pillars Performance */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Creative Pillars Performance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pillarOrder.map((pillar) => (
              <PillarCard
                key={pillar}
                pillar={pillar}
                entityMetrics={entitySummary[pillar]}
                benchmarkMetrics={benchmarkSummary[pillar]}
                onClick={() => scrollToPillar(pillar)}
              />
            ))}
          </div>
        </section>

        {/* Pillar Sections */}
        <div className="space-y-8">
          {pillarOrder
            .filter(
              (pillar) => selectedPillar === "all" || selectedPillar === pillar
            )
            .map((pillar) => (
              <PillarSection
                key={pillar}
                pillar={pillar}
                entityMetrics={entitySummary[pillar]}
                benchmarkMetrics={benchmarkSummary[pillar]}
                tagFilter={tagFilter}
              />
            ))}
        </div>

        {/* Action Plan */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Action Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {actionableMetrics.map((item) => (
              <ActionPlanCard
                key={`action-${item.pillar}-${item.key}`}
                metricKey={item.key}
                pillar={item.pillar}
                entityData={item.entityData}
                benchmarkData={item.benchmarkData}
                impact={item.gap === "CRITICAL GAP" ? "High" : "Medium"}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container max-w-7xl mx-auto px-4 text-center text-sm text-muted-foreground">
          Creative Benchmark Comparison Report · Generated {new Date().toLocaleDateString()}
        </div>
      </footer>
    </div>
  );
}
