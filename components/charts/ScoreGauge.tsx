
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

interface ScoreGaugeProps {
  score: number;
  title: string;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, title }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];

  const scoreColor = score > 80 ? '#10B981' : score > 50 ? '#F59E0B' : '#EF4444';

  return (
    <div className="w-full h-48 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={scoreColor} />
            <Cell fill="#475569" />
             <Label
              value={score}
              position="center"
              fill="#FFFFFF"
              className="text-3xl font-bold"
              dy={-10}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="text-sm font-semibold text-slate-300 -mt-8">{title}</p>
    </div>
  );
};

export default ScoreGauge;
