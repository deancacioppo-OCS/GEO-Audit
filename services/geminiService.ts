
import { GoogleGenAI, Type } from "@google/genai";
import { AuditInput, ReportData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reportSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: { type: Type.STRING, description: "A high-level overview of key findings, critical GEO visibility gaps, and strategic imperatives. Should be 2-3 paragraphs." },
        technicalHealth: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of technical health." },
                issues: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            issue: { type: Type.STRING },
                            severity: { type: Type.STRING, enum: ['Critical', 'High', 'Medium', 'Low'] },
                            explanation: { type: Type.STRING }
                        },
                        required: ['issue', 'severity', 'explanation']
                    }
                },
                coreVitals: {
                    type: Type.OBJECT,
                    properties: {
                        lcp: { type: Type.NUMBER, description: "Largest Contentful Paint in seconds." },
                        inp: { type: Type.NUMBER, description: "Interaction to Next Paint in milliseconds." },
                        cls: { type: Type.NUMBER, description: "Cumulative Layout Shift score." }
                    },
                    required: ['lcp', 'inp', 'cls']
                },
                structuredDataSummary: { type: Type.STRING, description: "Summary of structured data implementation." }
            },
            required: ['score', 'summary', 'issues', 'coreVitals', 'structuredDataSummary']
        },
        brandAuthority: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of brand authority." },
                domainRating: { type: Type.INTEGER, description: "Ahrefs-like Domain Rating from 0-100." },
                pageAuthority: { type: Type.INTEGER, description: "Moz-like Page Authority from 0-100." },
                backlinks: { type: Type.INTEGER },
                referringDomains: { type: Type.INTEGER },
                eeatSignals: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of identified E-E-A-T signals." }
            },
            required: ['score', 'summary', 'domainRating', 'pageAuthority', 'backlinks', 'referringDomains', 'eeatSignals']
        },
        brandMentionsSentiment: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "Brief summary of brand sentiment." },
                positive: { type: Type.INTEGER, description: "Percentage of positive mentions." },
                negative: { type: Type.INTEGER, description: "Percentage of negative mentions." },
                neutral: { type: Type.INTEGER, description: "Percentage of neutral mentions." },
                keyThemes: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Key themes from brand mentions." }
            },
            required: ['summary', 'positive', 'negative', 'neutral', 'keyThemes']
        },
        socialMediaAuthority: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of social media presence." },
                platforms: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            platform: { type: Type.STRING, enum: ['Facebook', 'Instagram', 'X/Twitter', 'LinkedIn', 'YouTube'] },
                            followers: { type: Type.INTEGER },
                            engagementRate: { type: Type.NUMBER, description: "Engagement rate as a percentage." }
                        },
                        required: ['platform', 'followers', 'engagementRate']
                    }
                }
            },
            required: ['score', 'summary', 'platforms']
        },
        contentQuality: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of content quality." },
                recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable content recommendations." }
            },
            required: ['score', 'summary', 'recommendations']
        },
        aiOverviewVisibilityGap: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "Summary of AI Overview visibility gaps."},
                gaps: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            query: { type: Type.STRING, description: "The search query with a visibility gap." },
                            reason: { type: Type.STRING, description: "The likely reason for the gap." },
                            impact: { type: Type.STRING, description: "The potential impact of this gap." }
                        },
                        required: ['query', 'reason', 'impact']
                    }
                }
            },
            required: ['summary', 'gaps']
        },
        strategicRoadmap: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "Summary of the strategic roadmap."},
                items: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            area: { type: Type.STRING, description: "The area of focus (e.g., Content Strategy)." },
                            recommendation: { type: Type.STRING, description: "The specific, actionable recommendation." },
                            priority: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                        },
                        required: ['area', 'recommendation', 'priority']
                    }
                }
            },
             required: ['summary', 'items']
        },
        generativeAuthorityScore: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of Generative Authority Score." }
            },
            required: ['score', 'summary']
        },
        auraVisibilityScore: {
            type: Type.OBJECT,
            properties: {
                score: { type: Type.INTEGER, description: "Overall score from 0-100." },
                summary: { type: Type.STRING, description: "Brief summary of Aura Visibility Score." }
            },
            required: ['score', 'summary']
        }
    },
    required: [
        'executiveSummary',
        'technicalHealth',
        'brandAuthority',
        'brandMentionsSentiment',
        'socialMediaAuthority',
        'contentQuality',
        'aiOverviewVisibilityGap',
        'strategicRoadmap',
        'generativeAuthorityScore',
        'auraVisibilityScore'
    ]
};

export const generateGeoAuditReport = async (input: AuditInput): Promise<ReportData> => {
  const { domain, businessName, industryKeywords } = input;

  const prompt = `
    You are an expert Generative Engine Optimization (GEO) analyst.
    Conduct a comprehensive GEO audit for the following brand and generate a strategic roadmap.
    
    **Brand Details:**
    - Domain: ${domain}
    - Business Name: ${businessName}
    - Key Industry Keywords: ${industryKeywords}

    **Your Task:**
    Analyze the brand's fictional online presence across multiple facets and generate a detailed report.
    The data should be realistic and insightful, reflecting common issues and opportunities.
    For all scores, generate a value between 30 and 95.
    For all summaries, provide a concise but expert analysis (2-3 sentences).
    Generate plausible, fictional data for all metrics.

    **Report Sections to Generate:**
    1.  **Executive Summary:** A high-level overview of all findings.
    2.  **Technical Health:** Assess crawlability, indexability, Core Web Vitals, and structured data. Create 3-5 technical issues with varying severity.
    3.  **Brand & Domain Authority:** Analyze fictional authority scores (DR, PA), backlink profile, and E-E-A-T signals.
    4.  **Brand Mentions & Sentiment:** Analyze public sentiment, ensuring positive, negative, and neutral percentages add up to 100. Identify 3-4 key themes.
    5.  **Social Media Authority:** Evaluate presence on major platforms. Provide fictional follower counts and engagement rates.
    6.  **Content Quality & Relevance:** Judge content against GEO principles like 'answerability' and 'citability'. Provide 3-4 actionable recommendations.
    7.  **AI Overview Visibility Gap:** Identify 3-5 specific queries where the brand is likely missing from AI Overviews and explain why.
    8.  **Strategic Roadmap:** Synthesize all findings into prioritized, actionable recommendations. Create 5-7 roadmap items across different areas.
    9.  **Generative Authority Score (GAS):** A score from 0-100 and a brief summary.
    10. **Aura Visibility Score (AVS):** A score from 0-100 and a brief summary.
        The AVS is a dynamic index, calculated on a scale of 0-100, that provides a holistic measure of a brand's authority and prominence within AI-generated search results for a given set of topics. It is calculated using a weighted algorithm that synthesizes multiple data points captured through advanced, scaled web data collection and Natural Language Processing (NLP).

    Return the entire report as a single JSON object that conforms to the provided schema. Do not include any text outside the JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: reportSchema,
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ReportData;

  } catch (error) {
    console.error("Error generating GEO audit report:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate report from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the report.");
  }
};
