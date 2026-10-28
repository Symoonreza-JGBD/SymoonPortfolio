import { Link, useLocation } from "react-router";
import { useEffect } from "react";
import ThemeToggle from "./ThemeToggle.jsx";
import Icon from "./Icon.jsx";
import { data } from "../data/portfolio.js";

export function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = `${pathname === "/resume" ? "CV" : pathname === "/" ? "Anik" : "Page not found"} | Senior Software QA Engineer`;
    let target;
    try {
      target =
        hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    } catch {
      /* Malformed URL fragments should never break navigation. */
    }
    if (target) target.scrollIntoView();
    else {
      window.scrollTo(0, 0);
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);
  return null;
}

export function Header() {
  const { pathname, hash } = useLocation();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <Link
            className="brand"
            to="/"
            aria-label="Anik quality dashboard home"
          >
            <span className="brand-mark">
              <Icon name="check" size={19} />
            </span>
            <span>
              quality-dashboard <span className="brand-slash">/</span>{" "}
              <strong>anik</strong>
            </span>
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <Link
              to="/"
              aria-current={pathname === "/" && !hash ? "page" : undefined}
            >
              Overview
            </Link>
            <Link
              to="/#career"
              aria-current={
                pathname === "/" && hash === "#career" ? "location" : undefined
              }
            >
              Career
            </Link>
            <Link
              to="/#skills"
              aria-current={
                pathname === "/" && hash === "#skills" ? "location" : undefined
              }
            >
              Skills
            </Link>
            <Link
              to="/resume"
              aria-current={pathname === "/resume" ? "page" : undefined}
            >
              CV <Icon name="arrow" size={13} />
            </Link>
          </nav>
          <div className="header-actions">
            <span className="status-pill">
              <span className="status-dot" />
              Open to senior QA roles
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer container">
      <span>
        © {new Date().getFullYear()} {data.name}
      </span>
      <span className="mono">Built with care. Tested with intent.</span>
      <a href="#main">Back to top ↑</a>
    </footer>
  );
}

export function SectionHeading({ number, title, label, children }) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number mono">{number}</span>
        <h2>{title}</h2>
        <span className="section-label mono">{label}</span>
      </div>
      {children}
    </div>
  );
}

export function ExternalLink({ href, children, className = "" }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
