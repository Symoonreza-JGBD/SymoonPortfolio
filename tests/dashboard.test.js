import test from "node:test";
import assert from "node:assert/strict";
import { getMetrics, timelinePosition } from "../src/lib/dashboard.js";
import { data } from "../src/data/portfolio.js";

test("default dashboard shows exactly the three supplied KPIs", () => {
  assert.deepEqual(
    getMetrics(data).map(({ key, value }) => [key, value]),
    [
      ["regression_manual_effort", "-30%"],
      ["bug_resolution_time", "-20%"],
      ["years_in_qa", "5"],
    ],
  );
});

test("optional bug KPI is absent when unset, but zero is valid data", () => {
  for (const totalBugs of [undefined, null, ""])
    assert.equal(getMetrics({ ...data, totalBugs }).length, 3);
  for (const totalBugs of [0, 125]) {
    const metric = getMetrics({ ...data, totalBugs }).at(-1);
    assert.equal(metric.key, "bugs_reported_overall");
    assert.equal(metric.value, String(totalBugs));
  }
});

test("career bars include final calendar month and span the six-year window", () => {
  assert.deepEqual(timelinePosition("2021-01", "2026-12"), {
    left: "0%",
    width: "100%",
  });
  assert.deepEqual(timelinePosition("2021-01", "2021-12"), {
    left: "0%",
    width: `${(12 / 72) * 100}%`,
  });
  assert.deepEqual(timelinePosition("2026-04", null), {
    left: "87.5%",
    width: "12.5%",
  });
  assert.deepEqual(
    timelinePosition("2026-04"),
    timelinePosition("2026-04", null),
  );
});

test("all supplied career bars remain within the chart, including short roles", () => {
  for (const role of data.roles) {
    const pos = timelinePosition(role.start, role.end);
    assert.ok(parseFloat(pos.left) >= 0);
    assert.ok(parseFloat(pos.width) > 0);
    assert.ok(parseFloat(pos.left) + parseFloat(pos.width) <= 100.00001);
  }
});

test("profile has no invented GitHub URL and retains the promotion and all roles", () => {
  assert.equal(data.github, "");
  assert.equal(data.roles.length, 5);
  assert.equal(data.roles[0].seniorStart, "2026-04");
  assert.match(data.roles[0].promotion, /Jun 2024 to Mar 2026/);
  assert.equal(data.languages.length, 6);
});
