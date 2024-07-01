import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Sun,
  Terminal,
} from "lucide-react";
import { useEffect, useState } from "react";
import { portfolio } from "../data/portfolio";

type Theme = "light" | "dark" | "matsu";

type MainPortfolioProps = {
  navigateFun: () => void;
};

export function MainPortfolio({ navigateFun }: MainPortfolioProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      if (saved) return saved;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light";
  });

  const [activeExperience, setActiveExperience] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : current === "dark" ? "matsu" : "light"));
  };

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Sun;

  return (
    <main className="site-shell">
      <nav className="main-nav" aria-label="Primary">
        <a className="brand-mark" href="#top" aria-label="Back to top">
          <span>AV</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button
          className="theme-toggle"
          type="button"
          onClick={cycleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "matte" : "light"} theme`}
        >
          <ThemeIcon size={18} />
        </button>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-backdrop" aria-hidden="true">
          <span className="ripple" />
          <span className="ripple" />
          <span className="ripple" />
          <div className="boot-preview">
            <div className="boot-bar">
              <span />
              <span />
              <span />
            </div>
            <p>$ whoami</p>
            <strong>{portfolio.profile.name}</strong>
            <p>$ ./open-fun-side</p>
            <em>mounting retro desktop...</em>
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{portfolio.profile.roleLine}</p>
          <h1>{portfolio.profile.name}</h1>
          <p className="hero-lede">{portfolio.profile.headline}</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={navigateFun}>
              <Sparkles size={18} />
              Take me to the fun side
              <ArrowRight size={18} />
            </button>
            <a className="secondary-action" href={portfolio.links.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a className="secondary-action" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="content-band intro-band" aria-labelledby="about-heading">
        <div className="section-inner intro-grid">
          <div>
            <p className="section-kicker">About</p>
            <h2 id="about-heading">A normal portfolio front door, with a secret terminal in the basement.</h2>
          </div>
          <p>{portfolio.profile.intro}</p>
        </div>
      </section>

      <section id="work" className="content-band" aria-labelledby="work-heading">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Projects</p>
            <h2 id="work-heading">Selected Work</h2>
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top">
                  <span>{project.status}</span>
                  {project.link || project.repo ? <ExternalLink size={16} /> : null}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band split-band" aria-labelledby="experience-heading">
        <div className="section-inner split-grid">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 id="experience-heading">The practical side of the machine.</h2>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <article
                className={`timeline-item ${index === activeExperience ? "active" : ""}`}
                key={`${item.role}-${item.organization}`}
              >
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p className="timeline-org">
                  {item.organization} · {item.location}
                </p>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="peak-dots" aria-label="Experience timeline navigation">
          {portfolio.experience.map((item, index) => (
            <button
              key={`${item.role}-${item.organization}`}
              className={`peak-dot ${index === activeExperience ? "active" : ""}`}
              type="button"
              onClick={() => setActiveExperience(index)}
              aria-label={`View experience: ${item.role} at ${item.organization}`}
            >
              <span className="dot-inner" />
            </button>
          ))}
        </div>
      </section>

      <section id="skills" className="content-band" aria-labelledby="skills-heading">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Skills</p>
            <h2 id="skills-heading">A toolkit that keeps expanding.</h2>
          </div>
          <div className="ticker" aria-label="Skills ticker">
            <div className="ticker-track">
              {Array(2).fill(null).flatMap((_, i) =>
                portfolio.skillGroups.flatMap((group) => [group.label, ...group.items]).map((item) => (
                  <span className="ticker-item" key={`${i}-${item}`}>
                    {item}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="content-band contact-band" aria-labelledby="contact-heading">
        <div className="section-inner contact-grid">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-heading">Let us build something inspectable.</h2>
            <p>{portfolio.profile.availability}</p>
          </div>
          <div className="contact-actions">
            <a className="primary-action" href={portfolio.links.email}>
              <Mail size={18} />
              Email me
            </a>
            {portfolio.links.resumeUrl ? (
              <a className="secondary-action" href={portfolio.links.resumeUrl} download>
                <Download size={18} />
                Resume
              </a>
            ) : (
              <span className="secondary-action is-disabled">
                <Download size={18} />
                {portfolio.links.resumeLabel}
              </span>
            )}
            <button className="secondary-action" type="button" onClick={navigateFun}>
              <Terminal size={18} />
              Open AviOS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
