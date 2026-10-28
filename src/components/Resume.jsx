import { data } from "../data/portfolio.js";
import { downloadResume } from "../lib/resume.js";
import { ExternalLink } from "./Layout.jsx";
import Icon from "./Icon.jsx";

export default function Resume() {
  return (
    <main className="container resume-page" id="main" tabIndex="-1">
      <div className="resume-toolbar">
        <p className="mono">CURRICULUM VITAE / ANIK</p>
        <div>
          <button
            className="button"
            onClick={() => window.print()}
            type="button"
          >
            Print CV
          </button>
          <button
            className="button button-primary"
            type="button"
            onClick={() => downloadResume(data)}
          >
            <Icon name="download" />
            Download PDF
          </button>
        </div>
      </div>
      <article className="resume-paper card">
        <header className="resume-header">
          <p className="eyebrow mono">SENIOR SOFTWARE QA ENGINEER</p>
          <h1>{data.name}</h1>
          <p>{data.location}</p>
          <a href={`mailto:${data.email}`}>{data.email}</a>
          <ExternalLink href={data.linkedin}>
            LinkedIn
            <Icon name="arrow" size={14} />
          </ExternalLink>
          {data.github && (
            <ExternalLink href={data.github}>GitHub</ExternalLink>
          )}
        </header>
        <section>
          <h2>Profile</h2>
          <p>{data.summary}</p>
        </section>
        <section>
          <h2>Experience</h2>
          {data.roles.map((role) => (
            <div className="resume-role" key={role.id}>
              <h3>{role.title}</h3>
              <p className="resume-company">
                {role.company} <span>· {role.period}</span>
              </p>
              {role.promotion && <p>{role.promotion}</p>}
              <ul>
                {[...role.details, ...(role.results ?? [])].map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        <section>
          <h2>Education</h2>
          <h3>{data.education.degree}</h3>
          <p>
            {data.education.institution} · {data.education.period}
          </p>
        </section>
        <section>
          <h2>Tools & languages</h2>
          <p>
            <strong>Tools:</strong> {data.tools.join(", ")}.
          </p>
          <p>
            <strong>Languages:</strong> {data.languages.join(", ")}.
          </p>
        </section>
      </article>
    </main>
  );
}
