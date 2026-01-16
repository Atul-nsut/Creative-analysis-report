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
  A_audience_resonance: { label: "Audience", icon: "Users" },
  L_logic_and_clarity: { label: "Logic", icon: "Brain" },
  E_execution_and_action: { label: "Execution", icon: "Zap" },
} as const;

export type PillarKey = keyof typeof PILLAR_CONFIG;

export const SCORE_VALUES: Record<string, number> = {
  "Low": 25,
  "Medium": 55,
  "High": 80,
  "V High": 95,
};

export const SCORE_ORDER = ["Low", "Medium", "High", "V High"];

// Entity Report (Report A) - The analyzed brand
export const entityReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        stop_style: {
          score: "V High",
          values: {
            "Product demo": 1,
            "Promo-led": 0,
            "Brand/Editorial": 10,
            "Hybrid/Neutral/Other": 6
          },
          comment: "Most creatives prominently employ an Editorial or Hybrid stop style emphasizing clean, polished layouts and a magazine-like aesthetic, reflecting a strong visual brand identity. A subset effectively uses Meme or Disruptor styles to inject humor or disruptiveness, scored very highly, enhancing engagement.",
          actions_next_steps_recommendations: "Maintain and scale the Editorial and Hybrid stop styles due to their proven high engagement and brand clarity. Test increasing the use of Meme or Disruptor styles in select creatives to diversify appeal and capture attention through humor or edginess.",
        },
        visual_weight: {
          score: "High",
          values: {
            "Light": 12,
            "Minimal": 1,
            "Medium": 3
          },
          comment: "Visual weight across creatives consistently trends light, with ample white space and limited elements to enable quick scanning and reduce clutter. Some creatives use Medium weight to balance multiple elements but retain clarity.",
          actions_next_steps_recommendations: "Continue prioritizing light visual weight for ease of scanning and focus. Optimize Medium visual weights by improving hierarchy and spacing to avoid scan fatigue while maintaining rich content.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Hybrid (Persona callout, Benefit)": 5,
            "Problem": 2,
            "Benefit": 2,
            "Curiosity": 4,
            "Relatable": 3
          },
          comment: "A dominant pattern reveals Hybrid hook tactics combining persona callouts with benefits or curiosity, scoring very high overall. Curiosity and relatable themes also score highly in driving immediate audience interest. Problem-oriented hooks deliver strong relevance when addressing pain points.",
          actions_next_steps_recommendations: "Prioritize Hybrid hooks that blend clear persona targeting with aspirational or benefit messaging to maximize relevance and appeal. Integrate more curiosity and relatable hooks selectively to boost engagement and differentiate campaigns.",
        },
        persona: {
          score: "V High",
          values: {
            "Fashion-focused women": 15,
            "Comfort/loungewear seekers": 0,
            "Deal/discount seekers": 0,
            "Unknown/Other": 0
          },
          comment: "Nearly all creatives effectively target clear personas, typically professional, stylish women or trend-conscious young adults, with consistently very high resonance scores. This precise persona alignment underpins strong engagement.",
          actions_next_steps_recommendations: "Maintain rigorous persona targeting focusing on professional, stylish women and young trend-driven consumers. Expand persona refinement experiments around adjacent segments to unlock incremental reach while preserving high resonance.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "High",
          values: {
            "Unclear": 0,
            "Announcement/Sale/Event": 5,
            "Feature/How-it-works": 1,
            "Story/Showcase/Other": 6
          },
          comment: "Most creatives use Single claim or Announcement styles with clear, focused messaging, sustaining high engagement. Problem-solution and story-led styles also perform well in conveying context and emotional resonance.",
          actions_next_steps_recommendations: "Sustain use of clear, focused message styles like Single claim and Announcement to maintain clarity. Test enhancing story-led and problem-solution messaging to deepen emotional connection and improve persuasive impact.",
        },
        offer_clarity: {
          score: "Low",
          values: {
            "None": 16
          },
          comment: "A pervasive weakness exists with virtually all creatives scoring low on offer clarity due to absence of visible price, discount, trial, or promotional details, creating a critical gap in value communication.",
          actions_next_steps_recommendations: "Urgently incorporate explicit offer details such as pricing, discounts, or trial terms to strengthen value proposition and conversion potential. Test different formats of offer clarity including overlays and text callouts to identify optimal presentation.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "None": 8,
            "Direct": 5,
            "Soft": 3
          },
          comment: "CTA strength is predominantly low across creatives, with most lacking explicit or strong calls to action, posing a critical conversion bottleneck. Only a few creatives have direct or soft CTAs which still leave room for improvement.",
          actions_next_steps_recommendations: "Immediately embed clear, direct CTAs like 'Shop now' prominently in all creatives to remove ambiguity and guide next steps. Experiment with CTA prominence, language, and placement to maximize click-through and conversion rates.",
        },
        trust_level: {
          score: "Low",
          values: {
            "Medium": 7,
            "Low": 9
          },
          comment: "Trust signals are inconsistently present, mostly low or medium, relying on basic brand name visibility but lacking social proof, reviews, ratings, or certifications, which dampens credibility.",
          actions_next_steps_recommendations: "Introduce explicit trust elements such as customer ratings, testimonials, awards, or guarantees to elevate credibility and reduce purchase hesitation. Prioritize testing trust assets placement and format to optimize impact without clutter.",
        },
      },
    },
  },
];

