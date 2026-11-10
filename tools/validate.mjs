import { HtmlValidate } from "html-validate";
import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
const result = await new HtmlValidate().validateFile("index.html");
if (!result.valid) {
  for (const r of result.results)
    for (const m of r.messages)
      console.error(`${m.line}:${m.column} ${m.ruleId}: ${m.message}`);
  process.exitCode = 1;
} else console.log("HTML validation passed.");
const html = await readFile("index.html", "utf8");
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
for (const m of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (!/^(https?:|mailto:)/.test(m[1])) await access(m[1]);
}
for (const m of html.matchAll(/href="#([^"]+)"/g))
  assert.ok(ids.includes(m[1]), `Missing target ${m[1]}`);
console.log("Local assets, unique IDs, and anchor targets passed.");
