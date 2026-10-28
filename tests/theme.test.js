import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const script = readFileSync(
  new URL("../static/theme.js", import.meta.url),
  "utf8",
);

function initialize({ stored = null, light = false, blocked = false } = {}) {
  const document = {
    documentElement: { dataset: {} },
    querySelector: () => meta,
  };
  const meta = {};
  const localStorage = {
    getItem() {
      if (blocked) throw new Error("Storage disabled");
      return stored;
    },
  };
  runInNewContext(script, {
    document,
    localStorage,
    window: { matchMedia: () => ({ matches: light }) },
  });
  return { theme: document.documentElement.dataset.theme, color: meta.content };
}

test("theme defaults to dark for a dark system preference", () => {
  assert.deepEqual(initialize(), { theme: "dark", color: "#14161b" });
});
test("theme respects light system preference when unset", () => {
  assert.equal(initialize({ light: true }).theme, "light");
});
test("explicit stored theme wins over system preference", () => {
  assert.equal(initialize({ stored: "dark", light: true }).theme, "dark");
  assert.equal(initialize({ stored: "light", light: false }).theme, "light");
});
test("invalid saved preferences and unavailable storage fail safely", () => {
  assert.equal(initialize({ stored: "invalid", light: true }).theme, "light");
  assert.equal(initialize({ blocked: true, light: true }).theme, "light");
  assert.equal(initialize({ blocked: true }).theme, "dark");
});
