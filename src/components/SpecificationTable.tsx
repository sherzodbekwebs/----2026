import React from 'react';
import { TrailerSpec } from '../types';
import { ExternalLink } from 'lucide-react'; // Link ikonkasi uchun

export const SpecificationTable = ({ data }: { data: TrailerSpec[] }) => {
  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-8 md:mb-12 select-none print:border-none">
      <div className="p-4 md:p-6 border-b border-slate-100 bg-white">
        <h4 className="text-base md:text-xl font-black text-[#1E3A5F] tracking-tighter uppercase">
          Технические xарактеристики
        </h4>
      </div>

      <div className="w-full">
        <table className="w-full text-left border-separate border-spacing-0 border-l border-t border-slate-100">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="p-3 text-[9px] md:text-[11px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200 w-[40px]">№</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200">Наименование</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-[#1E3A5F] uppercase border-r border-b border-slate-200 w-[180px]">Фото</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Оси</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Цена</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Масса, кг</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Объём</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200 w-[20%]">Тормозная система</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Г/п, тн</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200 w-[22%]">Размеры</th>
              
              {/* Commentdagilar ochilmadi, lekin o'z joyiga qaytarildi: */}
              {/* 
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Подвеска</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Оси (Бренд)</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Окраска</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-slate-800 uppercase border-r border-b border-slate-200">Надстройка</th>
              <th className="p-3 text-[9px] md:text-[11px] font-black text-[#3B82F6] uppercase border-r border-b border-slate-200">Источник</th> 
              */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="hover:bg-slate-50/50 group transition-colors">
                <td className="p-3 text-[10px] md:text-[12px] font-black text-slate-400 border-r border-b border-slate-100 text-center">{index + 1}</td>
                <td className="p-3 text-[11px] md:text-[14px] font-black text-[#1E3A5F] border-r border-b border-slate-100 uppercase leading-tight">{item.brand}</td>
                <td className="p-2 border-r border-b border-slate-100">
                  <div className="flex items-center justify-center">
                    <img src={item.foto} alt={item.brand} className="max-w-full h-12 md:h-20 object-contain drop-shadow-md" />
                  </div>
                </td>
                <td className="p-3 text-[10px] md:text-[12px] font-black text-slate-800 border-r border-b border-slate-100 text-center">{item.type}</td>
                <td className="p-3 border-r border-b border-slate-100">
                  <p className="text-[10px] md:text-[11px] font-black text-emerald-600 leading-none mb-1">{item.priceSum || '—'}</p>
                  <p className="text-[12px] md:text-[14px] font-black text-[#1E3A5F]">{item.priceUsd ? `$${item.priceUsd.toLocaleString()}` : '—'}</p>
                </td>
                <td className="p-3 text-[10px] md:text-[12px] font-black text-slate-800 border-r border-b border-slate-100 text-center">{item.mass}</td>
                <td className="p-3 text-[10px] md:text-[12px] font-black text-slate-800 border-r border-b border-slate-100 text-center">{item.volume} м³</td>
                <td className="p-3 text-[10px] md:text-[12px] font-bold text-slate-600 border-r border-b border-slate-100 leading-tight">{item.braking}</td>
                <td className="p-3 text-[10px] md:text-[12px] font-black text-[#1E3A5F] border-r border-b border-slate-100 text-center">{item.loadCapacity}</td>
                <td className="p-3 text-[10px] md:text-[12px] font-bold text-slate-600 border-r border-b border-slate-100 leading-tight">{item.dimensions}</td>
                
                {/* Commentlar: Ma'lumotlar o'z joyiga qaytarildi */}
                {/* 
                <td className="p-3 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.suspension}</td>
                <td className="p-3 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.axleBrand}</td>
                <td className="p-3 text-[10px] md:text-[13px] font-bold text-slate-700 max-w-[150px] md:max-w-[220px] leading-tight border-r border-b border-slate-100">{item.painting}</td>
                <td className="p-3 text-[10px] md:text-[13px] font-bold text-slate-700 border-r border-b border-slate-100">{item.superstructure}</td>
                <td className="p-3 border-r border-b border-slate-100 text-center">
                  <span className="text-[10px] md:text-[12px] font-bold text-slate-500 mb-1 block">{item.source}</span>
                  {item.from ? (
                    <a
                      href={item.from}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Источник <ExternalLink size={12} />
                    </a>
                  ) : <span className="text-slate-300">—</span>}
                </td> 
                */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};