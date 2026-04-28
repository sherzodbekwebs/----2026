import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MarketShareData } from '../types';
import { FadeIn } from './FadeIn';
import { TrendingUp, TrendingDown, Minus, Wallet, ShoppingCart, BarChart3, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MarketShareAnalyticsProps {
  data2025: MarketShareData;
  data2026: MarketShareData;
}

const SmallDonut = ({ data, year }: { data: MarketShareData, year: string }) => (
  <div className="flex flex-col items-center w-full py-4 border-b border-slate-50 last:border-0">
    <p className="text-[15px] font-black text-slate-700 uppercase tracking-widest mb-2">{year} (Янв-Март)</p>
    <div className="h-[180px] w-full relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-xl font-black text-[#1E3A5F]">{data.total.toLocaleString()}</p>
        <p className="text-[8px] font-bold text-slate-500 uppercase">ед.</p>
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
          >
            {data.records.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#cbd5e1'} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const MetricCard = ({ label, v1, v2, trend, icon }: any) => (
  <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/[0.07] transition-all group flex flex-col items-center">
    <div className="flex justify-between items-start mb-4 w-full">
      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      {trend === 'up' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
      {trend === 'down' && <TrendingDown className="w-5 h-5 text-rose-400" />}
      {trend === 'neutral' && <Minus className="w-5 h-5 text-slate-400" />}
    </div>
    <h5 className="text-[12px] md:text-[14px] font-black text-blue-300 uppercase tracking-widest mb-5 text-center w-full leading-tight min-h-[35px] flex items-center justify-center">
      {label}
    </h5>
    <div className="flex items-end justify-between w-full border-t border-white/5 pt-4">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">2025</p>
        <p className="text-xl font-black text-slate-300 tracking-tighter">{v1}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-blue-400 uppercase leading-none mb-1">2026</p>
        <p className="text-3xl font-black text-white tracking-tighter">{v2}</p>
      </div>
    </div>
  </div>
);

export const MarketShareAnalytics = ({ data2025, data2026 }: MarketShareAnalyticsProps) => {
  
  // Ma'lumotlarni birlashtirish: Ikkala yildagi barcha brendlarni yig'ish
  const allBrands = Array.from(new Set([
    ...data2025.records.map(r => r.brand),
    ...data2026.records.map(r => r.brand)
  ]));

  const tableData = allBrands.map(brand => {
    const r25 = data2025.records.find(r => r.brand === brand);
    const r26 = data2026.records.find(r => r.brand === brand);
    
    const p25 = r25?.percentage || 0;
    const p26 = r26?.percentage || 0;
    const diff = p26 - p25;

    return {
      brand,
      color: r26?.color || r25?.color || '#cbd5e1',
      c25: r25?.count || 0,
      p25: p25,
      c26: r26?.count || 0,
      p26: p26,
      diff: diff
    };
  }).sort((a, b) => b.c26 - a.c26); // 2026-yilgi soni bo'yicha saralash

  return (
    <div className="mb-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* CHAP TOMON: Donutlar */}
        <div className="lg:col-span-4">
          <div className="h-full bg-white rounded-[10px] border border-slate-100 shadow-sm p-6 flex flex-col justify-around">
            <SmallDonut data={data2025} year="2025" />
            <SmallDonut data={data2026} year="2026" />
          </div>
        </div>

        {/* O'NG TOMON: To'liq Jadval (Barcha brendlar bilan) */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-hidden h-full">
            <div className="overflow-x-auto max-h-[600px] scrollbar-thin">
              <table className="w-full text-left border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-slate-50">
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase border-b border-r border-slate-100">Марка</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase border-b border-r border-slate-100 text-center">2025 (Янв-Март)</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase border-b border-r border-slate-100 text-center">2026 (Янв-Март)</th>
                    <th className="p-5 text-[11px] font-black text-slate-500 uppercase border-b text-center">Динамика</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {tableData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 border-r border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: row.color }} />
                          <span className="text-sm font-black text-[#1E3A5F] uppercase">{row.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center border-r border-slate-50">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-black text-slate-700">{row.c25.toLocaleString()} ед.</span>
                          <span className="text-xs font-bold text-slate-500">({row.p25}%)</span>
                        </div>
                      </td>
                      <td className="p-4 text-center border-r border-slate-50 bg-blue-50/5">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-black text-[#00529B]">{row.c26.toLocaleString()} ед.</span>
                          <span className="text-sm font-black text-[#00529B]">({row.p26}%)</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`flex items-center justify-center gap-1 font-black text-xs ${row.diff > 0 ? 'text-emerald-500' : row.diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                          {row.diff > 0 ? <ArrowUpRight size={14}/> : row.diff < 0 ? <ArrowDownRight size={14}/> : <Minus size={14}/>}
                          {Math.abs(row.diff).toFixed(1)}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* METRIC SECTION (O'zgarishsiz dizayn) */}
      <FadeIn delay={0.3}>
        <div className="bg-[#1E3A5F] p-8 md:p-10 rounded-[10px] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px]" />
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 gap-4">
              <div>
                <h4 className="text-4xl font-black uppercase tracking-tighter ">Динамика Рынка</h4>
                <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Аналитический отчет по ключевым метрикам</p>
              </div>
              <div className="px-5 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-blue-200">
                Сравнение Q1 2025 / Q1 2026
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <MetricCard label="Общий объем рынка" v1="1 632" v2="1 068" trend="down" icon={<ShoppingCart className="w-5 h-5" />} />
               <MetricCard label="Доля Лидера (Max)" v1="27%" v2="18%" trend="down" icon={<Users className="w-5 h-5" />} />
               <MetricCard label="Экспансия BONUM" v1="4.0%" v2="18.0%" trend="up" icon={<BarChart3 className="w-5 h-5" />} />
               <MetricCard label="Стабильность КАМАЗ" v1="16.0%" v2="15.0%" trend="neutral" icon={<Wallet className="w-5 h-5" />} />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};