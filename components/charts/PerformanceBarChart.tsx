
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SocialPlatformData } from '../../types';

interface PerformanceBarChartProps {
  data: SocialPlatformData[];
}

const PerformanceBarChart: React.FC<PerformanceBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: -10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="platform" tick={{ fill: '#94A3B8' }} />
        <YAxis tick={{ fill: '#94A3B8' }} />
        <Tooltip
            contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: '#334155'
            }}
            cursor={{fill: '#33415580'}}
        />
        <Legend />
        <Bar dataKey="followers" fill="#2DD4BF" name="Followers" />
        <Bar dataKey="engagementRate" fill="#60A5FA" name="Engagement (%)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceBarChart;
