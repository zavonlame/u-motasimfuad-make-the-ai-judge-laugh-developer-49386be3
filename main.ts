// Developer excuse entry — Node 22, standard library only.
// Writes one single-line excuse to $MAKEFUN_OUTPUT_DIR/entry.txt
// (fallback /output), no trailing newline, no file reads, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My code didn't break prod, prod just ran it exactly the way I wrote it.";

function deliver(text: string): void {
  // Gate: 1–200 characters, one line, not only whitespace.
  if (text.length < 1 || text.length > 200) throw new Error("entry length out of gate");
  if (text.includes("\n") || text.trim().length === 0) throw new Error("entry must be one non-blank line");
  const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), text, "utf8");
}

deliver(LINE);
