
import React from 'react';
import { ReportData, TechnicalIssue } from '../types';
import ReportSection from './ui/ReportSection';
import ScoreGauge from './charts/ScoreGauge';
import SentimentPieChart from './charts/SentimentPieChart';
import PerformanceBarChart from './charts/PerformanceBarChart';
import { 
    WrenchScrewdriverIcon, 
    ShieldCheckIcon, 
    ChatBubbleLeftRightIcon, 
    UserGroupIcon, 
    DocumentCheckIcon, 
    EyeIcon, 
    MapIcon,
    DocumentTextIcon
} from './icons';

interface GeoReportProps {
  data: ReportData;
}

const severityClass = (severity: 'Critical' | 'High' | 'Medium' | 'Low') => {
  switch (severity) {
    case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'High': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    case 'Medium': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  }
};

const priorityClass = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High': return 'bg-red-500/20 text-red-400';
      case 'Medium': return 'bg-amber-500/20 text-amber-400';
      case 'Low': return 'bg-emerald-500/20 text-emerald-400';
    }
};

const GeoReport: React.FC<GeoReportProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <ReportSection icon={<DocumentTextIcon className="w-full h-full"/>} title="Executive Summary" gridSpan="md:col-span-3">
        <p className="text-slate-300 whitespace-pre-wrap">{data.executiveSummary}</p>
      </ReportSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ReportSection icon={<WrenchScrewdriverIcon className="w-full h-full"/>} title="Technical Health">
            <ScoreGauge score={data.technicalHealth.score} title="Health Score" />
            <p className="text-sm text-slate-400 mt-4">{data.technicalHealth.summary}</p>
        </ReportSection>

        <ReportSection icon={<ShieldCheckIcon className="w-full h-full"/>} title="Brand & Domain Authority">
            <ScoreGauge score={data.brandAuthority.score} title="Authority Score" />
            <p className="text-sm text-slate-400 mt-4">{data.brandAuthority.summary}</p>
        </ReportSection>

        <ReportSection icon={<ChatBubbleLeftRightIcon className="w-full h-full"/>} title="Brand Mentions & Sentiment">
            <SentimentPieChart data={data.brandMentionsSentiment} />
            <p className="text-sm text-slate-400 mt-2 text-center">{data.brandMentionsSentiment.summary}</p>
        </ReportSection>

        {/* New Generative Authority Score */}
        <ReportSection icon={<DocumentTextIcon className="w-full h-full"/>} title="Generative Authority Score (GAS)">
            <ScoreGauge score={data.generativeAuthorityScore.score} title="GAS Score" />
            <p className="text-sm text-slate-400 mt-4">{data.generativeAuthorityScore.summary}</p>
        </ReportSection>

        {/* New Aura Visibility Score (AVS) */}
        <ReportSection icon={<EyeIcon className="w-full h-full"/>} title="Aura Visibility Score (AVS)">
            <ScoreGauge score={data.auraVisibilityScore.score} title="AVS Score" />
            <p className="text-sm text-slate-400 mt-4">{data.auraVisibilityScore.summary}</p>
        </ReportSection>

        <ReportSection icon={<UserGroupIcon className="w-full h-full"/>} title="Social Media Authority" gridSpan="md:col-span-2">
            <PerformanceBarChart data={data.socialMediaAuthority.platforms} />
             <p className="text-sm text-slate-400 mt-4">{data.socialMediaAuthority.summary}</p>
        </ReportSection>
        
        <ReportSection icon={<DocumentCheckIcon className="w-full h-full"/>} title="Content Quality">
            <ScoreGauge score={data.contentQuality.score} title="Content Score" />
            <p className="text-sm text-slate-400 mt-4">{data.contentQuality.summary}</p>
        </ReportSection>

        <ReportSection icon={<EyeIcon className="w-full h-full"/>} title="AI Overview Visibility Gaps" gridSpan="md:col-span-3">
            <p className="text-slate-400 mb-4">{data.aiOverviewVisibilityGap.summary}</p>
            <div className="space-y-3">
                {data.aiOverviewVisibilityGap.gaps.map((gap, i) => (
                    <div key={i} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                        <h4 className="font-semibold text-teal-400">Query: "{gap.query}"</h4>
                        <p className="text-sm text-slate-300"><strong className="text-slate-400">Reason:</strong> {gap.reason}</p>
                        <p className="text-sm text-slate-300"><strong className="text-slate-400">Impact:</strong> {gap.impact}</p>
                    </div>
                ))}
            </div>
        </ReportSection>

        <ReportSection icon={<MapIcon className="w-full h-full"/>} title="Strategic Roadmap" gridSpan="md:col-span-3">
            <p className="text-slate-400 mb-4">{data.strategicRoadmap.summary}</p>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-600">
                        <tr>
                            <th className="p-2">Priority</th>
                            <th className="p-2">Area</th>
                            <th className="p-2">Recommendation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.strategicRoadmap.items.map((item, i) => (
                            <tr key={i} className="border-b border-slate-700/50">
                                <td className="p-2"><span className={`px-2 py-1 text-xs font-bold rounded-full ${priorityClass(item.priority)}`}>{item.priority}</span></td>
                                <td className="p-2">{item.area}</td>
                                <td className="p-2 text-slate-300">{item.recommendation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ReportSection>

         <ReportSection icon={<WrenchScrewdriverIcon className="w-full h-full"/>} title="Technical Issues Breakdown" gridSpan="md:col-span-3">
            <div className="space-y-2">
                {data.technicalHealth.issues.map((issue: TechnicalIssue, i: number) => (
                    <div key={i} className={`p-3 border rounded-lg ${severityClass(issue.severity)}`}>
                        <div className="flex justify-between items-center">
                            <h4 className="font-bold">{issue.issue}</h4>
                            <span className="text-xs font-bold px-2 py-1 rounded-full bg-slate-800">{issue.severity}</span>
                        </div>
                        <p className="text-sm">{issue.explanation}</p>
                    </div>
                ))}
            </div>
        </ReportSection>
      </div>
    </div>
  );
};

export default GeoReport;
