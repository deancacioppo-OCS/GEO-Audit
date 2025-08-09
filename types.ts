
export interface AuditInput {
  domain: string;
  businessName: string;
  industryKeywords: string;
}

export interface TechnicalIssue {
  issue: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  explanation: string;
}

export interface CoreWebVitals {
  lcp: number;
  inp: number;
  cls: number;
}

export interface TechnicalHealthData {
  score: number;
  summary: string;
  issues: TechnicalIssue[];
  coreVitals: CoreWebVitals;
  structuredDataSummary: string;
}

export interface BrandAuthorityData {
  score: number;
  summary: string;
  domainRating: number;
  pageAuthority: number;
  backlinks: number;
  referringDomains: number;
  eeatSignals: string[];
}

export interface SentimentData {
  summary: string;
  positive: number;
  negative: number;
  neutral: number;
  keyThemes: string[];
}

export interface SocialPlatformData {
    platform: 'Facebook' | 'Instagram' | 'X/Twitter' | 'LinkedIn' | 'YouTube';
    followers: number;
    engagementRate: number;
}

export interface SocialMediaData {
  score: number;
  summary: string;
  platforms: SocialPlatformData[];
}

export interface ContentQualityData {
  score: number;
  summary: string;
  recommendations: string[];
}

export interface VisibilityGap {
  query: string;
  reason: string;
  impact: string;
}

export interface VisibilityGapData {
  summary:string;
  gaps: VisibilityGap[];
}

export interface RoadmapItem {
  area: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface StrategicRoadmapData {
    summary: string;
    items: RoadmapItem[];
}

export interface ReportData {
  executiveSummary: string;
  technicalHealth: TechnicalHealthData;
  brandAuthority: BrandAuthorityData;
  brandMentionsSentiment: SentimentData;
  socialMediaAuthority: SocialMediaData;
  contentQuality: ContentQualityData;
  aiOverviewVisibilityGap: VisibilityGapData;
  strategicRoadmap: StrategicRoadmapData;
  generativeAuthorityScore: {
    score: number;
    summary: string;
  };
  auraVisibilityScore: {
    score: number;
    summary: string;
  };
}
