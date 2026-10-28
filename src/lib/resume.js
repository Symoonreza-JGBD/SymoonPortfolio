// A small, text-only PDF writer using PDF's built-in Helvetica font; no PDF dependency.
export function resumeLines(profile) {
  const lines = [
    profile.name,
    profile.title,
    profile.location,
    profile.email,
    "",
    "PROFILE",
    profile.summary,
    "",
    "EXPERIENCE",
  ];
  for (const role of profile.roles) {
    lines.push(`${role.company} | ${role.title}`, role.period);
    if (role.promotion) lines.push(role.promotion.replaceAll("·", "|"));
    lines.push(...role.details, ...(role.results ?? []), "");
  }
  lines.push(
    "EDUCATION",
    profile.education.degree,
    profile.education.institution,
    profile.education.period,
    "",
    "TOOLS",
    profile.tools.join(", "),
    "",
    "LANGUAGES",
    profile.languages.join(", "),
    "",
    "LINKS",
    profile.linkedin,
  );
  if (profile.github) lines.push(profile.github);
  return lines;
}

export function createResumePdf(profile) {
  const lines = resumeLines(profile).flatMap((line) => {
    const words = line.replace(/[^\x20-\x7e]/g, "-").split(" ");
    const wrapped = [""];
    for (const word of words) {
      const last = wrapped.length - 1;
      if (wrapped[last].length && wrapped[last].length + word.length + 1 > 88)
        wrapped.push(word);
      else wrapped[last] += `${wrapped[last] ? " " : ""}${word}`;
    }
    return wrapped;
  });
  const pages = [];
  for (let i = 0; i < lines.length; i += 48) pages.push(lines.slice(i, i + 48));
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    `<< /Type /Pages /Kids [${pages.map((_, i) => `${4 + i * 2} 0 R`).join(" ")}] /Count ${pages.length} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const escape = (text) => text.replace(/([\\()])/g, "\\$1");
  pages.forEach((page, i) => {
    const stream = `BT /F1 10 Tf 14 TL 44 788 Td\n${page.map((line) => `(${escape(line)}) Tj T*`).join("\n")}\nET\n`;
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R >> >> /Contents ${5 + i * 2} 0 R >>`,
    );
    objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}endstream`);
  });
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("");
  return `${pdf}trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
}

export function downloadResume(profile) {
  const url = URL.createObjectURL(
    new Blob([createResumePdf(profile)], { type: "application/pdf" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "MD-Symoon-Reza-Patwary-Anik-CV.pdf";
  document.body.append(link);
  link.click();
  link.remove();
  // Give the browser time to consume the URL before releasing it.
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
