import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { analyzeChart, buildScan } from "@/lib/analysis/engine";
import { INSTRUMENT_IDS, TIMEFRAMES, type InstrumentId, type Timeframe } from "./types";
import { INSTRUMENTS } from "./symbols";

const chartInput = z.object({
  instrumentId: z.enum(INSTRUMENT_IDS),
  timeframe: z.enum(TIMEFRAMES),
});

async function mapPool<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      out[index] = await fn(items[index]!);
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );
  return out;
}

export const getChartData = createServerFn({ method: "POST" })
  .validator(chartInput)
  .handler(async ({ data }) => {
    const { loadSeries } = await import("./yahoo.server");
    const { candles, quote } = await loadSeries(data.instrumentId, data.timeframe);
    return analyzeChart(data.instrumentId, data.timeframe, candles, quote);
  });

export const getMarketScan = createServerFn({ method: "POST" }).handler(async () => {
  const { loadSeries } = await import("./yahoo.server");
  const jobs = INSTRUMENTS.flatMap((instrument) =>
    TIMEFRAMES.map((timeframe) => ({
      instrumentId: instrument.id as InstrumentId,
      timeframe: timeframe as Timeframe,
    })),
  );
  const charts = await mapPool(jobs, 4, async (job) => {
    const { candles, quote } = await loadSeries(job.instrumentId, job.timeframe);
    return analyzeChart(job.instrumentId, job.timeframe, candles, quote);
  });
  return buildScan(charts);
});
