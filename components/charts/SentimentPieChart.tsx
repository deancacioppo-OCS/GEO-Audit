
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SentimentPieChartProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
  };
}

const SentimentPieChart: React.FC<SentimentPieChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Positive', value: data.positive },
    { name: 'Negative', value: data.negative },
    { name: 'Neutral', value: data.neutral },
  ];

  const COLORS = ['#10B981', '#EF4444', '#64748B'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
            contentStyle={{
                backgroundColor: '#1E293B',
                borderColor: '#334155'
            }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SentimentPieChart;
