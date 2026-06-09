import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { MarketShareData } from '../types';
import { FadeIn } from './FadeIn';
import {
  TrendingUp, TrendingDown, Minus, ShoppingCart, BarChart3, Users,
  ArrowUpRight, ArrowDownRight, ArrowUpDown, ChevronUp, ChevronDown,
  BarChart2, LayoutList, PieChart as PieIcon
} from 'lucide-react';

interface MarketShareAnalyticsProps {
  data2025: MarketShareData;
  data2026: MarketShareData;
}

const SmallDonut = ({ data, year }: { data: MarketShareData, year: string }) => (
  <div className="flex flex-col items-center w-full py-2 relative z-10">
    <p className="text-[13px] font-black text-[#1E3A5F]  tracking-widest mb-1">{year} (янв-март)</p>
    <div className="h-[190px] w-full relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 bg-white/40 px-2 py-1 rounded-full backdrop-blur-[2px]">
        <p className="text-2xl font-black text-[#1E3A5F] leading-none">{data.total.toLocaleString()}</p>
        <p className="text-[8px] font-bold text-slate-500 uppercase">ед.</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data.records}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={90}
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

export const MarketShareAnalytics = ({ data2025, data2026 }: MarketShareAnalyticsProps) => {
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
    key: 'c26',
    direction: 'desc'
  });

  const allBrandsData = useMemo(() => {
    const brands = Array.from(new Set([...data2025.records.map(r => r.brand), ...data2026.records.map(r => r.brand)]));
    let items = brands.map(brand => {
      const r25 = data2025.records.find(r => r.brand === brand);
      const r26 = data2026.records.find(r => r.brand === brand);
      const c25 = r25?.count || 0;
      const c26 = r26?.count || 0;
      const p25 = r25?.percentage || 0;
      const p26 = r26?.percentage || 0;
      return {
        brand,
        color: r26?.color || r25?.color || '#cbd5e1',
        c25, p25, c26, p26,
        countDiff: c26 - c25,
        percentDiff: p26 - p25
      };
    });

    items.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return items;
  }, [data2025, data2026, sortConfig]);

  const globalTotalDiff = data2026.total - data2025.total;
  const globalPercentDiff = ((data2026.total - data2025.total) / data2025.total) * 100;

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') direction = 'asc';
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={12} className="opacity-30 group-hover:opacity-100" />;
    return sortConfig.direction === 'desc' ? <ChevronDown size={14} className="text-[#00529B]" /> : <ChevronUp size={14} className="text-[#00529B]" />;
  };

  return (
    <div className="mb-12">
      {/* 1. UMUMIY SARLAVHA SECTIONI */}
      <FadeIn className="mb-3 ">
        <h3 className=" font-black text-[#1E3A5F]  tracking-tighter ">
          Рынок полуприцепов (3-х и 4-х осных)
        </h3>

      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">

        {/* 2. CHAP TOMON: VIZUALIZATSIYA */}
        <div className="lg:col-span-4 flex flex-col bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-hidden">


          <div className="flex-1 p-4 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            {/* KO'RINADIGAN DASHED LINE */}
            <div className="absolute left-1/2 top-[120px] bottom-[120px] w-px border-l-2 border-dashed border-slate-300 -translate-x-1/2 z-0 hidden sm:block" />

            <SmallDonut data={data2026} year="2026" />

            {/* O'RTADAGI DINAMIKA BADGE */}
            <div className="flex justify-center relative z-20 h-0 w-full">
              <div className="absolute left-1/2 flex items-center -translate-y-1/2 translate-x-16">
                <div className="w-12 h-px bg-slate-300" />
                <div className={`px-4 py-2 rounded-2xl border-2 shadow-md bg-white flex flex-col items-center gap-0.5 min-w-[150px] ${globalTotalDiff < 0 ? 'border-rose-100' : 'border-emerald-100'}`}>
                  <div className="flex items-center gap-2">
                    {globalTotalDiff < 0 ? <TrendingDown size={16} className="text-rose-500" /> : <TrendingUp size={14} className="text-emerald-500" />}
                    <span className={`text-[15px] font-black ${globalTotalDiff < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>{globalTotalDiff.toLocaleString()} ед.</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter">{globalPercentDiff.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            <SmallDonut data={data2025} year="2025" />
          </div>
        </div>

        {/* 3. O'NG TOMON: JADVAL */}
        <div className="lg:col-span-8 flex flex-col bg-white rounded-[10px] border border-slate-100 shadow-sm overflow-hidden">


          <div className="flex-1 overflow-x-auto max-h-[650px] scrollbar-thin">
            <table className="w-full text-left border-separate border-spacing-0">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr className="select-none">
                  <th onClick={() => requestSort('brand')} className="group cursor-pointer p-5 text-[11px] font-black text-slate-500 uppercase border-b border-r border-slate-100">
                    <div className="flex items-center gap-2">Марка <SortIcon column="brand" /></div>
                  </th>
                  <th onClick={() => requestSort('c26')} className="group cursor-pointer p-5 text-[11px] font-black text-slate-500 border-b border-r border-slate-100 text-center">
                    <div className="flex items-center justify-center gap-2">2026 (янв-март) <SortIcon column="c26" /></div>
                  </th>
                  <th onClick={() => requestSort('c25')} className="group cursor-pointer p-5 text-[11px] font-black text-slate-500 border-b border-r border-slate-100 text-center">
                    <div className="flex items-center justify-center gap-2">2025 (янв-март) <SortIcon column="c25" /></div>
                  </th>
                  <th onClick={() => requestSort('countDiff')} className="group cursor-pointer p-5 text-[11px] font-black text-slate-500 uppercase border-b text-center">
                    <div className="flex items-center justify-center gap-2">Динамика <SortIcon column="countDiff" /></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* JAMI BOZOR QATORI */}
                <tr className="bg-slate-100/50 font-black">
                  <td className="p-4 border-r border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-[#1E3A5F] rounded flex items-center justify-center text-white text-[10px]">∑</div>
                      <span className="text-sm font-black text-[#1E3A5F] uppercase">ИТОГО РЫНОК</span>
                    </div>
                  </td>
                  <td className="p-4 text-center border-r border-slate-200 text-[#00529B]">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{data2026.total.toLocaleString()} ед.</span>
                      <span className="text-xs opacity-60">(100%)</span>
                    </div>
                  </td>
                  <td className="p-4 text-center border-r border-slate-200 text-slate-700">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{data2025.total.toLocaleString()} ед.</span>
                      <span className="text-xs opacity-60">(100%)</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className={`flex items-center justify-center gap-2 text-xs font-black ${globalTotalDiff < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {globalTotalDiff < 0 ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                      <span>{globalTotalDiff > 0 ? `+${globalTotalDiff}` : globalTotalDiff} ед. ({globalPercentDiff.toFixed(1)}%)</span>
                    </div>
                  </td>
                </tr>

                {/* BRENDLAR RO'YXATI */}
                {allBrandsData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 border-r border-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: row.color }} />
                        <span className="text-sm font-black text-[#1E3A5F] uppercase">{row.brand}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center border-r border-slate-50 bg-blue-50/5 text-[#00529B]">
                      <div className="flex items-center justify-center gap-2 font-black">
                        <span className="text-sm">{row.c26.toLocaleString()}</span>
                        <span className="text-xs opacity-60">({row.p26}%)</span>
                      </div>
                    </td>
                    <td className="p-4 text-center border-r border-slate-50 text-slate-700 font-bold">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm">{row.c25.toLocaleString()}</span>
                        <span className="text-xs opacity-60">({row.p25}%)</span>
                      </div>
                    </td>
                    <td className="p-4 text-center font-black text-xs">
                      <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                        <div className={`flex items-center gap-1 ${row.countDiff > 0 ? 'text-emerald-500' : row.countDiff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                          {row.countDiff > 0 ? <ArrowUpRight size={14} /> : row.countDiff < 0 ? <ArrowDownRight size={14} /> : <Minus size={14} />}
                          <span>{row.countDiff > 0 ? `+${row.countDiff}` : row.countDiff} ед.</span>
                        </div>
                        <span className={`text-[10px] ${row.percentDiff > 0 ? 'text-emerald-500' : row.percentDiff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                          ({row.percentDiff > 0 ? `+${row.percentDiff.toFixed(1)}` : row.percentDiff.toFixed(1)}%)
                        </span>
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
  );
};





// import React, { useState, useMemo } from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { MarketShareData } from '../types';
// import { FadeIn } from './FadeIn';
// import { TrendingUp, TrendingDown, Minus, ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

// interface MarketShareAnalyticsProps {
//   data2025: MarketShareData;
//   data2026: MarketShareData;
// }

// const SmallDonut = ({ data, year }: { data: MarketShareData, year: string }) => (
//   <div className="flex flex-col items-center w-full print:w-auto">
//     <p className="text-[13px] font-black text-[#1E3A5F] mb-1 uppercase print:text-[10px]">{year}</p>
//     {/* Pechatda ResponsiveContainer ishlamaydi, shuning uchun print: uchun qat'iy px berildi */}
//     <div className="h-[190px] w-full relative flex items-center justify-center print:h-[130px] print:w-[130px]">
//       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
//         <p className="text-2xl font-black text-[#1E3A5F] leading-none print:text-lg">{data.total}</p>
//         <p className="text-[8px] font-bold text-slate-500 uppercase print:text-[6px]">ед.</p>
//       </div>
//       <ResponsiveContainer width="100%" height="100%" className="print:hidden">
//         <PieChart>
//           <Pie data={data.records} cx="50%" cy="50%" innerRadius={65} outerRadius={90} paddingAngle={2} dataKey="count">
//             {data.records.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color || '#cbd5e1'} stroke="none" />
//             ))}
//           </Pie>
//         </PieChart>
//       </ResponsiveContainer>
      
//       {/* FAQAT PECHAT UCHUN (Responsive bo'lmagan grafik) */}
//       <div className="hidden print:block">
//         <PieChart width={130} height={130}>
//           <Pie data={data.records} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={2} dataKey="count" isAnimationActive={false}>
//             {data.records.map((entry, index) => (
//               <Cell key={`cell-print-${index}`} fill={entry.color || '#cbd5e1'} stroke="none" />
//             ))}
//           </Pie>
//         </PieChart>
//       </div>
//     </div>
//   </div>
// );

// export const MarketShareAnalytics = ({ data2025, data2026 }: MarketShareAnalyticsProps) => {
//   const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({
//     key: 'c26', direction: 'desc'
//   });

//   const allBrandsData = useMemo(() => {
//     const brands = Array.from(new Set([...data2025.records.map(r => r.brand), ...data2026.records.map(r => r.brand)]));
//     let items = brands.map(brand => {
//       const r25 = data2025.records.find(r => r.brand === brand);
//       const r26 = data2026.records.find(r => r.brand === brand);
//       const c25 = r25?.count || 0;
//       const c26 = r26?.count || 0;
//       return { brand, color: r26?.color || r25?.color || '#cbd5e1', c25, p25: r25?.percentage || 0, c26, p26: r26?.percentage || 0, countDiff: c26 - c25 };
//     });
//     items.sort((a: any, b: any) => (a[sortConfig.key] < b[sortConfig.key] ? 1 : -1));
//     return items;
//   }, [data2025, data2026, sortConfig]);

//   const globalTotalDiff = data2026.total - data2025.total;

//   return (
//     <div className="mb-12 print:m-0 print:p-0">
//       {/* <FadeIn className="mb-4 print:mb-2">
//         <h3 className="font-black text-[#1E3A5F] tracking-tighter uppercase text-xl print:text-base print:text-center">
//           Анализ рынка полуприцепов (3-х и 4-х осных)
//         </h3>
//       </FadeIn> */}

//       {/* PECHATDA: Grafiklar tepada yonma-yon turadi, jadval esa pastda to'liq kenglikda */}
//       <div className="flex flex-col lg:flex-row gap-6 print:block">

//         {/* GRAFIKLAR: Pechatda tepada gorizontal qator bo'ladi */}
//         <div className="w-full lg:w-1/3 flex flex-col bg-white rounded-xl border border-slate-100 p-4 print:w-full print:border-none print:p-0 print:mb-6">
//           <div className="flex flex-col items-center justify-center gap-4 print:flex-row print:justify-center print:gap-20">
//             <SmallDonut data={data2026} year="2026" />
            
//             <div className={`px-4 py-2 rounded-xl border-2 bg-white flex flex-col items-center print:border-slate-300 print:shadow-none ${globalTotalDiff < 0 ? 'border-rose-100' : 'border-emerald-100'}`}>
//               <div className="flex items-center gap-2 font-black text-sm print:text-[10px]">
//                 {globalTotalDiff < 0 ? <TrendingDown size={14} className="text-rose-500" /> : <TrendingUp size={14} className="text-emerald-500" />}
//                 <span className={globalTotalDiff < 0 ? 'text-rose-600' : 'text-emerald-600'}>{globalTotalDiff} ед.</span>
//               </div>
//             </div>

//             <SmallDonut data={data2025} year="2025" />
//           </div>
//         </div>

//         {/* JADVAL: Pechatda grafikdan keyin to'liq kenglikda chiqadi */}
//         <div className="w-full lg:w-2/3 bg-white rounded-xl border border-slate-100 overflow-hidden print:w-full print:border-none">
//           <div className="overflow-visible">
//             <table className="w-full text-left border-separate border-spacing-0 print:table-fixed">
//               <thead className="bg-slate-50 print:bg-slate-100">
//                 <tr className="print:text-[9px]">
//                   <th className="p-4 text-[11px] font-black text-slate-500 uppercase border-b border-r border-slate-100 print:p-1.5 w-[35%]">Марка</th>
//                   <th className="p-4 text-[11px] font-black text-slate-500 border-b border-r border-slate-100 text-center print:p-1.5 w-[20%]">2026 (янв-март)</th>
//                   <th className="p-4 text-[11px] font-black text-slate-500 border-b border-r border-slate-100 text-center print:p-1.5 w-[20%]">2025 (янв-март)</th>
//                   <th className="p-4 text-[11px] font-black text-slate-500 border-b text-center print:p-1.5 w-[25%]">Динамика</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-50 print:text-[10px]">
//                 <tr className="bg-slate-50 font-black print:bg-slate-100">
//                   <td className="p-4 border-r border-slate-200 print:p-1.5 uppercase text-xs">ИТОГО РЫНОК</td>
//                   <td className="p-4 text-center border-r border-slate-200 text-[#00529B] print:p-1.5 font-black">{data2026.total}</td>
//                   <td className="p-4 text-center border-r border-slate-200 text-slate-700 print:p-1.5 font-black">{data2025.total}</td>
//                   <td className="p-4 text-center print:p-1.5 font-black">{globalTotalDiff}</td>
//                 </tr>
//                 {allBrandsData.map((row, idx) => (
//                   <tr key={idx} className="print:break-inside-avoid">
//                     <td className="p-3 border-r border-slate-50 print:p-1.5">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: row.color }} />
//                         <span className="font-black text-[#1E3A5F] uppercase truncate text-xs print:text-[10px]">{row.brand}</span>
//                       </div>
//                     </td>
//                     <td className="p-3 text-center border-r border-slate-50 text-[#00529B] font-black print:p-1.5 leading-none">
//                       {row.c26} <br/><span className="text-[10px] opacity-40 print:text-[8px]">({row.p26}%)</span>
//                     </td>
//                     <td className="p-3 text-center border-r border-slate-50 text-slate-700 font-bold print:p-1.5 leading-none">
//                       {row.c25} <br/><span className="text-[10px] opacity-40 print:text-[8px]">({row.p25}%)</span>
//                     </td>
//                     <td className="p-3 text-center print:p-1.5 font-black">
//                       <span className={row.countDiff > 0 ? 'text-emerald-600' : row.countDiff < 0 ? 'text-rose-600' : 'text-slate-400'}>
//                         {row.countDiff > 0 ? '+' : ''}{row.countDiff}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };