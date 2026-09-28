import type { InstrumentId, Timeframe } from "./types";

export type InstrumentMeta = {
  id: InstrumentId;
  label: string;
  name: string;
  yahoo: string;
  yahooAlt?: string;
  tv: string;
  decimals: number;
  pip: number;
};

export const INSTRUMENTS: InstrumentMeta[] = [
  {
    id: "US30",
    label: "US30",
    name: "Dow Jones",
    yahoo: "YM=F",
    yahooAlt: "^DJI",
    tv: "FOREXCOM:US30",
    decimals: 1,
    pip: 1,
  },
  {
    id: "US100",
    label: "US100",
    name: "Nasdaq 100",
    yahoo: "NQ=F",
    yahooAlt: "^NDX",
    tv: "FOREXCOM:NSXUSD",
    decimals: 1,
    pip: 0.25,
  },
  {
    id: "GBPUSD",
    label: "GBPUSD",
    name: "Cable",
    yahoo: "GBPUSD=X",
    tv: "OANDA:GBPUSD",
    decimals: 5,
    pip: 0.0001,
  },
  {
    id: "GOLD",
    label: "GOLD",
    name: "XAUUSD",
    yahoo: "GC=F",
    tv: "OANDA:XAUUSD",
    decimals: 2,
    pip: 0.1,
  },
  {
    id: "SILVER",
    label: "SILVER",
    name: "XAGUSD",
    yahoo: "SI=F",
    tv: "OANDA:XAGUSD",
    decimals: 3,
    pip: 0.01,
  },
  {
    id: "OILCASH",
    label: "OIL",
    name: "WTI cash",
    yahoo: "CL=F",
    tv: "TVC:USOIL",
    decimals: 2,
    pip: 0.01,
  },
];

export const INSTRUMENT_MAP: Record<InstrumentId, InstrumentMeta> = Object.fromEntries(
  INSTRUMENTS.map((item) => [item.id, item]),
) as Record<InstrumentId, InstrumentMeta>;

export const TIMEFRAME_META: Record<
  Timeframe,
  { label: string; tv: string; minutes: number }
> = {
  "15m": { label: "15m", tv: "15", minutes: 15 },
  "30m": { label: "30m", tv: "30", minutes: 30 },
  "1h": { label: "1H", tv: "60", minutes: 60 },
};

export function formatPrice(instrumentId: InstrumentId, value: number): string {
  const decimals = INSTRUMENT_MAP[instrumentId].decimals;
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatSigned(instrumentId: InstrumentId, value: number): string {
  const abs = formatPrice(instrumentId, Math.abs(value));
  if (value > 0) return `+${abs}`;
  if (value < 0) return `-${abs}`;
  return abs;
}
