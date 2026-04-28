import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import { TrailerSpec } from '../types';

// Rasmlar xaritasi (Kategoriya ID-si va unga mos rasm)
const categoryImages: Record<string, string> = {
  'curtain-3': '/uat3os.png',        // Shtorniy 3-osli
  'curtain-4': '/uat4.png',        // Shtorniy 4-osli
  'container-3': '/kuat3.png',  // Konteynerovoz rasm manzili
  'container-4': '/kuat4.png',  // Konteynerovoz 4-osli rasm manzili
  'reefer-3': '/ref.png',     // Ref rasm manzili
};

interface PriceComparisonChartProps {
  data: TrailerSpec[];
  activeCategory: string; // Yangi prop
}

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
    .filter(item => item.priceUsd !== null)
    .map(item => ({
      name: item.brand,
      price: item.priceUsd as number,
    })).sort((a, b) => b.price - a.price);

  return (
    <div className="bg-white p-5 md:p-10 rounded-[10px] border border-slate-100 shadow-sm mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-8 md:mb-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <CircleDollarSign className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-base md:text-xl font-black text-[#1E3A5F] uppercase tracking-tighter leading-none mb-1">
              Сравнение цен
            </h4>
            <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
              USD (Текущая стоимость)
            </p>
          </div>
        </div>

        {/* DINAMIK RASM SHU YERDA */}
        <img
          className="w-32 md:w-52 h-auto object-contain transition-all duration-500"
          src={categoryImages[activeCategory] || '/uat3os.png'} // Agar topilmasa default rasm
          alt="Trailer Type"
        />
      </div>

      <div className="h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 30,
              right: 10,
              left: isMobile ? -20 : 0,
              bottom: isMobile ? 60 : 80
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00529B" stopOpacity={1} />
                <stop offset="100%" stopColor="#1E3A5F" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              tick={{ fill: '#475569', fontSize: isMobile ? 10 : 12, fontWeight: 800 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 12, fontWeight: 700 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={isMobile ? 40 : 60}
            />
            <Tooltip
              cursor={{ fill: 'rgba(241, 245, 249, 0.5)', radius: 10 }}
              contentStyle={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 800,
                padding: '10px 14px'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Цена']}
            />
            <Bar
              dataKey="price"
              fill="url(#barGradient)"
              radius={[8, 8, 2, 2]}
              barSize={isMobile ? 20 : 45}
              label={{
                position: 'top',
                fill: '#1E3A5F',
                fontSize: isMobile ? 10 : 13,
                fontWeight: 900,
                formatter: (val: number) => `$${(val / 1000).toFixed(1)}k`,
                offset: 10
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};