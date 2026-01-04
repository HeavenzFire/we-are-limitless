
import React from 'react';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  color: string;
}

const MetricCard: React.FC<Props> = ({ label, value, unit, color }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center group hover:border-amber-500/50 transition-all duration-500">
      <span className="text-[10px] font-space font-bold text-gray-500 tracking-[0.2em] mb-2 uppercase">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-cinzel font-bold ${color} drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`}>
          {value}
        </span>
        {unit && <span className="text-xs text-gray-400">{unit}</span>}
      </div>
      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mt-3 group-hover:via-amber-500 transition-all"></div>
    </div>
  );
};

export default MetricCard;
