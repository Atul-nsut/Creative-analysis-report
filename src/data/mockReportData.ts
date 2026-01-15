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
        color_consistency: {
          score: "Medium",
          values: { "Brand Colors": 45, "Off-Brand": 35, "Neutral": 20 },
          comment: "Color palette shows inconsistency across campaigns. Brand colors appear in less than 50% of creative assets, diluting brand recognition.",
          actions_next_steps_recommendations: "Establish a strict color guide with primary, secondary, and accent colors. Audit all existing creatives and update to comply with brand standards. Implement automated color checking in the design review process.",
        },
        visual_hierarchy: {
          score: "Low",
          values: { "Clear Hierarchy": 20, "Moderate": 40, "Unclear": 40 },
          comment: "Visual hierarchy is frequently unclear, making it difficult for viewers to identify key messages and CTAs quickly.",
          actions_next_steps_recommendations: "Redesign templates with clear focal points. Use size, contrast, and positioning to guide viewer attention. A/B test hierarchy variations to identify optimal layouts.",
        },
        image_quality: {
          score: "High",
          values: { "Professional": 70, "Stock": 20, "Low Quality": 10 },
          comment: "Image quality is generally strong with professional photography dominating the creative mix.",
          actions_next_steps_recommendations: "Maintain current quality standards. Consider expanding custom photography library. Phase out remaining stock imagery where possible.",
        },
        typography_readability: {
          score: "Medium",
          values: { "Excellent": 30, "Good": 45, "Poor": 25 },
          comment: "Typography choices are inconsistent, with some creatives using fonts that reduce readability on mobile devices.",
          actions_next_steps_recommendations: "Standardize on 2-3 brand fonts with clear use cases. Increase minimum font sizes for mobile. Test readability across device types before launch.",
        },
      },
      A_audience_resonance: {
        emotional_appeal: {
          score: "Low",
          values: { "High Emotion": 15, "Moderate": 35, "Low Emotion": 50 },
          comment: "Creatives lack emotional triggers that drive engagement. Most assets rely on rational messaging without emotional hooks.",
          actions_next_steps_recommendations: "Incorporate storytelling elements into creative briefs. Use customer testimonials and real scenarios. Test emotional vs rational messaging variants.",
        },
        relevance_targeting: {
          score: "Medium",
          values: { "Highly Relevant": 40, "Somewhat": 35, "Generic": 25 },
          comment: "Targeting shows moderate alignment with audience segments but lacks personalization depth.",
          actions_next_steps_recommendations: "Implement dynamic creative optimization. Create segment-specific messaging variants. Use behavioral data to inform creative direction.",
        },
        cultural_alignment: {
          score: "High",
          values: { "Strong": 65, "Moderate": 25, "Weak": 10 },
          comment: "Cultural references and language show strong alignment with target demographics.",
          actions_next_steps_recommendations: "Continue cultural research initiatives. Expand localization efforts for new markets. Monitor cultural trends for creative opportunities.",
        },
      },
      L_logic_and_clarity: {
        message_clarity: {
          score: "Medium",
          values: { "Crystal Clear": 35, "Somewhat Clear": 40, "Confusing": 25 },
          comment: "Core messages are often buried under secondary information, reducing immediate comprehension.",
          actions_next_steps_recommendations: "Lead with single key message per creative. Remove competing messages. Use the 3-second test for headline clarity.",
        },
        value_proposition: {
          score: "Low",
          values: { "Compelling": 20, "Average": 45, "Weak": 35 },
          comment: "Value propositions fail to differentiate from competitors and lack specificity.",
          actions_next_steps_recommendations: "Conduct competitive messaging audit. Develop unique selling propositions per product line. Quantify benefits wherever possible.",
        },
        logical_flow: {
          score: "Medium",
          values: { "Seamless": 40, "Adequate": 35, "Disjointed": 25 },
          comment: "Creative sequences show adequate logical flow but miss opportunities for narrative cohesion.",
          actions_next_steps_recommendations: "Map customer journey to creative sequence. Ensure each touchpoint builds on previous. Create connected story arcs across campaigns.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: { "Strong CTA": 15, "Moderate": 40, "Weak/None": 45 },
          comment: "Call-to-action elements are frequently weak or missing entirely, leading to poor conversion rates.",
          actions_next_steps_recommendations: "Add explicit CTAs to all creatives. Use action-oriented language. Test CTA placement, size, and color variations. Implement urgency triggers.",
        },
        trust_signals: {
          score: "Medium",
          values: { "Multiple": 30, "Single": 45, "None": 25 },
          comment: "Trust signals are present but underutilized. Social proof and credibility markers need emphasis.",
          actions_next_steps_recommendations: "Integrate ratings, reviews, and testimonials prominently. Add security badges where relevant. Feature media mentions and awards.",
        },
        mobile_optimization: {
          score: "High",
          values: { "Optimized": 75, "Partial": 20, "Desktop Only": 5 },
          comment: "Strong mobile optimization across most creatives with appropriate sizing and touch targets.",
          actions_next_steps_recommendations: "Maintain mobile-first approach. Continue testing across device types. Optimize for emerging mobile formats.",
        },
        landing_alignment: {
          score: "Low",
          values: { "Perfect Match": 20, "Partial": 35, "Mismatch": 45 },
          comment: "Significant disconnect between ad creatives and landing page experiences causes drop-off.",
          actions_next_steps_recommendations: "Audit all ad-to-landing combinations. Create dedicated landing pages for key campaigns. Ensure visual and message continuity.",
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
        color_consistency: {
          score: "V High",
          values: { "Brand Colors": 85, "Off-Brand": 10, "Neutral": 5 },
          comment: "Industry leaders maintain 85%+ brand color consistency across all touchpoints, creating instant recognition.",
          actions_next_steps_recommendations: "Best-in-class brands use automated brand compliance tools. They audit quarterly and maintain living style guides accessible to all teams.",
        },
        visual_hierarchy: {
          score: "High",
          values: { "Clear Hierarchy": 75, "Moderate": 20, "Unclear": 5 },
          comment: "Top performers achieve clear visual hierarchy in 75%+ of creatives through systematic design frameworks.",
          actions_next_steps_recommendations: "Leading brands use modular design systems with predefined hierarchy templates. They conduct eye-tracking studies to validate attention flow.",
        },
        image_quality: {
          score: "V High",
          values: { "Professional": 90, "Stock": 8, "Low Quality": 2 },
          comment: "Best performers use 90%+ professional, custom imagery with consistent art direction.",
          actions_next_steps_recommendations: "Top brands invest in dedicated creative studios and maintain extensive asset libraries. They use AI-powered image quality scoring.",
        },
        typography_readability: {
          score: "High",
          values: { "Excellent": 70, "Good": 25, "Poor": 5 },
          comment: "Industry leaders achieve excellent readability through strict typographic standards and device-specific optimization.",
          actions_next_steps_recommendations: "Best practices include minimum 16px body text, limited font families, and mandatory mobile preview approvals.",
        },
      },
      A_audience_resonance: {
        emotional_appeal: {
          score: "High",
          values: { "High Emotion": 65, "Moderate": 30, "Low Emotion": 5 },
          comment: "Top performers create emotionally resonant content in 65%+ of creatives through strategic storytelling.",
          actions_next_steps_recommendations: "Leading brands use emotional mapping frameworks and customer insight sessions to inform creative development.",
        },
        relevance_targeting: {
          score: "V High",
          values: { "Highly Relevant": 80, "Somewhat": 15, "Generic": 5 },
          comment: "Best-in-class achieves 80%+ highly relevant targeting through advanced personalization.",
          actions_next_steps_recommendations: "Top performers use DCO platforms, first-party data integration, and real-time personalization engines.",
        },
        cultural_alignment: {
          score: "V High",
          values: { "Strong": 85, "Moderate": 12, "Weak": 3 },
          comment: "Industry leaders show 85%+ cultural alignment through dedicated cultural research teams.",
          actions_next_steps_recommendations: "Best practices include cultural advisory boards, regional creative teams, and continuous social listening.",
        },
      },
      L_logic_and_clarity: {
        message_clarity: {
          score: "V High",
          values: { "Crystal Clear": 80, "Somewhat Clear": 18, "Confusing": 2 },
          comment: "Top performers achieve crystal clear messaging in 80%+ of creatives through rigorous testing.",
          actions_next_steps_recommendations: "Industry leaders use message testing panels, 5-second comprehension tests, and iterative refinement processes.",
        },
        value_proposition: {
          score: "High",
          values: { "Compelling": 70, "Average": 25, "Weak": 5 },
          comment: "Best-in-class brands present compelling value propositions in 70%+ of creatives.",
          actions_next_steps_recommendations: "Leading brands conduct regular competitive analysis, customer interviews, and value proposition workshops.",
        },
        logical_flow: {
          score: "High",
          values: { "Seamless": 72, "Adequate": 23, "Disjointed": 5 },
          comment: "Top performers create seamless logical flow in over 70% of creative sequences.",
          actions_next_steps_recommendations: "Best practices include journey mapping, sequential messaging frameworks, and cross-channel narrative planning.",
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "V High",
          values: { "Strong CTA": 85, "Moderate": 12, "Weak/None": 3 },
          comment: "Industry leaders include strong CTAs in 85%+ of creatives with proven conversion impact.",
          actions_next_steps_recommendations: "Best-in-class uses CTA testing matrices, placement optimization, and urgency frameworks. Every creative has a primary action.",
        },
        trust_signals: {
          score: "High",
          values: { "Multiple": 70, "Single": 25, "None": 5 },
          comment: "Top performers integrate multiple trust signals in 70%+ of conversion-focused creatives.",
          actions_next_steps_recommendations: "Leading brands maintain trust signal libraries, rotate social proof, and A/B test credibility elements.",
        },
        mobile_optimization: {
          score: "V High",
          values: { "Optimized": 92, "Partial": 7, "Desktop Only": 1 },
          comment: "Best-in-class achieves 92%+ full mobile optimization with device-specific creative variants.",
          actions_next_steps_recommendations: "Top performers use mobile-first design processes, automated responsive testing, and device-specific QA protocols.",
        },
        landing_alignment: {
          score: "High",
          values: { "Perfect Match": 75, "Partial": 20, "Mismatch": 5 },
          comment: "Industry leaders achieve 75%+ perfect ad-to-landing alignment through integrated workflows.",
          actions_next_steps_recommendations: "Best practices include modular landing page systems, message match audits, and cross-team creative reviews.",
        },
      },
    },
  },
];
