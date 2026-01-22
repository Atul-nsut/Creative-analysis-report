// Mock data following the exact structure specified
export interface MetricData {
  score: "Low" | "Medium" | "High" | "V High";
  values: Record<string, number>;
  comment: string;
  actions_next_steps_recommendations: string;
}

export interface PillarData {
  [metricKey: string]: MetricData;
}

export interface ReportSummary {
  V_visual: PillarData;
  A_audience_resonance: PillarData;
  L_logic_and_clarity: PillarData;
  E_execution_and_action: PillarData;
}

export interface ReportData {
  summary: ReportSummary;
}

export const PILLAR_CONFIG = {
  V_visual: { label: "Visual", icon: "Eye" },
  A_audience_resonance: { label: "Audience Alignment", icon: "Users" },
  L_logic_and_clarity: { label: "Value Translation", icon: "Brain" },
  E_execution_and_action: { label: "Conversion Confidence", icon: "Zap" },
} as const;

export type PillarKey = keyof typeof PILLAR_CONFIG;

export const SCORE_VALUES: Record<string, number> = {
  "Low": 25,
  "Medium": 55,
  "High": 80,
  "V High": 95,
};

export const SCORE_ORDER = ["Low", "Medium", "High", "V High"];

// Entity Report (Report A) - Bombay Shaving Company
export const entityReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "V High",
          values: {
            "Product demo": 63,
            "Hybrid": 25,
            "UGC-native": 17,
            "Promo-led": 16,
            "Meme": 6,
            "Editorial": 5
          },
          comment: "Stop styles are decisively led by Product demo (63), with a strong secondary cluster across Hybrid (19), UGC-native (17), and Promo-led (16). Meme (6) and Editorial (5) exist but remain small. With a V High score, the pattern is clear: product-forward stopping power dominates, with hybrid/promo variants providing meaningful lift and variety.",
          actions_next_steps_recommendations: "Keep Product demo as the default scale lane. Use Hybrid + UGC-native as the controlled variation lane (rotate formats without losing product clarity). Ensure Promo-led executions still anchor on product visibility. Keep Meme/Editorial as small test buckets only—promote them only if they win on outcomes.",
        },
        visual_weight: {
          score: "High",
          values: {
            "Light": 74,
            "Medium": 47,
            "Minimal": 15,
            "Dense": 8
          },
          comment: "Visual weight is concentrated in Light (74) and Medium (47), with Minimal (15) as a smaller lane and Dense (8) as the clear drag. The combined High score aligns with strong scan-ability driven by lighter compositions, while dense layouts remain the primary clarity risk.",
          actions_next_steps_recommendations: "Bias production toward Light and clean Medium layouts. Treat Dense as an exception case and strip elements aggressively when used. Use Minimal intentionally for single-claim executions where speed-to-understanding is the priority.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Demo": 37,
            "Offer-related": 24,
            "Problem": 17,
            "Hybrid": 13,
            "Demo-related": 10,
            "Question": 9,
            "Problem-benefit-curiosity": 8,
            "None": 7
          },
          comment: "Hook tactics are dominated by Demo (37) and Offer-related (24), with Problem (17) and Hybrid (13) forming the next tier. A non-trivial None bucket (7) persists. With a V High score, the strongest openings are those that immediately show the product and/or anchor on clear offer signals.",
          actions_next_steps_recommendations: "Scale Demo + Offer-related as the primary hook lanes. Keep Problem as the supporting lane for relevance framing. Reduce 'None' by enforcing a hook-first rule: every creative must declare its opening tactic. Use Question and curiosity-leaning variants as smaller, deliberate test buckets.",
        },
        persona_alignment: {
          score: "High",
          values: {
            "Men seeking grooming solutions": 23,
            "Deal-/Value-seeking grooming men": 13,
            "Other personas": 12,
            "Grooming-conscious and practical men": 21,
            "Premium grooming interested men": 10
          },
          comment: "Primary persona is unambiguous: Men seeking grooming solutions (20). Secondary scale cluster is Deal-/Value-seeking grooming men (13), Other personas (12), Grooming-conscious and practical men (11), and Premium grooming interested men (10). Smaller tails include Grooming-conscious men (5) and Male grooming enthusiast (5). With a High score, alignment is strong—but the 'Other personas' volume is a clear classification/targeting blur.",
          actions_next_steps_recommendations: "Treat Men seeking grooming solutions as the main scale lane with consistent framing. Split the secondary cluster into two explicit lanes: Deal-/Value-seeking vs Premium grooming, and tailor offer/benefit emphasis accordingly. Reduce 'Other personas' by tightening persona cues so creatives land in explicit buckets instead of a catch-all.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "How-it-works": 44,
            "Announcement": 33,
            "Problem-solution": 19,
            "Feature-led": 15,
            "How-it-works / Problem-solution": 8,
            "Comparison": 4,
            "Unclear": 3,
            "Story-led": 3
          },
          comment: "Message style is led by How-it-works (44) and Announcement (33), with Problem-solution (19) and Feature-led (15) as strong supporting lanes. Unclear remains low (3). The V High score is consistent with this distribution: most creatives are structurally clear and direct in explaining value or stating the deal.",
          actions_next_steps_recommendations: "Keep How-it-works and Announcement as the core production lanes. Use Problem-solution to sharpen relevance where pain points are explicit. Keep Unclear at (near) zero by enforcing single-claim discipline. Use Comparison selectively to clarify differentiation when it increases clarity—not complexity.",
        },
        offer_clarity: {
          score: "Low",
          values: {
            "None": 101,
            "Discount and bundle offers": 22,
            "Price and guarantee related": 8,
            "Bundle": 3,
            "Coupon": 3,
            "Vague": 3,
            "Discount": 2,
            "Guarantee": 1
          },
          comment: "Offer clarity is structurally weak: None overwhelms the set (101), dwarfing Discount and bundle offers (22) and all other explicit offer forms (single digits). The combined Low score is fully explained by the dominance of 'None' and the small footprint of concrete pricing/discount/coupon language.",
          actions_next_steps_recommendations: "Make explicit offer articulation non-negotiable: aggressively convert 'None' into clear Discount/Bundle/Price/Coupon/Guarantee expressions. Eliminate Vague (3) by forcing quantifiable terms (numbers, defined bundles, or explicit guarantee language). Treat explicit offer variants as a scale lane, not an exception.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "None": 135,
            "Direct": 4,
            "Direct and strong CTAs": 3,
            "Soft": 2
          },
          comment: "CTA strength is the biggest execution gap: None dominates (135) with only trace presence of Direct (4), Direct and strong CTAs (3), and Soft (2). The Low score is unavoidable given how consistently CTAs are missing.",
          actions_next_steps_recommendations: "Standardize an explicit CTA in every creative and treat 'None' as a fail state. Prioritize Direct CTAs as default; keep Soft CTAs only as controlled tests. Ensure CTA appears clearly and early enough to be noticed without extra scanning.",
        },
        trust_level: {
          score: "Medium",
          values: {
            "Medium": 113,
            "High": 20,
            "Low": 11
          },
          comment: "Trust sits mostly at Medium (113), with a smaller High pocket (20) and a meaningful Low tail (11). The Medium score reflects a lot of baseline credibility, but insufficient volume of strong proof to consistently push creatives into High.",
          actions_next_steps_recommendations: "Systematically lift Medium into High by standardizing stronger proof modules already implied by the taxonomy (e.g., guarantee/proof cues) and replicating what's present in the High bucket. Eliminate Low by ensuring every creative carries baseline trust elements consistently, not intermittently.",
        },
      },
    },
  },
];

