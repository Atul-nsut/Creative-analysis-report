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

// Entity Report (Report A) - Your Brand
export const entityReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "Medium",
          values: {
            "Product-based": 15,
            "UGC-focused": 45,
            "Hybrid variations": 10,
            "Disruptor": 2
          },
          comment: "Creatives favor UGC-native and product demo stop styles, offering high effectiveness due to relatable authenticity and demonstrative nature.",
          actions_next_steps_recommendations: "Maintain UGC-native and product demo styles for strong engagement. Experiment with more product-based thumb stops to showcase product benefits directly. Consider adding disruptor elements sparingly to break pattern blindness.",
        },
        visual_weight: {
          score: "Medium",
          values: {
            "Light": 37,
            "Medium": 31,
            "Dense": 9
          },
          comment: "Light visual weight in creatives aids quick scanning and higher engagement; dense visuals lower engagement.",
          actions_next_steps_recommendations: "Prioritize light visual weight layouts for optimal comprehension and retention. Reduce dense visual executions and test minimal layouts for single-claim messages.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "Medium",
          values: {
            "Demo/Curiosity": 10,
            "Problem-focused": 38,
            "Benefit/Celebrity": 3,
            "Before after": 18,
            "Relatable": 1
          },
          comment: "Problem-focused and before-after hooks dominate, capturing attention; curiosity hooks perform well too.",
          actions_next_steps_recommendations: "Test and optimize problem-solution and before-after hooks; cautiously use curiosity in support. Expand demo-based hooks to showcase product effectiveness directly.",
        },
        persona_alignment: {
          score: "Medium",
          values: {
            "Skincare and health conscious": 15,
            "Hair-focused": 15,
            "General skincare/hair concerns": 35,
            "Other": 10
          },
          comment: "Precise targeting for young adults with skin or hair concerns yields high relevance.",
          actions_next_steps_recommendations: "Continue targeting niche personas aligned with skin or hair demographics for strong connection and relevance. Reduce 'Other' bucket by defining clearer persona segments in creative briefs.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "High",
          values: {
            "How-it-works": 12,
            "Problem-solution": 45,
            "Before-after/Single claim": 18
          },
          comment: "Problem-solution and before-after messaging delivers clarity and engagement, aiding logical flow.",
          actions_next_steps_recommendations: "Maintain clear messaging styles for conveying benefits and transformations. Expand how-it-works content to educate users on product mechanisms and build trust.",
        },
        offer_clarity: {
          score: "Medium",
          values: {
            "None/Vague": 64,
            "Clarity on Price/Discount": 12
          },
          comment: "Low offer clarity due to lack of price or deal info hinders purchase incentives.",
          actions_next_steps_recommendations: "Introduce clear offer info for better conversion potential and reduced friction. Convert vague offers into explicit discount percentages, bundle deals, or price callouts.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "High",
          values: {
            "None/Soft": 17,
            "Direct": 52,
            "Strong": 8
          },
          comment: "Absence or softness in CTA affects readiness, but some videos have clear instructions.",
          actions_next_steps_recommendations: "Integrate strong, direct CTAs with prominent placement for improved conversions. Reduce soft CTAs and ensure every creative has explicit action language.",
        },
        trust_level: {
          score: "V High",
          values: {
            "Medium": 11,
            "High": 53,
            "Very High": 13
          },
          comment: "Medium to very high trust through effective use of ingredient callouts and endorsements.",
          actions_next_steps_recommendations: "Leverage strong trust cues and enhance medium trust creatives with validated proof points and testimonials. Continue using ingredient transparency and expert endorsements.",
        },
      },
    },
  },
];

// Benchmark Report (Report B) - Industry Best (Competitor)
export const benchmarkReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "V High",
          values: {
            "UGC-native": 34,
            "Hybrid": 5,
            "Product demo": 14,
            "Hybrid(Editorial, Brand-led)": 1,
            "Brand-led": 2,
            "Editorial": 1,
            "Hybrid(UGC-native, Product demo)": 9,
            "Other": 6
          },
          comment: "Creatives emphasize UGC-native and hybrid styles with product demos, reflecting strong engagement and high scores for visual clarity and polished presentation.",
          actions_next_steps_recommendations: "Maintain UGC-native styles for authenticity; experiment with product demo and hybrid forms for sustained attention.",
        },
        visual_weight: {
          score: "Medium",
          values: {
            "Minimal": 2,
            "Light": 64,
            "Medium": 5
          },
          comment: "Visuals mostly maintain medium weight, accommodating multiple products. Minimal to light layouts enhance readability, while dense visuals impede scanning.",
          actions_next_steps_recommendations: "Streamline visuals to improve scan ease. Test light layouts for readability, especially on mobile.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Problem": 24,
            "Question": 5,
            "Hybrid(Curiosity, Demo)": 2,
            "Curiosity": 11,
            "Demo": 9,
            "Benefit": 7,
            "Other hooks": 11
          },
          comment: "Hooks effectively capture attention with problem-focused openings and curiosity-driven questions, receiving high scores.",
          actions_next_steps_recommendations: "Expand problem-led and curiosity hooks. Integrate hybrid hooks for stronger engagement.",
        },
        persona_alignment: {
          score: "V High",
          values: {
            "Skincare-conscious young women": 15,
            "Young female skincare enthusiast": 6,
            "Oily skin women": 7,
            "Health-conscious young women": 7,
            "Young Indian women": 2,
            "Other skincare-interested females": 28
          },
          comment: "Targeted creatives resonate with skincare-conscious young women, enhancing relevance with specific concerns.",
          actions_next_steps_recommendations: "Refine targeting with clear demographic cues and skin concerns. Explore niche persona segments to broaden reach.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "Problem-solution": 27,
            "How-it-works": 26,
            "Feature-led": 6,
            "Other message styles": 12
          },
          comment: "Messaging effectively communicates benefits with problem-solution and how-it-works styles, securing high scores.",
          actions_next_steps_recommendations: "Focus on problem-solution and narrative messaging. Integrate before-after visuals and feature-led elements for depth and clarity.",
        },
        offer_clarity: {
          score: "Low",
          values: {
            "None": 71
          },
          comment: "Offer clarity remains low, impacted by the absence of explicit terms in most creatives.",
          actions_next_steps_recommendations: "Introduce explicit offers like pricing or trials to enhance clarity and conversion. Test timing and presentation of offers.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "Direct": 6,
            "None": 44,
            "Soft": 21
          },
          comment: "Lack of strong CTAs lowers scores. Direct CTAs show potential when present.",
          actions_next_steps_recommendations: "Embed clear CTAs with strong language. Test CTAs by persona or channel for enhanced conversions.",
        },
        trust_level: {
          score: "High",
          values: {
            "High": 39,
            "Medium": 27,
            "Low": 3,
            "Very high": 2
          },
          comment: "Trust is built through testimonials and scientific claims but varies by creative execution.",
          actions_next_steps_recommendations: "Scale strong trust signals like certifications and testimonials. Strengthen brand-led creatives with explicit endorsements.",
        },
      },
    },
  },
];
