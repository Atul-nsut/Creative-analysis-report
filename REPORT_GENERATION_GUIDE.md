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
```

---

## Input JSON Structure

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

### IMPORTANT: Do NOT invent categories not present in source data

When consolidating granular values into categories:

1. **Limit to 5-7 categories** per metric for readability
2. **Preserve total counts** - consolidated values should sum correctly
3. **Use matching category names** across both brands for comparison
4. **Group similar items** logically

### Recommended Category Templates

**Thumb Stop Trigger:**
- Brand-led
- Product Demo
- Hybrid Styles
- Promo-led
- Cinematic/Editorial

**Visual Weight:**
- Light
- Medium
- Minimal
- Dense

**Hook Tactic:**
- Benefit-led
- Offer-led
- Demo-led
- Hybrid Tactics
- Curiosity & Question
- Others

**Persona Alignment:**
- [Primary Persona from data] (largest count)
- [Secondary segments based on actual data]
- Group similar personas together
- Keep 5-6 max categories

**Message Style:**
- Announcement
- Single Claim
- Feature-led
- Story-led
- Problem-solution
- How-it-works

**Offer Clarity:**
- Price & Discount
- None
- Demo & Guarantee

**CTA Strength:**
- None
- Direct
- Soft
- Strong

**Trust Level:**
- Very High
- High
- Medium
- Low

---

## Gap Calculation Logic

```
diff = benchmarkIndex - entityIndex

if (diff >= 2) → "CRITICAL GAP"
if (diff === 1) → "NEEDS UPGRADE"
if (diff <= 0 AND entityScore is High/V High) → "BEST-IN-CLASS"
if (diff <= 0 AND entityScore is Low/Medium) → "NEEDS UPGRADE"
```

**Key Rule:** Low-Low or Medium-Medium is NOT "Best-in-Class" - it's "Needs Upgrade"

---

## Files to Update

### 1. `src/data/mockReportData.ts`
- `entityReportJSON` - Your brand data
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
  // ...
];

const entityOptions = [
  "[ENTITY NAME]",
  "[Variant 1]",
  "[Variant 2]",
  "Custom Brand",
];
```

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
- [ ] No references to old brand names (grep search)
- [ ] TypeScript compiles without errors (`npx tsc --noEmit`)
- [ ] Comments/recommendations are industry-relevant

---

## Deployment Commands

```bash
# Type check
npx tsc --noEmit

# Run locally
npm run dev

# Commit
git add . && git commit -m "Update brand comparison: [Entity] vs [Benchmark]"

# Push (auto-deploys via Vercel GitHub integration)
git push

# Manual deploy if needed
vercel --prod
```

---

## Example Transformation

### Input (Maruti - hook tactic):
```json
"hook tactic": {
  "score": "High",
  "values": {
    "Benefit-related": 59,
    "Offer and Demo": 35,
    "Others": 6,
    "Problem": 2,
    "Social proof & Offer": 4,
    "Demo related tactics": 7
  }
}
```

### Output (Consolidated):
```typescript
hook_tactic: {
  score: "High",
  values: {
    "Benefit-led": 59,
    "Offer-led": 35,
    "Demo-led": 7,
    "Social Proof": 4,
    "Problem-led": 2,
    "Others": 6
  },
  comment: "...",
  actions_next_steps_recommendations: "..."
}
```

---

## Common Mistakes to Avoid

1. **Do NOT add "Celebrity" or other categories not in source data**
2. **Do NOT change scores** - keep exactly as provided
3. **Do NOT assume industry context** - use comments from source JSON
4. **Do NOT forget to update all 4 files** with brand names
5. **Ensure matching categories** between both brands for proper comparison
6. **Run sanity check** after changes to verify data accuracy
