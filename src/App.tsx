import React from 'react';
import { Truck, ArrowRight, CircleDollarSign, Info } from 'lucide-react';
import { TRAILER_DATA, CATEGORIES } from './data/trailers';
import { Navbar } from './components/Navbar';
import { FadeIn } from './components/FadeIn';
import { PriceComparisonChart } from './components/PriceComparisonChart';
import { SpecificationTable } from './components/SpecificationTable';
import { MarketShareAnalytics } from './components/MarketShareAnalytics';
import { MARKET_SHARE_2025, MARKET_SHARE_2026 } from './data/marketShare';

export default function App() {
  const [activeCategory, setActiveCategory] = React.useState('curtain-3');
  const filteredData = TRAILER_DATA.filter(item => item.category === activeCategory);
  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
  const isCurtain = activeCategory.startsWith('curtain');

  return (
    <div className="selection:bg-[#00529B] selection:text-white bg-[#F8F9FA] min-h-screen">
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={CATEGORIES}
      />

      {/* Main qismi paddinglari mobil uchun moslashtirildi */}
      <main className="pt-32 md:pt-40 pb-12 md:pb-20 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">

          {/* Header */}
          <FadeIn className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00529B] animate-pulse shrink-0" />
              <h2 className="text-[8px] md:text-[10px] font-black text-[#00529B] uppercase tracking-[0.3em] md:tracking-[0.4em]">
                {currentCategory?.label}
              </h2>
            </div>
            {/* text-4xl dan text-7xl gacha o'zgaradi */}
            <h3 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-[#1E3A5F] uppercase tracking-tighter leading-[0.9] mb-6">
              Аналитика <br className="sm:hidden" />
              <span className="text-slate-300">Рынка 2026.</span>
            </h3>
          </FadeIn>

          {/* Market Share qismi */}
          {isCurtain && (
            <FadeIn>
              <MarketShareAnalytics data2025={MARKET_SHARE_2025} data2026={MARKET_SHARE_2026} />
            </FadeIn>
          )}

          {/* Grafika va Jadval */}
          {filteredData.length > 0 && (
            <div className="flex flex-col gap-8 md:gap-12">
              <FadeIn delay={0.1}>
                <PriceComparisonChart data={filteredData} activeCategory={activeCategory} />
              </FadeIn>

              <FadeIn delay={0.2}>
                <SpecificationTable data={filteredData} />
              </FadeIn>
            </div>
          )}

          {/* Ma'lumot yo'q bo'lgan holat (Empty State) */}
          {filteredData.length === 0 && (
            <FadeIn>
              <div className="text-center py-20 md:py-32 bg-white rounded-[30px] md:rounded-[60px] border border-slate-100 flex flex-col items-center px-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 md:mb-8">
                  <Info className="w-6 h-6 md:w-8 md:h-8 text-slate-200" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-[#1E3A5F] uppercase tracking-tighter mb-2">
                  Данные отсутствуют
                </h3>
                <p className="text-slate-400 text-[10px] md:text-sm font-medium uppercase tracking-widest max-w-md">
                  Категория в процессе наполнения базой данных 2026
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 md:py-20 px-6 border-t border-slate-100 mt-10 md:mt-20">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-xl md:text-2xl font-black text-[#1E3A5F] tracking-tighter uppercase mb-2">
            INDUSTRIAL ANALYTICS
          </h2>
          <p className="text-slate-400 font-bold text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em]">
            Expert Market Insight Hub
          </p>
        </div>
      </footer>
    </div>
  );
}