// Benchmark Report (Report B) - Gillette (Industry Best-in-Class)
export const benchmarkReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "V High",
          values: {
            "Hybrid styles combining Product demo, Promo-led and Catalog": 50,
            "Product demo": 56,
            "Promo-led": 34,
            "UGC-native": 9,
            "Hard sell": 4,
            "Before after": 1,
            "Editorial": 1,
            "Disruptor": 1
          },
          comment: "Stop styles are led by Product demo (56), with Promo-led (34) and Hybrid (33) as the next-largest patterns; Hybrid styles combining Product demo, Promo-led and Catalog also has meaningful volume (17). Overall Thumb Stop Trigger remains V High, driven by consistent product visibility and offer-forward framing where present.",
          actions_next_steps_recommendations: "Scale Product demo-led executions while preserving Promo-led and Hybrid formats. Run explicit variants that pair Product demo with UGC-native (9) to retain authenticity while showcasing use. Keep Hard sell limited (4) and treat Disruptor/Editorial/Before after (1 each) as controlled test buckets.",
        },
        visual_weight: {
          score: "Medium",
          values: {
            "Light": 80,
            "Medium": 54,
            "Dense": 11,
            "Minimal": 7
          },
          comment: "Visual weight skews toward Light (80) and Medium (54), with smaller pockets of Dense (11) and Minimal (7). With a Medium score, the set is generally scannable, but the medium/dense share indicates clear headroom to simplify layouts for faster comprehension.",
          actions_next_steps_recommendations: "Bias future builds toward Light visual weight with a single focal point and clear hierarchy. Where Medium/Dense layouts are unavoidable, tighten copy and reduce competing elements to improve scan speed. Use Minimal formats selectively for quick-hit messages where one claim is sufficient.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Offer": 47,
            "Problem": 35,
            "Benefit": 24,
            "Demo": 12,
            "Comparison": 11,
            "Before after": 4,
            "Hybrid(Benefit/Demo)": 4,
            "Relatable": 3,
            "Curiosity": 3,
            "Celebrity": 1,
            "Stat": 1
          },
          comment: "Hook tactics are dominated by Offer (47), followed by Problem (35) and Benefit (24). Demo (12) and Comparison (11) are meaningful supporting tactics, while the rest remain low-volume. Combined hook tactic score stays V High, anchored in value/offer and problem-solution framing.",
          actions_next_steps_recommendations: "Keep Offer as the primary scale lane. Systematically layer Problem or Benefit into Offer-led openers to widen appeal without losing clarity. Use Demo and Comparison as structured variants; keep low-frequency tactics (Relatable 3, Curiosity 3, Celebrity 1, Stat 1) as measured tests.",
        },
        persona_alignment: {
          score: "V High",
          values: {
            "Value-focused male shavers and shoppers": 38,
            "Health and hygiene-conscious individuals": 19,
            "Men seeking deodorant protections and qualities": 16,
            "Young active men grooming enthusiasts": 9,
            "Male French-speaking grooming": 8,
            "value-seeking males": 8,
            "Unknown and other personas": 7,
            "Value-oriented bulk shoppers and deal-seekers": 6,
            "Deal-seeking shavers and razor users": 6,
            "Quality and premium-seeking men": 3
          },
          comment: "Primary persona is 'Value-focused male shavers and shoppers' (38) — the clear scale lane. Secondary cluster is 'Health and hygiene-conscious individuals' (19) and 'Men seeking deodorant protections and qualities' (16). Mid-tier lanes include 'Young active French-speaking men grooming enthusiasts' (9), 'Male French-speaking grooming' (8), and 'French-speaking and Canadian value-seeking males' (8). Long-tail buckets ('Unknown and other personas' 7; 'Value-oriented bulk shoppers and deal-seekers' 6; 'Deal-seeking shavers and razor users' 6; 'Quality and premium-seeking men' 3) are present but not primary. Overall Persona Alignment remains V High.",
          actions_next_steps_recommendations: "Prioritize creative volume and iteration cadence for 'Value-focused male shavers and shoppers'. Create a dedicated test matrix for the two secondary clusters (19 and 16) using existing hook/message patterns already present in the data. Treat the French-speaking personas as a distinct lane with consistent language execution. Reduce reliance on 'Unknown and other personas' by tightening persona definition and labeling in briefs.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "Announcement styles": 43,
            "Problem-solution": 41,
            "Comparison": 19,
            "Single claim": 16,
            "How-it-works": 10,
            "Feature-led": 10,
            "Announcement": 7,
            "Proof and How-it-works style": 3,
            "Proof-led": 2,
            "Before-after": 1
          },
          comment: "Messaging concentrates heavily in 'Announcement styles' (43) and 'Problem-solution' (41), with additional support from 'Comparison' (19) and 'Single claim' (16). 'How-it-works' (10) and 'Feature-led' (10) appear at mid volume, while 'Announcement' (7), 'Proof and How-it-works style' (3), 'Proof-led' (2), and 'Before-after' (1) are minor. Combined message style score stays V High, reflecting consistent use of direct, structured frameworks.",
          actions_next_steps_recommendations: "Keep 'Announcement styles' and 'Problem-solution' as the core messaging templates and standardize repeatable variants for testing. Expand 'Comparison' and 'Single claim' where differentiation or simplicity is needed. When using 'How-it-works' or 'Feature-led', keep visuals light to protect scanability; use proof-led formats only when a clear proof point is available.",
        },
        offer_clarity: {
          score: "V High",
          values: {
            "None": 95,
            "Discount offers": 43,
            "Bundle": 4,
            "Vague": 3,
            "Discount": 2,
            "Cashback": 2,
            "Bonus": 1,
            "Quantity": 1,
            "Bundle offers": 1
          },
          comment: "Offer clarity is uneven: 'None' is the largest bucket (95), indicating many creatives show no explicit offer mechanics, while explicit 'Discount offers' are also frequent (43). Smaller offer types are low-volume (Bundle 4, Discount 2, Vague 3, Cashback 2, Bundle offers 1, Bonus 1, Quantity 1). Combined score remains V High, but the distribution shows a large execution gap driven by the 'None' bucket.",
          actions_next_steps_recommendations: "Make offer presence non-optional by converting a meaningful share of the 95 'None' creatives into explicit offer formats. Prioritize scaling 'Discount offers' and 'Bundle' where already used, and remove 'Vague' offers by forcing concrete terms in creative QA. Keep low-volume offer types (Bonus/Cashback/Quantity) as controlled experiments until performance or volume supports expansion.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "None": 128,
            "Direct": 14,
            "Soft": 6,
            "Strong": 4
          },
          comment: "CTA strength is the clearest conversion weakness: 'None' dominates (128), with limited 'Direct' (14), 'Soft' (6), and 'Strong' (4). With a Low score, the portfolio is consistently under-instrumented for action.",
          actions_next_steps_recommendations: "Mandate an explicit CTA on every creative. Default to 'Direct' CTAs and build a small 'Strong' CTA test set; use 'Soft' CTAs only where direct phrasing underperforms. Standardize CTA placement and visibility to prevent regression back into 'None'.",
        },
        trust_level: {
          score: "High",
          values: {
            "High and Very high": 77,
            "Medium": 45,
            "High or above trust levels": 30
          },
          comment: "Trust is net-positive: 'High and Very high' (77) plus 'High or above trust levels' (30) outweighs 'Medium' (45). Overall trust level stays High, supported by brand presence (Gillette) and, where used, quantified/scientific proof points and endorsements.",
          actions_next_steps_recommendations: "Maintain consistent brand presence and retailer/partner cues (e.g., Walmart where applicable) to protect the high-trust baseline. Increase the share of creatives that include explicit proof points (quantified claims, testing/endorsement cues) to move Medium (45) upward, without adding visual density that would hurt scanability.",
        },
      },
    },
  },
];
