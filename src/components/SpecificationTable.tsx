import React, { useRef, useState } from 'react';
import { TrailerSpec } from '../types';

export const SpecificationTable = ({ data }: { data: TrailerSpec[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Mouse Drag funksiyalari
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="bg-white rounded-[10px] md:rounded-[10px] border border-slate-200 shadow-sm overflow-hidden mb-8 md:mb-12 select-none">
      <div className="p-4 md:p-8 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white">
        <h4 className="text-lg md:text-xl font-black text-[#1E3A5F]  tracking-tighter ">
          Технические Характеристики
        </h4>
        <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-slate-50 rounded-lg md:rounded-xl text-[9px] md:text-[11px] font-black text-slate-500 uppercase">
          <span className="hidden sm:inline">Сравнение всех моделей в категории</span>
          <span className="sm:hidden">Сравнение моделей</span>
        </div>
      </div>

      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`overflow-x-auto touch-pan-x scrollbar-thin scrollbar-thumb-slate-200 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <table className="w-full text-left border-separate border-spacing-0 min-w-[1200px] lg:min-w-[2200px] border-l border-t border-slate-100">
          <thead>
            <tr className="bg-slate-50/80">
              {/* Sticky ustunlar: Mobil ekran kengligiga qarab left qiymatlari */}
              <th className="sticky left-0 z-30 bg-slate-50 p-3 md:p-5 text-[10px] md:text-[12px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200 w-[40px] md:w-[60px] min-w-[40px] md:min-w-[60px]">№</th>
              <th className="sticky left-[40px] md:left-[60px] z-30 bg-slate-50 p-3 md:p-5 text-[10px] md:text-[12px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200 w-[120px] md:w-[200px] min-w-[120px] md:min-w-[200px]">Наименование</th>
              <th className="sticky left-[160px] md:left-[260px] z-30 bg-slate-50 p-3 md:p-5 text-[10px] md:text-[12px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200 w-[120px] md:w-[250px] min-w-[120px] md:min-w-[250px] shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">Фото</th>

              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Кол-во осей</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Цена</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Масса, кг</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Объём</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Тормозная система</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Г/п, тн</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Размеры</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Подвеска</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Оси</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Окраска</th>
              <th className="p-3 md:p-5 text-[10px] md:text-[12px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Надстройка</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="sticky left-0 z-20 bg-white group-hover:bg-slate-50 p-3 md:p-5 text-xs md:text-sm font-black text-slate-400 border-r border-b border-slate-100">{index + 1}</td>
                <td className="sticky left-[40px] md:left-[60px] z-20 bg-white group-hover:bg-slate-50 p-3 md:p-5 text-xs md:text-[15px] font-black text-[#1E3A5F] border-r border-b border-slate-100 uppercase leading-tight">{item.brand}</td>
                <td className="sticky left-[160px] md:left-[260px] z-20 bg-white group-hover:bg-slate-50 p-2 md:p-5 border-r border-b border-slate-100 shadow-[1px_0_0_0_rgba(0,0,0,0.05)]">
                  <div className="w-24 md:w-48 h-auto flex items-center justify-center pointer-events-none">
                    <img src={item.foto} alt={item.brand} className="max-w-full h-auto object-contain" />
                  </div>
                </td>

                <td className="p-3 md:p-5 text-xs md:text-sm font-black text-slate-800 border-r border-b border-slate-100">{item.type}</td>
                <td className="p-3 md:p-5 border-r border-b border-slate-100">
                  <p className="text-[10px] md:text-[12px] font-black text-emerald-600 whitespace-nowrap">{item.priceSum || '—'}</p>
                  <p className="text-[12px] md:text-[14px] font-black text-[#1E3A5F]">{item.priceUsd ? `$${item.priceUsd.toLocaleString()}` : 'По запросу'}</p>
                </td>
                <td className="p-3 md:p-5 text-xs md:text-sm font-black text-slate-800 border-r border-b border-slate-100">{typeof item.mass === 'number' ? item.mass.toLocaleString() : item.mass}</td>
                <td className="p-3 md:p-5 text-xs md:text-sm font-black text-slate-800 border-r border-b border-slate-100">{item.volume} м³</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 max-w-[150px] md:max-w-[220px] leading-tight border-r border-b border-slate-100">{item.braking}</td>
                <td className="p-3 md:p-5 text-xs md:text-sm font-black text-[#1E3A5F] border-r border-b border-slate-100">{item.loadCapacity}</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 max-w-[120px] md:max-w-[180px] leading-relaxed border-r border-b border-slate-100">{item.dimensions}</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.suspension}</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.axleBrand}</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 max-w-[150px] md:max-w-[220px] leading-tight border-r border-b border-slate-100">{item.painting}</td>
                <td className="p-3 md:p-5 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.superstructure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};