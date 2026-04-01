# Creative Analysis Report Generation Guide

## Quick Start Prompt

Copy and paste this prompt when starting a new brand comparison:

```
I want to generate a Creative Analysis Report comparing [ENTITY BRAND] vs [BENCHMARK BRAND].

Here is the Entity Brand JSON:
[PASTE ENTITY JSON]

Here is the Benchmark Brand JSON:
[PASTE BENCHMARK JSON]

Please update the report following these rules:
1. Update `src/data/mockReportData.ts` with the new brand data
2. Update brand names in `src/pages/Index.tsx` (selectedEntity, selectedBenchmark, dropdown options)
3. Update brand names in `src/components/report/MetricComparisonCard.tsx`
4. Update brand names in `src/components/report/ComparisonBar.tsx`
5. Consolidate granular values into 5-7 comparable categories per metric
6. Keep all scores exactly as provided in the JSON
7. Do not add data not present in the original JSON
8. Ensure category names match between both brands for proper comparison
9. Update dropdown options to reflect the industry context
10. Run sanity check before committing
```

---

## Input JSON Structure

The system accepts two JSON formats. Transform either format to the internal structure.

### Format 1: Output Array Structure
```json
[
  {
    "output": [
      {
        "Visual": {
          "Thumb Stop Trigger": { "score": "...", "values": {...}, "comment": "...", "actions_next_steps_recommendations": "..." },
          "visual weight": { ... }
        },
        "Audience Alignment": {
          "hook tactic": { ... },
          "Persona Alignment": { ... }
        },
        "Value Translation": {
          "message style": { ... },
          "offer clarity": { ... }
        },
        "Conversion Confidence": {
          "cta strength": { ... },
          "trust level": { ... }
        }
      }
    ]
  }
]
```

### Format 2: Summary Structure
```json
[
  {
    "summary": {
      "V_visual": {
        "stop_style": { ... },
        "visual_weight": { ... }
      },
      "A_audience_resonance": {
        "hook_tactic": { ... },
        "persona": { ... }
      },
      "L_logic_and_clarity": {
        "message_style": { ... },
        "offer_clarity": { ... }
      },
      "E_execution_and_action": {
        "cta_strength": { ... },
        "trust_level": { ... }
      }
    }
  }
]
```

---

## Internal Data Structure (Target Format)

All input must be transformed to this structure in `mockReportData.ts`:

```typescript
{
  summary: {
    V_visual: {
      thumb_stop_trigger: { score, values, comment, actions_next_steps_recommendations },
      visual_weight: { ... }
    },
    A_audience_resonance: {
      hook_tactic: { ... },
      persona_alignment: { ... }
    },
    L_logic_and_clarity: {
      message_style: { ... },
      offer_clarity: { ... }
    },
    E_execution_and_action: {
      cta_strength: { ... },
      trust_level: { ... }
    }
  }
}
```

---

## Metric Key Mapping

| Input Key (Various Formats) | Internal Key |
|----------------------------|--------------|
| Thumb Stop Trigger / stop_style | thumb_stop_trigger |
| visual weight / visual_weight | visual_weight |
| hook tactic / hook_tactic | hook_tactic |
| Persona Alignment / persona | persona_alignment |
| message style / message_style | message_style |
| offer clarity / offer_clarity | offer_clarity |
| cta strength / cta_strength | cta_strength |
| trust level / trust_level | trust_level |

---

## Pillar Mapping

| Input Pillar | Internal Key | Display Label |
|--------------|--------------|---------------|
| Visual | V_visual | Visual |
| Audience Alignment | A_audience_resonance | Audience Alignment |
| Value Translation | L_logic_and_clarity | Value Translation |
| Conversion Confidence | E_execution_and_action | Conversion Confidence |

---

## Score Values

| Score | Numeric Value |
|-------|---------------|
| V High | 95 |
| High | 80 |
| Medium | 55 |
| Low | 25 |

---

## Value Consolidation Rules

### CRITICAL: Do NOT invent categories not present in source data

When consolidating granular values into categories:

1. **Limit to 5-7 categories** per metric for readability
2. **Preserve total counts** - consolidated values should sum correctly
3. **Use matching category names** across both brands for comparison
4. **Group similar items** logically based on the source data
5. **Derive categories from actual data** - read the values and group them sensibly

### Consolidation Process

1. **Read all values** from both brand JSONs for a metric
2. **Identify common themes** across both datasets
3. **Create unified categories** that apply to both brands
4. **Sum related values** into each category
5. **Verify totals match** original data

### Example Consolidation

**Before (granular):**
```json
{
  "Category A variant 1": 15,
  "Category A variant 2": 10,
  "Category B type 1": 20,
  "Category B type 2": 5,
  "Others": 3
}
```

