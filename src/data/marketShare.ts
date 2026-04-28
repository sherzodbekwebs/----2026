import { MarketShareData } from '../types';

type RecordItem = {
  brand: string;
  count: number;
  color: string;
};

/**
 * Bozor ulushini avtomatik hisoblovchi yordamchi funksiya
 */
function buildMarketData(
  period: string,
  total: number,
  data: RecordItem[]
): MarketShareData {
  // 1. Kiruvchi brendlarni soni bo'yicha saralaymiz (Kattadan kichikka)
  const sortedData = [...data].sort((a, b) => b.count - a.count);

  // 2. Berilgan brendlar yig'indisini hisoblaymiz
  const sum = sortedData.reduce((acc, item) => acc + item.count, 0);

  // 3. "ДРУГИЕ" (Boshqalar) qoldig'ini hisoblaymiz
  const othersCount = total - sum;

  const finalRecords = [...sortedData];

  // Agar qoldiq bo'lsa, ro'yxat oxiriga "ДРУГИЕ"ni qo'shamiz
  if (othersCount > 0) {
    finalRecords.push({
      brand: 'ДРУГИЕ',
      count: othersCount,
      color: '#8E8E93',
    });
  }

  // 4. Har bir brend uchun foizni avtomatik hisoblaymiz
  const records = finalRecords.map((item) => ({
    ...item,
    // (Birlar soni / Jami soni) * 100 -> 1 ta o'nlik belgi bilan (toFixed(1))
    percentage: Number(((item.count / total) * 100).toFixed(1)),
  }));

  return {
    period,
    total,
    records,
  };
}

// ==========================================
// 2025 YIL MA'LUMOTLARI (Total: 1632)
// ==========================================
export const MARKET_SHARE_2025: MarketShareData = buildMarketData(
  '3 мес. 2025',
  1632,
  [
    { brand: 'ТОНАР', count: 445, color: '#E31E24' },
    { brand: 'КАМАЗ', count: 256, color: '#00529B' },
    { brand: 'WAGNERMAIER', count: 151, color: '#6C2483' },
    { brand: 'UAT', count: 149, color: '#009EE3' },
    { brand: 'KAESSBOHRER', count: 140, color: '#7b1fa2' },
    { brand: 'KRONE', count: 136, color: '#006F45' },
    { brand: 'GRUNWALD', count: 81, color: '#633918' },
    { brand: 'ORTHAUS', count: 72, color: '#91C024' },
    { brand: 'BONUM', count: 59, color: '#F39200' },
    { brand: 'SOTRANS', count: 50, color: '#ff5722' },
    { brand: 'TITAN', count: 29, color: '#795548' },
    { brand: 'CIMC', count: 28, color: '#009688' },
    { brand: 'GUT TRAILER', count: 18, color: '#607d8b' }, // Tuzatildi
    { brand: 'KOLUMAN', count: 10, color: '#3f51b5' },    // Tuzatildi
    { brand: 'НОВТРАК', count: 5, color: '#005596' },     // Tuzatildi
    { brand: 'ЦТТМ', count: 3, color: '#2E3192' },        // Tuzatildi
  ]
);

// ==========================================
// 2026 YIL MA'LUMOTLARI (Total: 1068)
// ==========================================
export const MARKET_SHARE_2026: MarketShareData = buildMarketData(
  '3 мес. 2026',
  1068,
  [
    { brand: 'BONUM', count: 193, color: '#F39200' },
    { brand: 'ТОНАР', count: 183, color: '#E31E24' },
    { brand: 'КАМАЗ', count: 163, color: '#00529B' },
    { brand: 'ЦТТМ', count: 116, color: '#2E3192' },
    { brand: 'WAGNERMAIER', count: 100, color: '#6C2483' },
    { brand: 'ORTHAUS', count: 60, color: '#91C024' },
    { brand: 'НОВТРАК', count: 59, color: '#005596' },
    { brand: 'GRUNWALD', count: 51, color: '#633918' },
    { brand: 'UAT', count: 35, color: '#009EE3' },
    { brand: 'KRONE', count: 35, color: '#006F45' },
    { brand: 'SOTRANS', count: 16, color: '#ff5722' },
    { brand: 'FLIEGL', count: 15, color: '#4caf50' },
    { brand: 'CIMC', count: 13, color: '#009688' },
    { brand: 'KAILE', count: 10, color: '#ffeb3b' },
    { brand: 'KOLUMAN', count: 9, color: '#3f51b5' },
    { brand: 'GUT TRAILER', count: 8, color: '#607d8b' },
  ]
);