// Benchmark Report (Report B) - Industry best-in-class
export const benchmarkReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        stop_style: {
          score: "V High",
          values: {
            "Product demo": 4,
            "Promo-led": 21,
            "Brand/Editorial": 19,
            "Hybrid/Neutral/Other": 56
          },
          comment: "Across creatives, a hybrid stop style combining product showcase and promotional offers dominates, frequently achieving very high scores for its appealing blend of editorial polish and promo-led elements.",
          actions_next_steps_recommendations: "Maintain and scale the effective use of hybrid stop styles that balance product visibility with strong promotional messaging to maximize initial audience engagement.",
        },
        visual_weight: {
          score: "High",
          values: {
            "Light": 65,
            "Medium": 26,
            "Minimal": 8,
            "Dense": 1
          },
          comment: "Most creatives employ a light visual weight with few, well-organized elements and clear hierarchy, enabling quick and easy scanning and contributing to high scores.",
          actions_next_steps_recommendations: "Continue prioritizing light visual weight to promote fast comprehension; explore slight complexity only when it enhances storytelling without hindering scan efficiency.",
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Offer": 54,
            "Celebrity": 12,
            "Curiosity": 16,
            "Hybrid(Offer, Persona callout)": 18
          },
          comment: "The majority of creatives leverage a strong offer hook, particularly explicit discount calls prominently placed, with high to very high scores; curiosity and celebrity hooks appear less frequently but score highly when used.",
          actions_next_steps_recommendations: "Focus on strengthening and consistently applying direct offer-based hooks to trigger immediate audience attention; selectively test curiosity hooks for brand engagement and celebrity hooks to elevate aspirational appeal.",
        },
        persona: {
          score: "V High",
          values: {
            "Fashion-focused women": 39,
            "Comfort/loungewear seekers": 7,
            "Deal/discount seekers": 49,
            "Unknown/Other": 5
          },
          comment: "Personas largely center around fashion-conscious, deal-seeking Indian women interested in jewelry, often explicitly noted and scoring high to very high in resonance.",
          actions_next_steps_recommendations: "Continue refining creatives to target fashion-conscious female deal-seekers with culturally relevant and jewelry-focused messaging; consider segmentation tests for subgroups like wedding shoppers or premium buyers to deepen persona connection.",
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "Announcement/Sale/Event": 85,
            "Feature/How-it-works": 4,
            "Story/Showcase/Other": 8,
            "Unclear": 3
          },
          comment: "Most creatives use clear announcement-style messaging focused on sales and events, explicitly framing discounts with very high clarity and effectiveness.",
          actions_next_steps_recommendations: "Maintain the announcement (sale/event) messaging style for clarity and directness; test incorporating benefit-led or hybrid messaging only if they add unique value without diluting offer clarity.",
        },
        offer_clarity: {
          score: "V High",
          values: {
            "Discount": 68,
            "None": 29,
            "Coupon": 3
          },
          comment: "Offer clarity is consistently very high, with explicit discount amounts and promotional codes clearly stated, ensuring logical and transparent value to the audience.",
          actions_next_steps_recommendations: "Preserve explicit discount presentation and coupon code inclusion to sustain clarity; optimize layout to ensure the offer remains immediately visible even in more complex creatives.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "High",
          values: {
            "None": 33,
            "Direct": 59,
            "Soft": 2,
            "Strong": 6
          },
          comment: "A clear divide exists where many creatives lack explicit calls-to-action and score low, while those including direct, prominent 'SHOP NOW' buttons score high or very high.",
          actions_next_steps_recommendations: "Urgently address the widespread gap of missing or weak CTAs by embedding clear, direct, action-oriented buttons in all creatives. Scale testing of CTA placements and labels to maximize conversion potential.",
        },
        trust_level: {
          score: "Medium",
          values: {
            "Medium": 82,
            "Low": 7,
            "High": 11
          },
          comment: "Trust cues predominantly rely on the brand name 'GIVA' and professional product imagery, achieving medium scores; explicit trust signals like testimonials, ratings, or certifications are mostly absent.",
          actions_next_steps_recommendations: "Introduce and test additional trust signals such as customer reviews, quality certifications, or awards to elevate the trust level beyond basic brand presence and improve audience confidence.",
        },
      },
    },
  },
];
