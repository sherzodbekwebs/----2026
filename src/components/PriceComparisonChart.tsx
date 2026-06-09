import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign, ExternalLink } from 'lucide-react';
import { TrailerSpec } from '../types';

const categoryImages: Record<string, string> = {
  'curtain-3': '/uat3os.png',
  'curtain-4': '/uat4.png',
  'container-3': '/kuat3.png',
  'container-4': '/kuat4.png',
  'reefer-3': '/ref.png',
  'flatbed-container': '/vollkraft_bort.png',
};

interface PriceComparisonChartProps {
  data: TrailerSpec[];
  activeCategory: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-4 md:p-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-none outline-none z-50">
        <div className="flex flex-col gap-1">
          <div className="text-slate-900 text-xs font-black uppercase mb-1">{data.name}</div>
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] font-bold uppercase">Цена :</span>
            <span className="text-[#1E3A5F] text-lg font-black leading-tight">
              {data.priceUsd?.toLocaleString()}
            </span>
          </div>
          {data.priceR && (
            <div className="text-slate-400 text-xs font-bold">{data.priceR.toLocaleString()} ₽</div>
          )}
          {data.source && (
            <div className="mt-2 pt-2 border-t border-slate-50 text-[9px] md:text-[10px] text-blue-500 font-black flex items-center gap-1 uppercase tracking-wider">
              Нажмите для перехода <ExternalLink size={10} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export const PriceComparisonChart = ({ data, activeCategory }: PriceComparisonChartProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const chartData = data
    .filter(item => item.priceUsd !== null && item.priceUsd !== undefined)
    .map(item => ({
      name: item.brand,
      priceUsd: item.priceUsd as number,
      priceR: item.priceR,
      source: item.from,
    })).sort((a, b) => b.priceUsd - a.priceUsd);

  const renderCustomBarLabel = (props: any) => {
    const { x, y, width, value, index } = props;
    const item = chartData && chartData[index];
    if (!item) return null;

    return (
      <g>
        {/* Dollarda narxi - Tepada (Belgisiz) */}
        <text
          x={x + width / 2}
          y={y - 24} // Dollarni tepaga ko'tardik
          fill="#1E3A5F"
          textAnchor="middle"
          className="select-none font-black"
          fontSize={isMobile ? 8 : 12}
        >
          {value ? value.toLocaleString() : ''}
        </text>
        {/* Rublda narxi - Pastda (Dollar tagida) */}
        {item.priceR && (
          <text
            x={x + width / 2}
            y={y - 8}
            fill="#94A3B8"
            textAnchor="middle"
            className="select-none font-bold"
            fontSize={isMobile ? 7 : 10}
          >
            {`${item.priceR.toLocaleString()} ₽`}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="bg-white p-4 md:p-10 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm mb-8 md:mb-12 overflow-hidden">
      <div className="flex flex-row items-center justify-between mb-6 md:mb-14">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-9 h-9 md:w-14 md:h-14 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <CircleDollarSign className="w-5 h-5 md:w-7 md:h-7 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-sm md:text-2xl font-black text-[#1E3A5F] tracking-tighter leading-none mb-1">
              Сравнение цен
            </h4>
            <p className="text-[7px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Нажмите для перехода
            </p>
          </div>
        </div>

        <div className="relative shrink-0">
          <img
            className="w-20 md:w-60 h-auto object-contain drop-shadow-2xl"
            src={categoryImages[activeCategory] || '/uat3os.png'}
            alt="Trailer Type"
          />
        </div>
      </div>

      <div className="h-[380px] md:h-[450px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 40,
                right: isMobile ? 10 : 20,
                left: isMobile ? -25 : 10,
                bottom: isMobile ? 65 : 30
              }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={isMobile ? -45 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 90 : 30}
                tick={{
                  fill: '#1E293B', // To'q brand ranglari
                  fontSize: isMobile ? 8 : 11,
                  fontWeight: 900
                }}
              />

              <YAxis
                hide={isMobile}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#CBD5E1', fontSize: 11, fontWeight: 700 }}
                tickFormatter={(value) => value.toLocaleString()} // Bu yerdan ham $ olib tashlandi
                width={80}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(59, 130, 246, 0.04)', radius: 12 }}
                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
              />

              <Bar
                dataKey="priceUsd"
                fill="url(#barGradient)"
                radius={[8, 8, 4, 4]}
                barSize={isMobile ? 16 : 48}
                label={renderCustomBarLabel}
                className="cursor-pointer"
                onClick={(entry) => {
                  if (entry.source) {
                    window.open(entry.source, '_blank', 'noopener,noreferrer');
                  }
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 font-bold uppercase text-[10px]">
            Нет данных по ценам
          </div>
        )}
      </div>
    </div>
  );
};




// import React, { useEffect, useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { CircleDollarSign, ExternalLink } from 'lucide-react';
// import { TrailerSpec } from '../types';

// const categoryImages: Record<string, string> = {
//   'curtain-3': '/uat3os.png',
//   'curtain-4': '/uat4.png',
//   'container-3': '/kuat3.png',
//   'container-4': '/kuat4.png',
//   'reefer-3': '/ref.png',
//   'flatbed-container': '/inter_trailer_bort.png',
// };

// interface PriceComparisonChartProps {
//   data: TrailerSpec[];
//   activeCategory: string;
// }

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className="bg-white p-4 rounded-[24px] shadow-xl border-none outline-none z-50">
//         <div className="flex flex-col gap-1">
//           <div className="text-slate-900 text-xs font-black uppercase mb-1">{data.name}</div>
//           <div className="flex flex-col">
//             <span className="text-slate-400 text-[10px] font-bold uppercase">Цена :</span>
//             <span className="text-[#1E3A5F] text-lg font-black leading-tight">
//               {data.priceUsd?.toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return null;
// };

// export const PriceComparisonChart = ({ data, activeCategory }: PriceComparisonChartProps) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const chartData = data
//     .filter(item => item.priceUsd !== null && item.priceUsd !== undefined)
//     .map(item => ({
//       name: item.brand,
//       priceUsd: item.priceUsd as number,
//       priceR: item.priceR,
//       source: item.from,
//     })).sort((a, b) => b.priceUsd - a.priceUsd);

//   const renderCustomBarLabel = (props: any) => {
//     const { x, y, width, value, index } = props;
//     const item = chartData && chartData[index];
//     if (!item) return null;
//     return (
//       <g>
//         <text x={x + width / 2} y={y - 20} fill="#1E3A5F" textAnchor="middle" className="font-black" fontSize={isMobile ? 8 : 11}>
//           {value ? value.toLocaleString() : ''}
//         </text>
//         {item.priceR && (
//           <text x={x + width / 2} y={y - 6} fill="#94A3B8" textAnchor="middle" className="font-bold" fontSize={isMobile ? 7 : 9}>
//             {`${item.priceR.toLocaleString()} ₽`}
//           </text>
//         )}
//       </g>
//     );
//   };

//   return (
//     // MUHIM: print:break-inside-avoid grafikni betning o'rtasida kesilib qolishidan asraydi
//     <div className="bg-white p-4 md:p-10 rounded-[32px] border border-slate-100 shadow-sm mb-8 overflow-hidden print:shadow-none print:border-slate-200 print:break-inside-avoid print:mt-10">
//       <div className="flex flex-row items-center justify-between mb-6 md:mb-10 print:mb-4">
//         <div className="flex items-center gap-4">
//           <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0 print:border print:border-emerald-100">
//             <CircleDollarSign className="w-6 h-6 md:w-7 md:h-7 text-emerald-500" />
//           </div>
//           <div>
//             <h4 className="text-lg md:text-2xl font-black text-[#1E3A5F] tracking-tighter leading-none mb-1">
//               Сравнение цен
//             </h4>
//             <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-widest print:hidden">
//               Нажмите для перехода
//             </p>
//           </div>
//         </div>

//         <div className="relative shrink-0">
//           <img
//             className="w-20 md:w-52 h-auto object-contain drop-shadow-2xl print:w-40"
//             src={categoryImages[activeCategory] || '/uat3os.png'}
//             alt="Trailer Type"
//           />
//         </div>
//       </div>

//       <div className="h-[350px] md:h-[400px] w-full flex items-center justify-center">
//         {chartData.length > 0 ? (
//           <>
//             {/* Ekranda chiqadigan Responsive Container */}
//             <ResponsiveContainer width="100%" height="100%" className="print:hidden">
//               <BarChart data={chartData} margin={{ top: 30, right: 10, left: -20, bottom: 20 }}>
//                 <defs>
//                   <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
//                     <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#1E293B', fontSize: 10, fontWeight: 900 }} />
//                 <YAxis hide axisLine={false} tickLine={false} />
//                 <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.04)', radius: 8 }} />
//                 <Bar dataKey="priceUsd" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={isMobile ? 20 : 40} label={renderCustomBarLabel} />
//               </BarChart>
//             </ResponsiveContainer>

//             {/* FAQAT PECHAT/PDF UCHUN (Fixed size BarChart) */}
//             <div className="hidden print:block">
//               <BarChart width={700} height={300} data={chartData} margin={{ top: 40, right: 20, left: 10, bottom: 20 }}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fill: '#1E293B', fontSize: 9, fontWeight: 900 }} />
//                 <YAxis hide />
//                 <Bar dataKey="priceUsd" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={35} label={renderCustomBarLabel} isAnimationActive={false} />
//               </BarChart>
//             </div>
//           </>
//         ) : (
//           <div className="text-slate-400 font-bold uppercase text-[10px]">Нет данных</div>
//         )}
//       </div>
//     </div>
//   );
// };