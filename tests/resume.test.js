import test from "node:test";
import assert from "node:assert/strict";
import { data } from "../src/data/portfolio.js";
import { createResumePdf, resumeLines } from "../src/lib/resume.js";

test("CV contains every supplied role, result and education detail", () => {
  const content = resumeLines(data).join("\n");
  assert.ok(content.includes(data.name));
  assert.ok(content.includes(data.email));
  assert.ok(content.includes(data.linkedin));
  for (const role of data.roles) {
    assert.ok(content.includes(role.company));
    assert.ok(content.includes(role.period));
    for (const line of [...role.details, ...(role.results ?? [])])
      assert.ok(content.includes(line));
  }
  assert.ok(content.includes(data.education.institution));
  assert.ok(!content.includes("undefined"));
  assert.ok(!content.includes("null"));
});

test("PDF is ASCII, has a valid cross-reference table and all object offsets resolve", () => {
  const pdf = createResumePdf(data);
  assert.ok(pdf.startsWith("%PDF-1.4"));
  assert.ok(pdf.endsWith("%%EOF\n"));
  assert.equal(Buffer.byteLength(pdf, "utf8"), pdf.length);
  const xrefOffset = Number(pdf.match(/startxref\n(\d+)/)[1]);
  assert.equal(pdf.slice(xrefOffset, xrefOffset + 4), "xref");
  const entries = pdf.slice(xrefOffset).match(/\d{10} 00000 n /g);
  entries.forEach((entry, i) =>
    assert.ok(
      pdf.slice(Number(entry.slice(0, 10))).startsWith(`${i + 1} 0 obj`),
    ),
  );
  for (const stream of pdf.matchAll(
    /\/Length (\d+) >>\nstream\n([\s\S]*?)endstream/g,
  )) {
    assert.equal(Number(stream[1]), Buffer.byteLength(stream[2], "utf8"));
  }
});

test("PDF escapes parentheses and backslashes, and paginates long content", () => {
  const pdf = createResumePdf({
    ...data,
    name: "Test (QA) \\ Resume",
    summary: Array(500).fill("Quality").join(" "),
  });
  assert.ok(pdf.includes("Test \\(QA\\) \\\\ Resume"));
  assert.ok(Number(pdf.match(/\/Count (\d+)/)[1]) > 1);
});

test("unset GitHub URL adds no link to the CV", () => {
  const links = resumeLines(data).filter((line) => line.startsWith("https://"));
  assert.deepEqual(links, [data.linkedin]);
});

test("configured optional GitHub URL is retained", () => {
  const url = "https://example.com/profile";
  assert.equal(resumeLines({ ...data, github: url }).at(-1), url);
  assert.equal(resumeLines(data).at(-1), data.linkedin);
});
