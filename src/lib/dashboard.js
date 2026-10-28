export function getMetrics(profile) {
  const metrics = [
    {
      key: "regression_manual_effort",
      value: "-30%",
      description: "Less manual regression testing",
      positive: true,
    },
    {
      key: "bug_resolution_time",
      value: "-20%",
      description: "Faster bug resolution",
      positive: true,
    },
    {
      key: "years_in_qa",
      value: String(profile.yearsInQA),
      description: "Years of QA experience",
      positive: false,
    },
  ];
  if (
    profile.totalBugs !== null &&
    profile.totalBugs !== undefined &&
    profile.totalBugs !== ""
  ) {
    metrics.push({
      key: "bugs_reported_overall",
      value: String(profile.totalBugs),
      description: "Bugs reported overall",
      positive: false,
    });
  }
  return metrics;
}

// Whole calendar months, including the final month. Fixed 2021–2026 display window.
export function timelinePosition(start, end = "2026-12") {
  const monthIndex = (value) => {
    const [year, month] = value.split("-").map(Number);
    return (year - 2021) * 12 + month - 1;
  };
  const first = Math.max(0, Math.min(71, monthIndex(start)));
  const last = Math.max(first, Math.min(71, monthIndex(end ?? "2026-12")));
  return {
    left: `${(first / 72) * 100}%`,
    width: `${((last - first + 1) / 72) * 100}%`,
  };
}
