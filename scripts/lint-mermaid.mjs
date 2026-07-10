// Mermaid diagram lint. Mermaid parses client-side at render time, so a bad
// diagram is invisible to `next build` and only blows up on the live page. This
// extracts every ```mermaid block from content/**/*.{md,mdx} and validates it
// with mermaid's own parser (headless, via jsdom) so a syntax error fails the
// build instead. Run: node scripts/lint-mermaid.mjs  (wired into `npm run build`).
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { JSDOM } from "jsdom";

// mermaid needs a DOM to initialize (DOMPurify); jsdom gives it one headlessly.
const dom = new JSDOM("<!doctype html><body></body>", { pretendToBeVisual: true });
globalThis.window = dom.window;
globalThis.document = dom.window.document;

const mermaid = (await import("mermaid")).default;
mermaid.initialize({ startOnLoad: false });

const CONTENT_DIR = "content";

/** Recursively collect .md / .mdx files under a directory. */
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.mdx?$/.test(name)) out.push(p);
  }
  return out;
}

/** Extract each ```mermaid ... ``` block with the 1-based line it starts on. */
function extractBlocks(src) {
  const blocks = [];
  const lines = src.split("\n");
  let inBlock = false;
  let start = 0;
  let buf = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inBlock && /^\s*```mermaid\s*$/.test(line)) {
      inBlock = true;
      start = i + 1; // line number of the ```mermaid fence (1-based)
      buf = [];
    } else if (inBlock && /^\s*```\s*$/.test(line)) {
      blocks.push({ code: buf.join("\n"), line: start });
      inBlock = false;
    } else if (inBlock) {
      buf.push(line);
    }
  }
  return blocks;
}

const files = walk(CONTENT_DIR);
let total = 0;
const errors = [];

for (const file of files) {
  const src = readFileSync(file, "utf8");
  for (const { code, line } of extractBlocks(src)) {
    total++;
    try {
      await mermaid.parse(code);
    } catch (e) {
      const msg = (e && (e.message || String(e))) || "unknown parse error";
      errors.push({ file, line, msg: msg.split("\n").slice(0, 3).join("\n") });
    }
  }
}

if (errors.length) {
  console.error(`\n✗ mermaid-lint: ${errors.length} invalid diagram(s) of ${total}\n`);
  for (const e of errors) {
    console.error(`  ${e.file}:${e.line}`);
    console.error(`    ${e.msg.replace(/\n/g, "\n    ")}\n`);
  }
  process.exit(1);
}

console.log(`✓ mermaid-lint: ${total} diagram(s) valid`);
