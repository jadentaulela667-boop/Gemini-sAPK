# Meridian Terminal

Harmonic-pattern, Wolfe-wave, and support/resistance scanner for **US30**, **US100**, **GBPUSD**, **GOLD**, **SILVER**, and **OIL**.

Live charts, entry/exit levels, and browser notifications when a high-quality buy or sell setup prints.

**Repo:** [https://github.com/jadentaulela667-boop/Jaden1221](https://github.com/jadentaulela667-boop/Jaden1221)

## What it analyses

| Instrument | Market | Chart |
|---|---|---|
| US30 | Dow Jones | FOREXCOM:US30 |
| US100 | Nasdaq 100 | FOREXCOM:NSXUSD |
| GBPUSD | Cable | OANDA:GBPUSD |
| GOLD | XAUUSD | OANDA:XAUUSD |
| SILVER | XAGUSD | OANDA:XAGUSD |
| OIL | WTI cash | TVC:USOIL |

**Timeframes:** 15-minute, 30-minute, 1-hour.

**Strategies**
- Harmonic patterns (Gartley, Bat, Butterfly, Crab, Cypher, Shark)
- Wolfe Waves
- Support and resistance zones

When a setup scores well, the terminal shows:
- **Entry**
- **Stop**
- **Targets** (T1 / T2)
- Direction (**buy** or **sell**)
- Strategy + confidence

Tap a signal to open the matching TradingView chart with those levels in view. Enable notifications in Settings to get an alert when a fresh high-quality signal appears.

Portrait and landscape layouts are both supported.

## Run locally

Requires **Node.js 22+**.

```bash
git clone https://github.com/jadentaulela667-boop/Jaden1221.git
cd Jaden1221
npm install
npm run dev
```

Then open the URL Vite prints (default `http://localhost:8080`).

```bash
npm run typecheck   # TypeScript
npm run build       # production build
```

## Project layout

```
src/
  components/terminal/   UI: scanner, chart, signals, settings
  lib/analysis/          Harmonics, Wolfe waves, S/R engine
  lib/market/            Symbols, Yahoo quotes, timeframes
  routes/                App pages
```

Market candles come from public Yahoo Finance data. Charts are embedded TradingView widgets.

## Disclaimer

This is a **research / charting tool**, not financial advice and not a broker. Patterns can fail. Always manage risk; past structure does not guarantee future results.
