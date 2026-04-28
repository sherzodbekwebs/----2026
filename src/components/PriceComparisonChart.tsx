import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CircleDollarSign } from 'lucide-react';
import { TrailerSpec } from '../types';

// Rasmlar xaritasi
const categoryImages: Record<string, string> = {
  'curtain-3': '/uat3os.png',
  'curtain-4': '/uat4.png',
  'container-3': '/kuat3.png',
  'container-4': '/kuat4.png',
  'reefer-3': '/ref.png',
};

interface PriceComparisonChartProps {
  data: TrailerSpec[];
  activeCategory: string;
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
    <div className="bg-white p-6 md:p-10 rounded-[20px] border border-slate-100 shadow-sm mb-8 md:mb-12">
      <div className="flex items-center justify-between mb-10 md:mb-14">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
            <CircleDollarSign className="w-6 h-6 md:w-7 md:h-7 text-emerald-500" />
          </div>
          <div>
            <h4 className="text-lg md:text-2xl font-black text-[#1E3A5F] uppercase tracking-tighter leading-none mb-1">
              Сравнение цен
            </h4>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
              USD (Текущая стоимость)
            </p>
          </div>
        </div>

        {/* DINAMIK RASM */}
        <div className="relative">
          <img
            className="w-36 md:w-64 h-auto object-contain transition-all duration-700 ease-in-out hover:scale-105 drop-shadow-2xl"
            src={categoryImages[activeCategory] || '/uat3os.png'}
            alt="Trailer Type"
          />
        </div>
      </div>

      <div className="h-[350px] md:h-[450px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 40,
              right: 10,
              left: isMobile ? -10 : 20,
              bottom: isMobile ? 70 : 90
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00529B" stopOpacity={1} />
                <stop offset="100%" stopColor="#1E3A5F" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
            
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              tick={{ fill: '#475569', fontSize: isMobile ? 10 : 13, fontStyle: 'italic', fontWeight: 900 }}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              // "k" olib tashlandi, to'liq formatlandi
              tick={{ fill: '#94A3B8', fontSize: isMobile ? 9 : 12, fontWeight: 700 }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
              width={isMobile ? 50 : 90} 
            />
            
            <Tooltip
              cursor={{ fill: 'rgba(30, 58, 95, 0.03)', radius: 12 }}
              contentStyle={{
                borderRadius: '24px',
                border: 'none',
                boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
                fontSize: '14px',
                fontWeight: 900,
                padding: '16px 20px',
                backgroundColor: '#ffffff'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Цена в USD']}
            />
            
            <Bar
              dataKey="price"
              fill="url(#barGradient)"
              radius={[12, 12, 4, 4]}
              barSize={isMobile ? 24 : 50}
              // Ustundagi yozuvlar ham to'liq songa o'tkazildi
              label={{
                position: 'top',
                fill: '#1E3A5F',
                fontSize: isMobile ? 9 : 12,
                fontWeight: 900,
                formatter: (val: number) => `$${val.toLocaleString()}`,
                offset: 15
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};