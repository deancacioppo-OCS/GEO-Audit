
import React from 'react';
import Card from './Card';

interface ReportSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  gridSpan?: string;
}

const ReportSection: React.FC<ReportSectionProps> = ({ icon, title, children, gridSpan = "md:col-span-1" }) => {
  return (
    <Card className={`flex flex-col ${gridSpan}`}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 flex-shrink-0 mr-4 text-teal-400">{icon}</div>
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
      </div>
      <div className="flex-grow">
        {children}
      </div>
    </Card>
  );
};

export default ReportSection;
