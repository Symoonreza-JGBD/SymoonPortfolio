import { Link } from "react-router";
import { data } from "../data/portfolio.js";
import { getMetrics, timelinePosition } from "../lib/dashboard.js";
import { downloadResume } from "../lib/resume.js";
import Icon from "./Icon.jsx";
import { ExternalLink, SectionHeading } from "./Layout.jsx";

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow mono">
          <span className="tiny-square" />
          THE PERSON BEHIND THE CHECKS
        </div>
        <h1 id="hero-title">
          MD Symoon Reza
          <br />
          Patwary <span>Anik.</span>
        </h1>
        <p className="hero-title">{data.title}</p>
        <p className="hero-summary">{data.summary}</p>
        <div className="hero-buttons">
          <a className="button button-primary" href={`mailto:${data.email}`}>
            <Icon name="mail" />
            Email me
            <Icon name="arrow" size={15} />
          </a>
          <ExternalLink className="button" href={data.linkedin}>
            <Icon name="linkedin" />
            LinkedIn
          </ExternalLink>
          {data.github && (
            <ExternalLink className="button" href={data.github}>
              <Icon name="github" />
              GitHub
            </ExternalLink>
          )}
          <button
            className="button button-text"
            type="button"
            onClick={() => downloadResume(data)}
          >
            <Icon name="download" />
            Download CV
          </button>
        </div>
        <div className="hero-location">
          <Icon name="pin" size={15} />
          {data.location}
          <span className="location-separator">/</span>
          <span className="mono">quality, by design</span>
        </div>
      </div>
      <aside className="focus-card card" aria-label="QA engineering focus">
        <div className="card-topline mono">
          <span>ENGINEERING FOCUS</span>
          <Icon name="code" size={19} />
        </div>
        <div className="focus-symbol" aria-hidden="true">
          <span>[</span> QA <span>]</span>
          <small>CHECK. VERIFY. IMPROVE.</small>
        </div>
        <div className="focus-item">
          <span className="mono">01</span>
          <div>
            Automate the repeatable<small>Playwright + Azure Pipelines</small>
          </div>
          <Icon name="arrow" size={16} />
        </div>
        <div className="focus-item">
          <span className="mono">02</span>
          <div>
            Test beyond the interface<small>API + K6 performance testing</small>
          </div>
          <Icon name="arrow" size={16} />
        </div>
        <div className="focus-item">
          <span className="mono">03</span>
          <div>
            Close the feedback loop
            <small>Defect tracking in Azure DevOps</small>
          </div>
          <Icon name="arrow" size={16} />
        </div>
        <div className="focus-footer mono">
          <span className="tiny-square" />
          SENIOR SOFTWARE QA ENGINEER
        </div>
      </aside>
    </section>
  );
}

