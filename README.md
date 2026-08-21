# Orion-Dashboard

## 1. Project Summary

Orion-Dashboard is the standalone operator console for the Orion IV&V workflow.

- Its `webui/` package is a Next.js app-router frontend written in TypeScript and React.
- It talks to Orion-Server over the documented REST API and Server-Sent Events contract.
- It does not link the HAL or participate in the embedded image.
- The console is organized around one server, one target, and an operator who needs to configure, start, monitor, inspect, and report on validation work.

The workspace contains dashboard, modules, runs, live-run, logs, reporting, and settings routes.

- Shared API code covers health, target information, module catalogs, run lifecycle, results, logs, OTA-related settings, and comparisons.
- The live-run reducer and `useLiveRunStream` hook turn SSE events into deduplicated UI state.
- The module workspace supports test-plan editing and charts.
- The app includes connection status, execution modes `single_shot`, `monitoring`, `event`, and `long_run`, start/stop controls, and configurable platform naming.

Vitest tests exercise pure utilities and live-run state transitions.

- Browser-free Python contract tests exercise Server health, run creation, settings, and streaming write/read behavior against a configured endpoint.
- The audit records the need for a live Server for contract execution and remaining lint issues in the peripheral AI page.
- Commands below are repository procedures, not claims of a completed browser session.

## 2. Feature Status

| # | Name / Description | Implemented? | Test Coverage? | Manual Test |
|---:|---|---|---|---|
| 1 | Next.js/TypeScript operator console shell | Implemented | Partial: type-check and component code | [ ] Manual verification required |
| 2 | Dashboard, module, run, log, report, and settings routes | Implemented | Partial: focused tests; routes limited | [ ] Manual verification required |
| 3 | REST API client for Orion-Server | Implemented | Partial: Python contracts cover selected endpoints | [ ] Manual verification required |
| 4 | SSE live-run stream and reducer | Implemented | Covered by `webui/lib/live-run/reducer.test.ts` | [ ] Manual verification required |
| 5 | Run modes and lifecycle controls | Implemented | Partial: contract tests cover requests | [ ] Manual verification required |
| 6 | Module catalog, test plans, and charts | Implemented | Unknown: complete UI workflow not found | [ ] Manual verification required |
| 7 | Connection indicator and target health | Implemented | Partial: health contract exists | [ ] Manual verification required |
| 8 | Vitest utility and reducer tests | Implemented | Covered by `npm run test` in `webui/` | [ ] Manual verification required |
| 9 | Python REST/SSE contract suite | Implemented | Covered when Server is available | [ ] Manual verification required |
| 10 | AI assistant page | Partial | Partial: audit records two lint errors | [ ] Manual verification required |

## 3. Build and Test

```bash
cd webui && npm run typecheck && npm run test && npm run lint
make contract-test
```

See `webui/README.md`, `docs/WEB_FINDINGS.md`, and `docs/AUDIT.md`.
