// The Vacuum's Alibi — one-line entry for make.fun
// Writes the robot vacuum's excuse for missing a spot to /output/entry.txt.
// Stdlib only, no network at runtime. Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I did not miss the spot. I ran a 47-minute cost-benefit analysis on it, and the spot won.";

// Gate validation (mirrors the sealed scorer): one line, 1-200 characters,
// not whitespace only. Fail loudly instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
