import React from 'react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  categories: Category[];
}

export const Navbar = ({ activeCategory, setActiveCategory, categories }: NavbarProps) => (
  <nav className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-2xl border-b border-slate-100 shadow-sm">
    <div className="max-w-[1600px] mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between h-16 md:h-20">
        
        {/* Tugmalar konteyneri: Mobil qurilmada scroll bo'ladi, kompyuterda oddiy turadi */}
        <div className="w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-2 md:gap-4 flex-nowrap min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-wider transition-all whitespace-nowrap border-2",
                  activeCategory === cat.id
                    ? "bg-[#1E3A5F] text-white border-[#1E3A5F] shadow-md scale-105"
                    : "bg-white text-slate-600 border-transparent hover:border-slate-200 hover:bg-slate-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
    
    {/* Mobil uchun pastda yengil soya effekti (scroll borligini bildirish uchun) */}
    <style jsx>{`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}</style>
  </nav>
);