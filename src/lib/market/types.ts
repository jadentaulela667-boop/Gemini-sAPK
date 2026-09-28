export const INSTRUMENT_IDS = [
  "US30",
  "US100",
  "GBPUSD",
  "GOLD",
  "SILVER",
  "OILCASH",
] as const;

export type InstrumentId = (typeof INSTRUMENT_IDS)[number];

export const TIMEFRAMES = ["15m", "30m", "1h"] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];

export const STRATEGIES = ["harmonic", "wolfe", "sr"] as const;
export type StrategyId = (typeof STRATEGIES)[number];

export type Side = "buy" | "sell";
export type SignalStatus = "active" | "watch" | "expired";

export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

export type PatternPoint = {
  label: string;
  time: number;
  price: number;
  index: number;
};

export type OverlayLine = {
  id: string;
  points: { time: number; price: number }[];
  style: "solid" | "dashed";
  role: "pattern" | "trend" | "epa";
};

export type PriceLevel = {
  price: number;
  label: string;
  kind: "support" | "resistance" | "entry" | "stop" | "target" | "pivot";
};

export type TradeSignal = {
  id: string;
  instrumentId: InstrumentId;
  timeframe: Timeframe;
  side: Side;
  strategy: StrategyId;
  patternName: string;
  status: SignalStatus;
  quality: number;
  entry: number;
  stop: number;
  targets: number[];
  rr: number;
  formedAt: number;
  notes: string;
  confluence: string[];
  points: PatternPoint[];
  lines: OverlayLine[];
  levels: PriceLevel[];
};

export type Quote = {
  instrumentId: InstrumentId;
  price: number;
  previousClose: number;
  changePct: number;
  currency: string;
  updatedAt: number;
};

export type ChartPayload = {
  instrumentId: InstrumentId;
  timeframe: Timeframe;
  candles: Candle[];
  quote: Quote;
  signals: TradeSignal[];
  levels: PriceLevel[];
  atr: number;
};

export type ScanPayload = {
  generatedAt: number;
  quotes: Quote[];
  signals: TradeSignal[];
  charts: ChartPayload[];
};
