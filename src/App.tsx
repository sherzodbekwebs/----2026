// import React from 'react';
// import { Truck, ArrowRight, CircleDollarSign, Info } from 'lucide-react';
// import { TRAILER_DATA, CATEGORIES } from './data/trailers';
// import { Navbar } from './components/Navbar';
// import { FadeIn } from './components/FadeIn';
// import { PriceComparisonChart } from './components/PriceComparisonChart';
// import { SpecificationTable } from './components/SpecificationTable';
// import { MarketShareAnalytics } from './components/MarketShareAnalytics';
// import { MARKET_SHARE_2025, MARKET_SHARE_2026 } from './data/marketShare';

// export default function App() {
//   const [activeCategory, setActiveCategory] = React.useState('curtain-3');
//   const filteredData = TRAILER_DATA.filter(item => item.category === activeCategory);
//   const currentCategory = CATEGORIES.find(c => c.id === activeCategory);
//   const isCurtain = activeCategory.startsWith('curtain');

//   return (
//     <div className="selection:bg-[#00529B] selection:text-white bg-[#F8F9FA] min-h-screen">
//       <Navbar
//         activeCategory={activeCategory}
//         setActiveCategory={setActiveCategory}
//         categories={CATEGORIES}
//       />

//       {/* Main qismi paddinglari mobil uchun moslashtirildi */}
//       <main className="pt-32 md:pt-30 pb-12 md:pb-20 px-4 md:px-10">
//         <div className="max-w-[1600px] mx-auto">

//           {/* Header */}
//           <FadeIn className="mb-6 md:mb-10 flex flex-col items-center text-center">
//             <div className="flex items-center gap-2 md:gap-3 mb-4">
//               <h2 className="text-[9px] md:text-[13px] font-black text-[#00529B]  tracking-[0.3em] md:tracking-[0.4em]">
//                 {currentCategory?.label}
//               </h2>
//             </div>
//             {/* text-4xl dan text-7xl gacha o'zgaradi */}
//             <h3 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-[#1E3A5F]  tracking-tighter leading-[0.9] mb-6">
//               Анализ <br className="sm:hidden" />
//               <span className="">рынка 2026 (янв-март)</span>
//             </h3>
//           </FadeIn>

//           {/* Market Share qismi */}
//           {activeCategory === 'curtain-3' && (
//             <FadeIn>
//               <MarketShareAnalytics data2025={MARKET_SHARE_2025} data2026={MARKET_SHARE_2026} />
//             </FadeIn>
//           )}

//           {/* Grafika va Jadval */}
//           {filteredData.length > 0 && (
//             <div className="flex flex-col gap-8 md:gap-12">
//               <FadeIn delay={0.1}>
//                 <PriceComparisonChart data={filteredData} activeCategory={activeCategory} />
//               </FadeIn>

//               <FadeIn delay={0.2}>
//                 <SpecificationTable data={filteredData} />
//               </FadeIn>
//             </div>
//           )}

//           {/* Ma'lumot yo'q bo'lgan holat (Empty State) */}
//           {filteredData.length === 0 && (
//             <FadeIn>
//               <div className="text-center py-20 md:py-32 bg-white rounded-[30px] md:rounded-[60px] border border-slate-100 flex flex-col items-center px-6">
//                 <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 md:mb-8">
//                   <Info className="w-6 h-6 md:w-8 md:h-8 text-slate-200" />
//                 </div>
//                 <h3 className="text-xl md:text-2xl font-black text-[#1E3A5F] uppercase tracking-tighter mb-2">
//                   Данные отсутствуют
//                 </h3>
//                 <p className="text-slate-400 text-[10px] md:text-sm font-medium uppercase tracking-widest max-w-md">
//                   Категория в процессе наполнения базой данных 2026
//                 </p>
//               </div>
//             </FadeIn>
//           )}
//         </div>
//       </main>

//     </div>
//   );
// }





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

  return (
    <div className="selection:bg-[#00529B] selection:text-white bg-[#F8F9FA] min-h-screen print:bg-white">
      
      {/* Navbar pechatda ko'rinmasligi kerak */}
      <div className="print:hidden">
        <Navbar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={CATEGORIES}
        />
      </div>

      {/* Main qismi: print paytida pt-32 padding olib tashlanadi */}
      <main className="pt-32 md:pt-30 pb-12 md:pb-20 px-4 md:px-10 print:pt-4 print:px-0">
        <div className="max-w-[1600px] mx-auto">

          {/* Header: PDF sarlavhasi uchun markazlashtirildi */}
          <FadeIn className="mb-6 md:mb-10 flex flex-col items-center text-center print:mb-8">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <h2 className="text-[9px] md:text-[13px] font-black text-[#00529B] tracking-[0.3em] md:tracking-[0.4em] uppercase">
                {currentCategory?.label}
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-[#1E3A5F] tracking-tighter leading-[0.9] mb-4 uppercase print:text-2xl">
              Анализ рынка 2026 <br className="sm:hidden" />
              <span className="text-[#00529B]">(янв-март)</span>
            </h3>
            {/* Pechat qilingan sana (faqat PDFda chiqadi) */}
            <p className="hidden print:block text-[10px] text-slate-400 font-bold uppercase">
              Отчет сформирован: {new Date().toLocaleDateString()}
            </p>
          </FadeIn>

          {/* Market Share: Faqat tanlangan kategoriya uchun */}
          {activeCategory === 'curtain-3' && (
            <div className="print:block print:mb-10">
              <FadeIn>
                <MarketShareAnalytics data2025={MARKET_SHARE_2025} data2026={MARKET_SHARE_2026} />
              </FadeIn>
            </div>
          )}

          {/* Grafika va Jadval bo'limi */}
          {filteredData.length > 0 && (
            <div className="flex flex-col gap-8 md:gap-12 print:gap-4">
              
              {/* Narxlar grafigi */}
              <div className="print:block print:break-inside-avoid">
                <FadeIn delay={0.1}>
                  <PriceComparisonChart data={filteredData} activeCategory={activeCategory} />
                </FadeIn>
              </div>

              {/* Texnik xarakteristikalar jadvali */}
              <div className="print:block print:mt-4">
                <FadeIn delay={0.2}>
                  <SpecificationTable data={filteredData} />
                </FadeIn>
              </div>
              
            </div>
          )}

          {/* Ma'lumot yo'q bo'lsa (Empty State) */}
          {filteredData.length === 0 && (
            <FadeIn>
              <div className="text-center py-20 bg-white rounded-[30px] border border-slate-100 flex flex-col items-center px-6">
                <Info className="w-10 h-10 text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-[#1E3A5F] uppercase">Данные отсутствуют</h3>
                <p className="text-slate-400 text-sm font-medium uppercase mt-2">
                  Категория в процессе наполнения
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </main>

      {/* PDF Footer (faqat printda chiqadi) */}
      <footer className="hidden print:flex justify-between items-center px-10 py-4 border-t border-slate-100 mt-auto">
        <span className="text-[10px] font-bold text-slate-400 uppercase">Trailer Market Analysis 2026</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">Страница 1</span>
      </footer>

    </div>
  );
}