**After (consolidated):**
```json
{
  "Category A": 25,
  "Category B": 25,
  "Others": 3
}
```

---

## Gap Calculation Logic

```
diff = benchmarkIndex - entityIndex

if (diff >= 2) → "CRITICAL GAP"
if (diff === 1) → "NEEDS UPGRADE"
if (diff <= 0 AND entityScore is High/V High) → "BEST-IN-CLASS"
if (diff <= 0 AND entityScore is Low/Medium) → "NEEDS UPGRADE"
```

**Key Rule:** Low-Low or Medium-Medium is NOT "Best-in-Class" - it's "Needs Upgrade" (both brands need improvement)

---

## Files to Update

### 1. `src/data/mockReportData.ts`
- `entityReportJSON` - Your brand data (the brand being analyzed)
- `benchmarkReportJSON` - Competitor/benchmark data

### 2. `src/pages/Index.tsx`
Update these state defaults and options:
```typescript
const [selectedBenchmark, setSelectedBenchmark] = useState("[BENCHMARK NAME]");
const [selectedEntity, setSelectedEntity] = useState("[ENTITY NAME]");

const benchmarkOptions = [
  "[BENCHMARK NAME]",
  "[Industry Option 1]",
  "[Industry Option 2]",
  "[Industry Option 3]",
  "[Industry Option 4]",
];

const entityOptions = [
  "[ENTITY NAME]",
  "[Brand Variant 1]",
  "[Brand Variant 2]",
  "Custom Brand",
];
```

**Note:** Update dropdown options to match the industry context (e.g., Automotive, Skincare, FMCG, etc.)

### 3. `src/components/report/MetricComparisonCard.tsx`
Update hardcoded brand names (4 locations):
- Line ~80: Entity name in header
- Line ~93: Entity commentary label
- Line ~113: Benchmark name in header
- Line ~126, ~135: Benchmark commentary and playbook labels

### 4. `src/components/report/ComparisonBar.tsx`
Update labels (2 locations):
- Line ~35: Entity label
- Line ~36: Benchmark label

---

## Validation Checklist

Before finalizing, verify:

- [ ] All 8 metrics have correct scores matching input JSON
- [ ] No data invented outside source JSON
- [ ] Values consolidated to 5-7 categories per metric
- [ ] Category names match between both brands (for comparison)
- [ ] Brand names updated in all 4 files
- [ ] Dropdown options reflect industry context
- [ ] No references to old brand names (`grep` search)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Comments/recommendations are relevant to the brands

### Sanity Check Commands

```bash
# Search for old brand names (should return no results)
grep -r "OLD_BRAND_NAME" src/

# Type check
npx tsc --noEmit

# Run locally to verify
npm run dev
```

---

## Deployment Commands

```bash
# Commit changes
git add .
git commit -m "Update brand comparison: [Entity] vs [Benchmark]"

# Push (auto-deploys via Vercel GitHub integration)
git push

# Manual deploy if needed
vercel --prod
```

---

## Common Mistakes to Avoid

| Mistake | Correct Approach |
|---------|------------------|
| Adding categories not in source data | Only use categories derived from actual JSON values |
| Changing scores | Keep scores exactly as provided |
| Mismatched category names between brands | Use identical category names for proper comparison |
| Forgetting to update all 4 files | Check all files: mockReportData.ts, Index.tsx, MetricComparisonCard.tsx, ComparisonBar.tsx |
| Not verifying totals | Ensure consolidated values sum to original totals |
| Industry-inappropriate dropdown options | Update options to match the brand's industry |
| Leaving old brand references | Run grep search before committing |

---

## Metric Reference

Each metric should contain:

```typescript
{
  score: "Low" | "Medium" | "High" | "V High",
  values: {
    "Category 1": number,
    "Category 2": number,
    // ... 5-7 categories max
  },
  comment: string,  // Analysis from source JSON
  actions_next_steps_recommendations: string  // Recommendations from source JSON
}
```

### The 8 Required Metrics

1. **thumb_stop_trigger** (V_visual) - What makes users stop scrolling
2. **visual_weight** (V_visual) - Density of visual elements
3. **hook_tactic** (A_audience_resonance) - How attention is captured
4. **persona_alignment** (A_audience_resonance) - Target audience fit
5. **message_style** (L_logic_and_clarity) - How message is communicated
6. **offer_clarity** (L_logic_and_clarity) - Clarity of value proposition
7. **cta_strength** (E_execution_and_action) - Call-to-action effectiveness
8. **trust_level** (E_execution_and_action) - Credibility signals

---

## Summary

1. **Paste both JSONs** with the quick start prompt
2. **Transform data** to internal structure
3. **Consolidate values** into 5-7 matching categories
4. **Update 4 files** with new brand names
5. **Verify** with sanity check
6. **Deploy** via git push
