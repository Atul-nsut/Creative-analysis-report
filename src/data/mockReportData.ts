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

// Entity Report (Report A) - Maruti Suzuki Nexa
export const entityReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "High",
          values: {
            "Brand-led": 41,
            "Promo-led": 37,
            "Product Demo": 27,
            "Hybrid Styles": 9,
            "Cinematic": 16
          },
          comment: "Across creatives, hybrid, product demo, promo-led, and cinematic stop styles dominate, reflecting a strategy balancing aspirational messaging with product and offer presentation. Preference for cinematic and hybrid stop styles is evident, leveraging strong production quality and dynamic visual storytelling.",
          actions_next_steps_recommendations: "Maintain and scale the use of hybrid stop styles combining aspirational branding with strong product visuals to maximize engagement. Invest in varied scenic backdrops and product showcases to sustain engagement."
        },
        visual_weight: {
          score: "High",
          values: {
            "Light": 83,
            "Medium": 18,
            "Minimal": 13,
            "Dense": 1
          },
          comment: "Most creatives employ light or minimal visual weight, enabling clear focal points and efficient scan ability, while medium density is present where multiple elements coexist but remain manageable.",
          actions_next_steps_recommendations: "Optimize visual weight by maintaining light to minimal styling for clarity and scan speed; where medium visual weight is necessary, optimize text hierarchy and reduce clutter to prevent scanning difficulty."
        },
      },
      A_audience_resonance: {
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
          comment: "Offers and benefits dominate in hook tactics, with high engagement from offer-driven creatives and aspirational messaging. Problem and demo hooks perform strongly, especially when combined with offers.",
          actions_next_steps_recommendations: "Test amplifying offer-based hooks with clear benefit messaging to optimize audience resonance. Scale hook tactics integrating clear offers or product demos; blend problem and offer hooks to elevate engagement."
        },
        persona_alignment: {
          score: "High",
          values: {
            "Indian Car Buyers": 36,
            "Aspirational Buyers": 26,
            "Value-conscious Buyers": 13,
            "SUV & Adventure Seekers": 8,
            "Tech-savvy Seekers": 5
          },
          comment: "Personas targeted include Indian car buyers, aspirational, value-conscious, urban, and EV-focused consumers. Alignment is strong with adventurous, affluent, and tech-savvy Indian SUV buyers.",
          actions_next_steps_recommendations: "Continue refining messaging for these well-defined personas, incorporating localized cultural cues. Introduce broader segmentation tests engaging urban professionals and value-conscious EV buyers to diversify reach."
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "Announcement": 91,
            "Feature-led": 11,
            "Story-led": 11,
            "Problem-solution": 2
          },
          comment: "A prevalent message style is the single claim or announcement to ensure clarity. Most creatives adopt announcement or story-led styles, effectively framing product launches or narratives.",
          actions_next_steps_recommendations: "Maintain clear, single-claim message styles, test minor narrative variations to enhance engagement, and develop problem-solution messaging styles for product benefits and launches."
        },
        offer_clarity: {
          score: "V High",
          values: {
            "Price & Discount": 76,
            "None": 34,
            "Demo & Guarantee": 5
          },
          comment: "Most creatives present high clarity on price and discount offers, though low clarity persists where no explicit offers are visible. Creatives with explicit pricing score very high.",
          actions_next_steps_recommendations: "Address low offer clarity by incorporating explicit, prominent value propositions like prices, discounts, or guarantees. Standardize offer visibility across all creatives for enhanced conversion potential."
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "None": 87,
            "Direct": 15,
            "Soft": 12,
            "Strong": 1
          },
          comment: "A gap exists with many creatives lacking explicit CTAs, resulting in low conversion potential. Most creatives lack compelling directive CTAs.",
          actions_next_steps_recommendations: "Introduce strong, clear CTAs like 'Book Test Drive', prominently guiding users to actions. Test variations in wording, placement, and design for conversion uplift."
        },
        trust_level: {
          score: "Medium",
          values: {
            "Medium": 90,
            "High": 13,
            "Very High": 6,
            "Low": 6
          },
          comment: "Trust levels hover around medium, relying on brand logos and some assurances. There's a lack of explicit proof points like testimonials or ratings, limiting perceived credibility.",
          actions_next_steps_recommendations: "Enhance trust by integrating customer testimonials, awards, or ratings. Leverage brand heritage and supplement with explicit credibility signals to elevate user confidence."
        },
      },
    },
  },
];