function Metrics() {
  const metrics = getMetrics(data);
  return (
    <section className="metrics-section" aria-labelledby="metrics-title">
      <div className="metrics-caption">
        <h2 id="metrics-title" className="mono">
          MEASURABLE IMPACT
        </h2>
        <span>Results at JustGo · experience across QA</span>
      </div>
      <div
        className={`metrics-grid ${metrics.length === 4 ? "four-metrics" : ""}`}
      >
        {metrics.map((metric, i) => (
          <article className="metric card" key={metric.key}>
            <div className="metric-top mono">
              <span>{metric.key}</span>
              <span className="metric-index">0{i + 1}</span>
            </div>
            <div
              className={`metric-value ${metric.positive ? "positive" : ""}`}
            >
              {metric.value}
              {metric.positive && (
                <span className="result-symbol" aria-hidden="true">
                  ↘
                </span>
              )}
            </div>
            <p>{metric.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Outcomes() {
  return (
    <section className="section" aria-labelledby="outcomes-title">
      <SectionHeading
        number="01"
        title={
          <span id="outcomes-title">
            Quality, with a measurable difference.
          </span>
        }
        label="THE OUTCOMES"
      />
      <div className="outcomes-grid">
        <article className="card comparison-card">
          <div className="card-title">
            <h3>Less effort. Faster resolution.</h3>
            <span className="mono badge">JUSTGO</span>
          </div>
          <p className="card-description">
            Before vs after · indexed to a baseline of 100
          </p>
          <div className="chart-legend mono">
            <span>
              <i className="legend-before" />
              Before
            </span>
            <span>
              <i className="legend-after" />
              After
            </span>
            <span className="legend-note">Lower is better</span>
          </div>
          {[
            { name: "Manual regression effort", after: 70, change: "30% less" },
            { name: "Bug resolution time", after: 80, change: "20% faster" },
          ].map((item) => (
            <div className="comparison" key={item.name}>
              <div className="comparison-label">
                <h4>{item.name}</h4>
                <span className="positive mono">{item.change}</span>
              </div>
              <div className="bar-row">
                <span className="sr-only">Before: </span>
                <div className="bar-track">
                  <div className="bar bar-before" style={{ width: "100%" }} />
                </div>
                <span className="bar-value mono">100</span>
              </div>
              <div className="bar-row">
                <span className="sr-only">After: </span>
                <div className="bar-track">
                  <div
                    className="bar bar-after"
                    style={{ width: `${item.after}%` }}
                  />
                </div>
                <span className="bar-value mono">{item.after}</span>
              </div>
            </div>
          ))}
          <p className="card-footnote mono">
            Relative comparison, not release-by-release telemetry.
          </p>
        </article>
        <article className="card pipeline-card">
          <div className="card-title">
            <h3>A quality gate at every step.</h3>
            <Icon name="code" />
          </div>
          <p className="card-description">
            Release pipeline <span className="mono badge">ILLUSTRATIVE</span>
          </p>
          <ol className="pipeline">
            {[
              ["Build", "Azure Pipelines", "01"],
              ["API checks", "API testing", "02"],
              ["Playwright", "UI automation", "03"],
              ["K6 load", "Performance testing", "04"],
            ].map(([name, description, index]) => (
              <li key={name}>
                <span className="gate-icon mono">{index}</span>
                <div>
                  <h4>{name}</h4>
                  <span>{description}</span>
                </div>
                <span className="gate-label mono">GATE {index}</span>
              </li>
            ))}
          </ol>
          <p className="sample-notice">
            <span className="info-symbol" aria-hidden="true">
              i
            </span>
            A sample view, not live data.
          </p>
        </article>
      </div>
    </section>
  );
}

function Career() {
  return (
    <section className="section" id="career" aria-labelledby="career-title">
      <SectionHeading
        number="02"
        title={<span id="career-title">A career built around quality.</span>}
        label="2021 — 2026"
      >
        <Link className="inline-link" to="/resume">
          Full CV
          <Icon name="arrow" size={15} />
        </Link>
      </SectionHeading>
      <div className="card timeline-card">
        <div className="card-title">
          <h3>career_timeline</h3>
          <div className="timeline-legend mono">
            <span>
              <i className="legend-after" />
              QA Engineer
            </span>
            <span>
              <i className="legend-senior" />
              Senior QA Engineer
            </span>
          </div>
        </div>
        <div
          className="timeline-scroll"
          role="region"
          aria-label="Career timeline from 2021 to 2026. Scroll horizontally on small screens."
          tabIndex="0"
        >
          <div className="timeline">
            <div className="timeline-axis">
              <span className="mono">ROLE / COMPANY</span>
              <div>
                {[2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
                  <span className="mono" key={year}>
                    {year}
                  </span>
                ))}
              </div>
            </div>
            {data.roles.map((role) => (
              <div className="timeline-row" key={role.id}>
                <div className="timeline-label">
                  <span className={role.senior ? "senior-text" : ""}>
                    {role.company}
                  </span>
                  <small>
                    {role.senior ? "Senior QA Engineer" : "QA Engineer"}
                  </small>
                </div>
                <div className="timeline-track">
                  <div className="timeline-grid" aria-hidden="true">
                    {[2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
                      <span key={year} />
                    ))}
                  </div>
                  <div
                    className={`timeline-bar ${role.senior && !role.seniorStart ? "senior-bar" : ""}`}
                    style={timelinePosition(role.start, role.end)}
                    aria-label={`${role.company}, ${role.title}, ${role.promotion ? "Jun 2024 to present; promoted Apr 2026" : role.period}`}
                  >
                    {role.end === null && <span className="ongoing-marker" />}
                  </div>
                  {role.seniorStart && (
                    <div
                      className="timeline-bar senior-bar promotion-bar"
                      style={timelinePosition(role.seniorStart, role.end)}
                      aria-hidden="true"
                    >
                      <span>Senior ↗</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="card-footnote mono">
          JustGo: QA Engineer from Jun 2024 · promoted to Senior in Apr 2026 ·
          present roles extend to the chart boundary.
        </p>
      </div>
      <div className="experience-list">
        {data.roles.map((role, i) => (
          <article className="experience-item" key={role.id}>
            <div className="experience-meta">
              <span className="mono experience-number">0{i + 1}</span>
              <div>
                <h3>{role.company}</h3>
                <p className="mono">{role.period}</p>
              </div>
            </div>
            <div className="experience-content">
              <div className="role-heading">
                <h4>{role.title}</h4>
                {role.senior && <span className="senior-tag mono">SENIOR</span>}
              </div>
              {role.promotion && (
                <p className="promotion-note">{role.promotion}</p>
              )}
              <ul>
                {role.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {role.results && (
                <div className="result-tags">
                  {role.results.map((result) => (
                    <span key={result}>
                      <Icon name="check" size={14} />
                      {result}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills" aria-labelledby="skills-title">
      <SectionHeading
        number="03"
        title={
          <span id="skills-title">The right tools for the right checks.</span>
        }
        label="THE TOOLKIT"
      />
      <div className="card skills-card">
        <div className="card-title">
          <h3>skills_by_role</h3>
          <span className="mono subdued">
            {data.tools.length} tools / {data.languages.length} languages
          </span>
        </div>
        <div
          className="table-scroll"
          role="region"
          aria-label="Skills by role table. Scroll horizontally on small screens."
          tabIndex="0"
        >
          <table>
            <caption className="sr-only">
              QA responsibilities, tools and their application
            </caption>
            <thead>
              <tr>
                <th scope="col">QA responsibility</th>
                <th scope="col">Tools</th>
                <th scope="col">Application</th>
              </tr>
            </thead>
            <tbody>
              {data.skillsByRole.map((skill) => (
                <tr key={skill.role}>
                  <th scope="row">{skill.role}</th>
                  <td>
                    <div className="tool-tags">
                      {skill.tools.map((tool) => (
                        <span className="tool-tag mono" key={tool}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{skill.application}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="languages">
          <span className="mono">LANGUAGES</span>
          <div>
            {data.languages.map((language) => (
              <span key={language} className="mono">
                {language}
              </span>
            ))}
          </div>
        </div>
      </div>
      <article className="education-card card">
        <span className="mono section-label">EDUCATION</span>
        <h3>{data.education.degree}</h3>
        <p>{data.education.institution}</p>
        <span className="mono subdued">{data.education.period}</span>
      </article>
    </section>
  );
}

export default function Dashboard() {
  return (
    <main className="container" id="main" tabIndex="-1">
      <Hero />
      <Metrics />
      <Outcomes />
      <Career />
      <Skills />
      <section className="contact-card" aria-labelledby="contact-title">
        <div>
          <p className="eyebrow mono">LET’S TALK QUALITY</p>
          <h2 id="contact-title">
            Safer releases start
            <br />
            with a conversation.
          </h2>
          <p>Open to senior QA roles · {data.location}</p>
        </div>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${data.email}`}>
            {data.email}
            <Icon name="arrow" />
          </a>
          <ExternalLink className="inline-link" href={data.linkedin}>
            Connect on LinkedIn
            <Icon name="arrow" size={15} />
          </ExternalLink>
        </div>
      </section>
    </main>
  );
}
