
export interface TrailerSpec {
  id: number;
  brand: string;
  type: string;
  priceSum: string | null;
  priceUsd: number | null;
  mass: number | string;
  volume: string | number;
  electrical: string;
  braking: string;
  loadCapacity: string;
  dimensions: string;
  suspension: string;
  axleBrand: string;
  painting: string;
  tires: string;
  roof: string;
  superstructure: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface MarketShareRecord {
  brand: string;
  count: number;
  percentage: number;
  color?: string;
}

export interface MarketShareData {
  period: string;
  total: number;
  records: MarketShareRecord[];
}