// Benchmark Report (Report B) - Hyundai
export const benchmarkReportJSON: ReportData[] = [
  {
    summary: {
      V_visual: {
        thumb_stop_trigger: {
          score: "V High",
          values: {
            "Brand-led": 82,
            "Product Demo": 37,
            "Hybrid Styles": 14,
            "Promo-led": 2,
            "Editorial": 7
          },
          comment: "Brand-led and Product demo stop styles dominate across image and video creatives, frequently combined as hybrids to balance product visibility with aspirational brand storytelling. Video creatives rely exclusively on Brand-led stops anchored by celebrity presence and emotional messaging, while image creatives diversify with product demo and hybrid approaches.",
          actions_next_steps_recommendations: "Maintain and scale the Brand-led stop style leveraging celebrity and brand initiatives. Continue combining product demonstration with aspirational brand themes in image creatives. Explore additional brand storytelling elements to deepen engagement without diluting aspirational messaging."
        },
        visual_weight: {
          score: "High",
          values: {
            "Light": 104,
            "Medium": 19,
            "Dense": 9,
            "Minimal": 8
          },
          comment: "Light visual weight dominates across both formats, facilitating quick and effortless scanning with high scores. Image creatives rated 'Dense' with multiple text blocks and visuals increase scanning effort and lower scores, while video creatives consistently maintain light visual weight with clean backgrounds.",
          actions_next_steps_recommendations: "Prioritize light visual weight across all creatives to support strong stop style effectiveness. Reduce text density and clarify hierarchy in image creatives. Test subtle variations in visual density to gauge impact on engagement while preserving clarity and focus."
        },
      },
      A_audience_resonance: {
        hook_tactic: {
          score: "V High",
          values: {
            "Hybrid Tactics": 21,
            "Demo-led": 19,
            "Offer-led": 17,
            "Curiosity & Question": 5,
            "Benefit-led": 4,
            "Stat & Authority": 3
          },
          comment: "Hook tactics effectively employ direct and hybrid approaches such as Offer, Demo, and Benefit, with particular strength in offer-driven hooks featuring clear pricing and product announcements. Hybrid combinations of offer and demo elements drive strong engagement.",
          actions_next_steps_recommendations: "Scale creatives with clear hooks combining offers and benefits. Introduce curiosity or question hooks selectively in brand-led campaigns to diversify engagement without compromising clarity. Test hybrid tactics that blend demo with offer messaging for optimal audience resonance."
        },
        persona_alignment: {
          score: "High",
          values: {
            "Resilience-focused Individuals": 71,
            "Indian Car Buyers": 15,
            "Aspirational Buyers": 11,
            "Tech-savvy Seekers": 9,
            "SUV & Adventure Seekers": 8,
            "Safety & Family-focused": 6
          },
          comment: "Video creatives target individuals valuing resilience, clearly communicated through text and visual elements. Image creatives target distinct personas such as aspirational Indian car buyers, tech-savvy and safety-conscious individuals, and young professionals, with evident alignment between visual cues and persona characteristics strengthening audience resonance.",
          actions_next_steps_recommendations: "Optimize persona targeting by refining messaging to speak directly to resilience attributes in video. Continue tailoring image creative elements to clearly signal consumer identity and needs. Test additional persona segments adjacent to resilience to broaden appeal. Increase focus on aspirational and tech-savvy personas who consistently show strong engagement potential."
        },
      },
      L_logic_and_clarity: {
        message_style: {
          score: "V High",
          values: {
            "Single Claim": 86,
            "Announcement": 22,
            "Feature-led": 21,
            "Story-led": 3,
            "Problem-solution": 2,
            "How-it-works": 5
          },
          comment: "Single claim messaging dominates across both formats, producing very high scores and facilitating straightforward aspirational communication. Image creatives also lean heavily towards feature-led and announcement styles delivering clear product information. Story-led and proof-led messaging add narrative depth or credibility when applied.",
          actions_next_steps_recommendations: "Maintain the singular aspirational claim approach for video to sustain message clarity. Optimize image message style through feature-led and announcement styles. Experiment with layering minimal supportive claims to enhance perceived value without impairing simplicity. Strategically incorporate proof-led elements to enhance credibility in safety or tech-focused campaigns."
        },
        offer_clarity: {
          score: "Low",
          values: {
            "None": 106,
            "Price & Discount": 34
          },
          comment: "A critical gap in offer clarity persists across both formats. Video creatives provide no explicit offer clarity, resulting in uniformly low scores. Image creatives show bifurcation: explicit pricing or discount offers score very high driving purchase motivation, while the majority lacking any visible offer score lower.",
          actions_next_steps_recommendations: "Immediately integrate explicit offer details such as pricing, discounts, trials, or value propositions into more creatives across both formats. Test combinations of clear price display with aspirational messaging to balance emotional and rational appeal. Test various formats of explicit offer communication to improve understanding and conversion."
        },
      },
      E_execution_and_action: {
        cta_strength: {
          score: "Low",
          values: {
            "None": 129,
            "Direct": 11
          },
          comment: "A significant deficiency in CTA strength is present across both formats, with no visible call-to-action or explicit next-step instruction in the vast majority of creatives, leading to low scores and conversion risk.",
          actions_next_steps_recommendations: "Urgently introduce clear, direct CTAs such as 'Book now', 'Learn more', or 'Book a test drive' with high visual prominence across both image and video creatives. Prioritize testing CTA placement, size, and phrasing to optimize click-through and conversion rates. Add prominent actionable language tailored to campaign intent."
        },
        trust_level: {
          score: "Medium",
          values: {
            "Very High": 74,
            "Medium": 47,
            "High": 17,
            "Low": 2
          },
          comment: "Video creatives achieve very high trust through consistent celebrity presence and reputable brand association. Image creatives show medium baseline trust due to brand presence, rising to very high where strong proof points such as celebrity endorsements or explicit product claims are included. Lack of proof points or ratings reduces trust in image creatives despite brand recognition.",
          actions_next_steps_recommendations: "Continue reinforcing trust through celebrity association and brand presence in video. Capitalize on trust-building in image creatives by integrating tangible proof points like safety features, awards, or third-party validations. Consider integrating additional trust elements like testimonials or certifications to augment credibility further."
        },
      },
    },
  },
];
