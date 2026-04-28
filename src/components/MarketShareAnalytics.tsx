import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MarketShareData } from '../types';
import { FadeIn } from './FadeIn';
import { TrendingUp, TrendingDown, Minus, Wallet, ShoppingCart, BarChart3, Users } from 'lucide-react';

interface MarketShareAnalyticsProps {
  data2025: MarketShareData;
  data2026: MarketShareData;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100">
        <p className="text-[10px] font-black text-[#1E3A5F] uppercase tracking-widest mb-1">{data.brand}</p>
        <p className="text-sm font-black text-[#00529B]">{data.count} шт.</p>
        <p className="text-[10px] font-bold text-slate-400">{data.percentage}% от рынка</p>
      </div>
    );
  }
  return null;
};

const ShareDonut = ({ data, title }: { data: MarketShareData, title: string }) => (
  <div className="bg-white p-6 md:p-8 rounded-[14px] md:rounded-[10px] border border-slate-100 shadow-sm flex flex-col items-center">
    <div className="text-center mb-6">
      <h4 className="text-xs md:text-sm font-black text-[#1E3A5F] uppercase tracking-widest leading-none mb-2">{title}</h4>
      <div className="flex items-center justify-center gap-2">
        <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Всего:</span>
        <span className="text-xs md:text-sm font-black text-[#00529B]">{data.total.toLocaleString()}</span>
      </div>
    </div>
    
    <div className="h-[250px] md:h-[300px] w-full relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-2xl md:text-3xl font-black text-[#1E3A5F] tracking-tighter">{data.total.toLocaleString()}</p>
        <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase">единиц</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.records}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="95%"
            paddingAngle={2}
            dataKey="count"
            nameKey="brand"
          >
            {data.records.map((entry, index) => (entry.color ? 
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" /> : null
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 w-full px-2">
      {data.records.slice(0, 10).map((record, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: record.color }} />
          <div className="flex justify-between flex-1 items-center gap-2">
            <span className="text-[11px] md:text-[13px] font-black text-[#1E3A5F] uppercase truncate">{record.brand}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-[12px] font-black text-[#00529B]">{record.count}</span>
              <span className="text-[10px] md:text-[12px] font-bold text-slate-500">{record.percentage}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface MetricCardProps {
  label: string;
  v1: string | number;
  v2: string | number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
}

const MetricCard = ({ label, v1, v2, trend, icon }: MetricCardProps) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-6 hover:bg-white/[0.07] transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 md:p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon as React.ReactElement, { className: "w-4 h-4 md:w-5 md:h-5" })}
      </div>
      {trend === 'up' && <TrendingUp className="w-4 h-4 text-emerald-400" />}
      {trend === 'down' && <TrendingDown className="w-4 h-4 text-rose-400" />}
      {trend === 'neutral' && <Minus className="w-4 h-4 text-slate-400" />}
    </div>
    
    <h5 className="text-[9px] md:text-[10px] font-black text-blue-300 uppercase tracking-widest mb-3 text-center min-h-[2.5em] flex items-center justify-center">
      {label}
    </h5>
    
    <div className="flex items-end justify-between gap-2">
      <div>
        <p className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">2025</p>
        <p className="text-sm md:text-lg font-black text-slate-300 tracking-tighter">{v1}</p>
      </div>
      <div className="text-right">
        <p className="text-[8px] md:text-[10px] font-bold text-blue-400 uppercase leading-none mb-1">2026</p>
        <p className="text-lg md:text-2xl font-black text-white tracking-tighter">{v2}</p>
      </div>
    </div>
  </div>
);

export const MarketShareAnalytics = ({ data2025, data2026 }: MarketShareAnalyticsProps) => {
  return (
    <div className="mb-12 px-4 md:px-0">
      <FadeIn className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2 h-2 rounded-full bg-[#00529B] shrink-0" />
          <h3 className="text-lg md:text-xl font-black text-[#1E3A5F] uppercase tracking-tighter italic">
            Регистрации Полуприцепов
          </h3>
        </div>
        <p className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Аналитика 2025 vs 2026</p>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <FadeIn delay={0.1}>
          <ShareDonut data={data2025} title="3 месяца 2025 года" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <ShareDonut data={data2026} title="3 месяца 2026 года" />
        </FadeIn>
      </div>

      <FadeIn delay={0.3} className="mt-6 md:mt-8">
        <div className="bg-[#1E3A5F] p-6 md:p-10 rounded-[10px] md:rounded-[10px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px] md:blur-[100px]" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 md:mb-10 gap-4">
              <div>
                <h4 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic leading-tight">Динамика Рынка</h4>
                <p className="text-blue-300 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">Ключевые метрики за период</p>
              </div>
              <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-blue-200">
                Сравнение Q1 2025 / Q1 2026
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               <MetricCard label="Общий объем рынка" v1="1 632" v2="1 068" trend="down" icon={<ShoppingCart />} />
               <MetricCard label="Доля Лидера (Max)" v1="27%" v2="18%" trend="down" icon={<Users />} />
               <MetricCard label="Экспансия BONUM" v1="4.0%" v2="18.0%" trend="up" icon={<BarChart3 />} />
               <MetricCard label="Стабильность КАМАЗ" v1="16.0%" v2="15.0%" trend="neutral" icon={<Wallet />} />
            </div>

            <div className="mt-8 md:mt-10 p-5 md:p-8 bg-gradient-to-br from-white/5 to-transparent rounded-[20px] md:rounded-[32px] border border-white/10 backdrop-blur-sm">
              <div className="flex gap-4">
                <div className="w-1 h-auto bg-blue-500 rounded-full shrink-0" />
                <p className="text-xs md:text-sm font-medium text-blue-100 leading-relaxed max-w-4xl">
                  Наблюдается снижение рынка на <span className="text-white font-black underline decoration-blue-500 decoration-2 underline-offset-4">34.5%</span>. 
                  Компания <span className="text-white font-black">BONUM</span> выросла в 4.5 раза, став новым драйвером премиум-сегмента.
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};